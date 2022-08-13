import { getAccountType, getNetworkKeysByAddressType } from 'utils/index';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { AccountType } from 'types/ui-types';
import { AccountJson } from '@subwallet/extension-base/background/types';

export default function useShowedNetworks(address: string, accounts: AccountJson[]): string[] {
  const networkMap = useSelector((state: RootState) => state.networkMap);
  const accountType: AccountType | undefined = (!!address && getAccountType(address)) || undefined;
  const dep1 = JSON.stringify(accounts);
  const dep2 = JSON.stringify(networkMap);

  return useMemo<string[]>(() => {
    return getNetworkKeysByAddressType(accountType, accounts, networkMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType, dep1, dep2]);
}
