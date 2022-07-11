import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { getGenesisOptionsByAddressType } from 'utils/index';
import { isAccountAll } from '@subwallet/extension-koni-base/utils/utils';
import useGenesisHashOptions from 'hooks/useGenesisHashOptions';
import { updateCurrentNetwork } from 'stores/updater';
import { tieAccount } from './messaging';
import SplashScreen from 'react-native-splash-screen';

function Rendering(): React.ReactElement {
  SplashScreen.hide();
  const {
    accounts: { accounts, currentAccount: account },
  } = useSelector((state: RootState) => state);

  const genesisOptions = getGenesisOptionsByAddressType(account?.address, accounts, useGenesisHashOptions());
  const _isAccountAll = account && isAccountAll(account.address);

  useEffect(() => {
    let isSync = true;

    (async () => {
      let networkSelected;

      if (!account || !account?.genesisHash) {
        networkSelected = genesisOptions[0];
      } else {
        networkSelected = genesisOptions.find(opt => opt.value === account.genesisHash);

        if (!networkSelected) {
          await tieAccount(account.address, null);
          networkSelected = genesisOptions[0];
        }
      }

      if (isSync && networkSelected) {
        updateCurrentNetwork({
          networkPrefix: networkSelected.networkPrefix,
          icon: networkSelected.icon,
          genesisHash: networkSelected.value,
          networkKey: networkSelected.networkKey,
          isEthereum: networkSelected.isEthereum,
        });
      }
    })().catch(e => console.log('error is', e));

    return () => {
      isSync = false;
    };
  }, [account, account?.genesisHash, _isAccountAll, genesisOptions]);

  return <></>;
}

export default React.memo(Rendering);
