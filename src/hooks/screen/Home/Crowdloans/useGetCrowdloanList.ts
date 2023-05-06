import { APIItemState, CrowdloanItem } from '@subwallet/extension-base/background/KoniTypes';
import {
  _getChainNativeTokenBasicInfo,
  _getCrowdloanUrlFromChain,
  _getSubstrateParaId,
  _getSubstrateRelayParent,
} from '@subwallet/extension-base/services/chain-service/utils';
import {
  getBalanceValue,
  getConvertedBalanceValue,
} from '@subwallet/extension-koni-ui/src/hooks/screen/home/useAccountBalance';
import {
  CrowdloanContributeValueType,
  CrowdloanItemType,
  CrowdloanValueInfo,
} from '@subwallet/extension-koni-ui/src/types/crowdloan';
import { _ChainInfo } from '@subwallet/chain-list/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { BN_ZERO } from 'utils/chainBalances';
import BigN from 'bignumber.js';
import { useMemo } from 'react';

const GroupDisplayNameMap: Record<string, string> = {
  polkadot: 'Polkadot parachain',
  kusama: 'Kusama parachain',
};

function getGroupDisplayName(key: string): string {
  return GroupDisplayNameMap[key];
}

function getCrowdloanChains(chainInfoMap: Record<string, _ChainInfo>) {
  const result: string[] = [];

  for (const chainKey in chainInfoMap) {
    if (!chainInfoMap.hasOwnProperty(chainKey)) {
      continue;
    }

    const chainInfo = chainInfoMap[chainKey];

    if (_getSubstrateParaId(chainInfo) === -1) {
      continue;
    }

    result.push(chainKey);
  }

  return result;
}

function getCrowdloanContributeMap(
  crowdloanChains: string[],
  chainInfoMap: Record<string, _ChainInfo>,
  crowdloanMap: Record<string, CrowdloanItem>,
  priceMap: Record<string, number>,
) {
  const crowdloanContributeMap: Record<string, CrowdloanContributeValueType> = {};

  crowdloanChains.forEach(key => {
    const chainInfo = chainInfoMap[key];
    const relayParentKey = _getSubstrateRelayParent(chainInfo);
    const relayChainInfo = chainInfoMap[relayParentKey];

    if (!chainInfo) {
      return;
    }

    const crowdloanItem = crowdloanMap[key];

    if (!crowdloanItem || crowdloanItem.state.valueOf() !== APIItemState.READY.valueOf()) {
      return;
    }

    const { decimals, symbol } = _getChainNativeTokenBasicInfo(relayChainInfo);
    const price = priceMap[relayParentKey];
    const contributeValue = getBalanceValue(crowdloanItem.contribute, decimals);
    const convertedContributeValue = getConvertedBalanceValue(contributeValue, price);

    const contributeInfo = {
      value: contributeValue,
      convertedValue: convertedContributeValue,
      symbol: symbol,
    } as CrowdloanValueInfo;

    crowdloanContributeMap[key] = {
      paraState: crowdloanItem.paraState,
      contribute: contributeInfo,
    };
  });

  return crowdloanContributeMap;
}

function getCrowdloanItem(
  slug: string,
  contributeValueInfo: CrowdloanContributeValueType,
  chainInfo: _ChainInfo,
): CrowdloanItemType {
  const relayParentKey = _getSubstrateRelayParent(chainInfo);
  const relayParentDisplayName = getGroupDisplayName(relayParentKey);
  const { convertedValue, symbol, value } = contributeValueInfo.contribute;

  return {
    contribute: value,
    convertedContribute: convertedValue,
    chainDisplayName: chainInfo.name,
    slug: chainInfo.slug,
    symbol,
    relayParentDisplayName,
    paraState: contributeValueInfo.paraState,
    crowdloanUrl: _getCrowdloanUrlFromChain(chainInfo),
  };
}

function getCrowdloanContributeList(
  chainInfoMap: Record<string, _ChainInfo>,
  chainKeys: string[],
  crowdloanContributeMap: Record<string, CrowdloanContributeValueType>,
  includeZeroBalance = false,
): CrowdloanItemType[] {
  const result: CrowdloanItemType[] = [];

  chainKeys.forEach(n => {
    const chainInfo = chainInfoMap[n];
    const contributeValueInfo: CrowdloanContributeValueType = crowdloanContributeMap[n] || {
      contribute: {
        value: new BigN(0),
        convertedValue: new BigN(0),
      },
    };

    if (!includeZeroBalance && !BN_ZERO.lt(new BigN(contributeValueInfo.contribute.value))) {
      return;
    }

    result.push(getCrowdloanItem(n, contributeValueInfo, chainInfo));
  });

  return result;
}

export default function useGetCrowdloanList() {
  const crowdloanMap = useSelector((state: RootState) => state.crowdloan.crowdloanMap);
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  const priceMap = useSelector((state: RootState) => state.price.priceMap);
  const crowdloanChains = useMemo<string[]>(() => getCrowdloanChains(chainInfoMap), [chainInfoMap]);

  return useMemo<CrowdloanItemType[]>(() => {
    const crowdloanContributeMap = getCrowdloanContributeMap(crowdloanChains, chainInfoMap, crowdloanMap, priceMap);

    return getCrowdloanContributeList(chainInfoMap, crowdloanChains, crowdloanContributeMap);
  }, [crowdloanMap, crowdloanChains, chainInfoMap, priceMap]);
}
