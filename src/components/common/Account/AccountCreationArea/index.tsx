import DeriveAccountModal from 'components/common/Modal/DeriveAccountModal';
import React, { useCallback, useMemo, useRef } from 'react';
import {
  DeviceTabletCamera,
  Eye,
  FileJs,
  Leaf,
  PlusCircle,
  QrCode,
  ShareNetwork,
  Swatches,
  Wallet,
  TextH,
} from 'phosphor-react-native';
import { EVM_ACCOUNT_TYPE } from 'constants/index';
import i18n from 'utils/i18n/i18n';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import ToastContainer from 'react-native-toast-notifications';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import { KeypairType } from '@polkadot/util-crypto/types';
import { canDerive, isAccountAll } from '@subwallet/extension-base/utils';
import { AccountActionSelectModal, ActionItemType } from 'components/Modal/AccountActionSelectModal';
import { ModalRef } from 'types/modalRef';
import useGoHome from 'hooks/screen/useGoHome';
import { View } from 'react-native-animatable';
// import { Avatar, Icon } from 'react-native-elements';
import { Image, Text, TouchableOpacity } from 'react-native';
import AccountSelectField from '../AccountSelectField';
import { useEC3Theme } from 'hooks/useEC3Theme';
import { Avatar, Icon, Typography } from 'components/design-system-ui';
// import { Text } from 'react-native-svg';
import { LazyFlatList } from 'components/LazyFlatList';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { SelectAccountItem } from 'components/common/SelectAccountItem';
import { SelectAccountItemV2 } from 'components/common/SelectAccountItemV2';
import { Keyboard, ListRenderItemInfo, FlatList } from 'react-native';
import { FileArrowDown, MagnifyingGlass, } from 'phosphor-react-native';
import { AccountsScreenProps } from 'routes/index';
import { MarginBottomForSubmitButton } from 'styles/sharedStyles';
import { saveCurrentAccountAddress } from 'messaging/index';
import { findAccountByAddress } from 'utils/index';
import { CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { Button } from 'components/design-system-ui';
import { FlatListScreen } from 'components/FlatListScreen';
import { EmptyList } from 'components/EmptyList';

interface Props {
  createAccountRef: React.MutableRefObject<ModalRef | undefined>;
  importAccountRef: React.MutableRefObject<ModalRef | undefined>;
  attachAccountRef: React.MutableRefObject<ModalRef | undefined>;
  allowToShowSelectType?: boolean;
}

export const AccountCreationArea = ({
  allowToShowSelectType = false,
  createAccountRef,
  importAccountRef,
  attachAccountRef,
}: Props) => {
  const navigation = useNavigation<RootNavigationProps>();
  const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);
  const selectTypeRef = useRef<ModalRef>();
  const deriveAccModalRef = useRef<ModalRef>();
  const goHome = useGoHome();
  const importAccountActions = [
    {
      key: 'secretPhrase',
      backgroundColor: '#51BC5E',
      icon: Leaf,
      label: i18n.importAccount.importFromSeedPhrase,
    },
    // {
    //   key: 'restoreJson',
    //   backgroundColor: '#E68F25',
    //   icon: FileJs,
    //   label: i18n.importAccount.importFromJson,
    // },
    {
      key: 'privateKey',
      backgroundColor: '#4D4D4D',
      icon: Wallet,
      label: i18n.importAccount.importByMetaMaskPrivateKey,
    },
    // {
    //   key: 'qrCode',
    //   backgroundColor: '#2565E6',
    //   icon: QrCode,
    //   label: i18n.importAccount.importByQRCode,
    // },
  ];

  const attachAccountActions = [
    {
      key: 'ledger',
      backgroundColor: '#E68F25',
      icon: Swatches,
      label: i18n.attachAccount.connectALedgerDevice,
    },
    {
      key: 'polkadotVault',
      backgroundColor: '#E6478E',
      icon: QrCode,
      label: i18n.attachAccount.connectAPolkadotVaultAcc,
    },
    {
      key: 'keystone',
      backgroundColor: '#2565E6',
      icon: DeviceTabletCamera,
      label: i18n.attachAccount.connectAKeystoneDevice,
    },
    {
      key: 'watchOnly',
      backgroundColor: '#2DA73F',
      icon: Eye,
      label: i18n.attachAccount.attachAWatchOnlyAccount,
    },
  ];

  const canDerivedAccounts = useMemo(
    () =>
      accounts
        .filter(({ isExternal }) => !isExternal)
        .filter(
          ({ isMasterAccount, type }) =>
            canDerive(type) && (type !== EVM_ACCOUNT_TYPE || (isMasterAccount && type === EVM_ACCOUNT_TYPE)),
        ),
    [accounts],
  );

  const toastRef = useRef<ToastContainer>(null);
  const show = useCallback((text: string) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.hideAll();
      // @ts-ignore
      toastRef.current.show(text);
    }
  }, []);

  const onSelectAccountTypes = useCallback(
    (keyTypes: KeypairType[]) => {
      createAccountRef && createAccountRef.current?.onCloseModal();
      selectTypeRef && selectTypeRef.current?.onCloseModal();
      setTimeout(() => {
        if (hasMasterPassword) {
          console.log("dddds11111")
          // navigation.navigate('CreateAccount', { keyTypes: keyTypes });
          navigation.navigate('CreateAccount1', { keyTypes: keyTypes });
          
        } else {
          console.log("dddds2222")
          navigation.navigate('CreatePassword', { pathName: 'CreateAccount', state: keyTypes });
        }
      }, 300);
    },
    [createAccountRef, hasMasterPassword, navigation],
  );

  const createAccountAction = useMemo(() => {
    return [
      // {
      //   key: 'createAcc',
      //   backgroundColor: 'transparent',
      //   icon: PlusCircle,
      //   label: i18n.createAccount.createWithNewSeedPhrase,
      // },
      // {
      //   key: 'derive',
      //   backgroundColor: '#E6478E',
      //   icon: ShareNetwork,
      //   label: i18n.createAccount.deriveFromAnExistingAcc,
      //   disabled: !canDerivedAccounts.length,
      // },
    ];
  }, [canDerivedAccounts.length]);

  const handlerCreateAccount = () => {
    createAccountRef?.current?.onCloseModal();
    navigation.navigate('CreateAccount1',  {});

  };

  const createAccountFunc = (item: ActionItemType) => {
    if (item.key === 'createAcc') {
      if (allowToShowSelectType) {
        // selectTypeRef && selectTypeRef.current?.onOpenModal();

        createAccountRef?.current?.onCloseModal();
        navigation.navigate('CreateAccount1',  {});

      } else {
        console.log("dddddds2")
        createAccountRef?.current?.onCloseModal();
        setTimeout(() => {
          if (hasMasterPassword) {
            navigation.navigate('CreateAccount', {});
          } else {
            navigation.navigate('CreatePassword', { pathName: 'CreateAccount' });
          }
        }, 3000);
      }
    } else {
      deriveAccModalRef && deriveAccModalRef.current?.onOpenModal();
    }
  };

  const importAccountActionFunc = (item: ActionItemType) => {
    let pathName: keyof RootStackParamList;
    importAccountRef && importAccountRef.current?.onCloseModal();
    if (item.key === 'secretPhrase') {
      pathName = 'ImportSecretPhrase';
    } else if (item.key === 'restoreJson') {
      pathName = 'RestoreJson';
    } else if (item.key === 'privateKey') {
      pathName = 'ImportPrivateKey';
    } else {
      pathName = 'ImportQrCode';
    }
    
    console.log("dddds1111111111122222")
    console.log(pathName)
    setTimeout(() => {
      if (hasMasterPassword) {
        // @ts-ignore
        navigation.navigate(pathName);
      } else {
        // @ts-ignore
        navigation.navigate('CreatePassword', { pathName: pathName });
      }
    }, 300);
  };

  const attachAccountFunc = (item: ActionItemType) => {
    let pathName: keyof RootStackParamList;
    console.log("dddds11111111jiao11122222")

    if (item.key === 'ledger') {
      show(i18n.notificationMessage.comingSoon);
      return;
    } else if (item.key === 'polkadotVault') {
      pathName = 'ConnectParitySigner';
    } else if (item.key === 'keystone') {
      pathName = 'ConnectKeystone';
    } else {
      pathName = 'AttachReadOnly';
    }

    attachAccountRef && attachAccountRef.current?.onCloseModal();
    setTimeout(() => {
      if (hasMasterPassword) {
        // @ts-ignore
        navigation.navigate(pathName);
      } else {
        // @ts-ignore
        navigation.navigate('CreatePassword', { pathName: pathName });
      }
    }, 300);
  };
  
  const theme = useEC3Theme().swThemes;
  // const _style = AccountSelectField(theme);
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  const isAll = useMemo((): boolean => !!currentAccount && isAccountAll(currentAccount.address), [currentAccount]);
  // TODO: reformat address when have new network info
  const fullAccounts = useSelector((state: RootState) => state.accountState.accounts);
  const currentAccountAddress = useSelector((state: RootState) => state.accountState.currentAccount?.address);
  const accounts2 = useMemo(() => {
    if (fullAccounts.length > 2) {
      return fullAccounts;
    }

    return fullAccounts.filter(a => !isAccountAll(a.address));
  }, [fullAccounts]);

  const selectAccount = useCallback(
    (accAddress: string) => {
      if (currentAccountAddress !== accAddress) {
        const accountByAddress = findAccountByAddress(accounts, accAddress);

        if (accountByAddress) {
          const accountInfo = {
            address: accAddress,
          } as CurrentAccountInfo;

          saveCurrentAccountAddress(accountInfo).catch(e => {
            console.error('There is a problem when set Current Account', e);
          });
        }
      }

      createAccountRef?.current?.onCloseModal();
    },
    [currentAccountAddress, accounts, navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AccountJson>) => {
      const isAllAccount = isAccountAll(item.address);

      return (
        <SelectAccountItemV2
          key={item.address}
          address={item.address}
          accountName={item.name}
          isSelected={currentAccountAddress === item.address}
          isAllAccount={isAllAccount}
          onSelectAccount={selectAccount}
          // onPressDetailBtn={() => {
          //   navigation.navigate('EditAccount', { address: item.address, name: item.name || '' });
          // }}
        />
      );
    },
    [currentAccountAddress, navigation],
  );

  const renderListEmptyComponent = () => {
    return (
      <EmptyList
        icon={MagnifyingGlass}
        title={i18n.emptyScreen.selectorEmptyTitle}
        message={i18n.emptyScreen.selectorEmptyMessage}
      />
    );
  };
  
  return (
    <>

      <AccountActionSelectModal
        accActionRef={createAccountRef}
        // modalTitle={i18n.header.createNewAcc}
        modalTitle={''}
        items={createAccountAction}
        onSelectItem={createAccountFunc}>
        <DeriveAccountModal deriveAccModalRef={deriveAccModalRef} goHome={goHome} navigation={navigation} />
       
          <FlatList
            data={accounts2}
            renderItem={renderItem} // 使用 renderItem 函数来渲染每个列表项
            keyExtractor={(item) => item.address} // 设置每个列表项的唯一标识符
          />

          <TouchableOpacity onPress={handlerCreateAccount} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('assets/icon_add.png')} style={{ width: 34, height: 34, marginRight: theme.paddingSM, marginLeft: 0 }} />
            <Text style={{ fontSize: theme.fontSizeLG, color: theme.colorWhite }}>{i18n.createAccount.createWithNewSeedPhrase}</Text>
          </TouchableOpacity>


      </AccountActionSelectModal>

      <SelectAccountTypeModal selectTypeRef={selectTypeRef} onConfirm={onSelectAccountTypes} />

      <AccountActionSelectModal
        accActionRef={importAccountRef}
        modalTitle={i18n.header.importAcc}
        items={importAccountActions}
        onSelectItem={importAccountActionFunc}
      />

      <AccountActionSelectModal
        accActionRef={attachAccountRef}
        modalTitle={i18n.header.attachAnAcc}
        items={attachAccountActions}
        onSelectItem={attachAccountFunc}
        toastRef={toastRef}
      />
    </>
  );
};
