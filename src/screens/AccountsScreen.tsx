import { AccountJson } from '@subwallet/extension-base/background/types';
import { UnlockModal } from 'components//common/Modal/UnlockModal';
import useUnlockModal from 'hooks/modal/useUnlockModal';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleProp, TouchableOpacity, View } from 'react-native';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { Account } from 'components/Account';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { IconButton } from 'components/IconButton';
import { DotsThree, FileArrowDown, PlusCircle, Swatches } from 'phosphor-react-native';
import { Warning } from 'components/Warning';
import { ColorMap } from 'styles/color';
import { RootNavigationProps } from 'routes/index';
import { noop } from 'utils/function';
import i18n from 'utils/i18n/i18n';
import { MarginBottomForSubmitButton } from 'styles/sharedStyles';
import { saveCurrentAccountAddress, triggerAccountsSubscription } from 'messaging/index';
import { isAccountAll } from '@subwallet/extension-base/utils';
import { Divider } from 'components/Divider';
import { findAccountByAddress } from 'utils/index';
import { CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { Button, Icon } from 'components/design-system-ui';
import { AccountCreationArea } from 'components/common/Account/AccountCreationArea';
import { SelectedActionType } from 'stores/types';

const accountsWrapper: StyleProp<any> = {
  flex: 1,
};
const accountItemContainer: StyleProp<any> = {
  paddingHorizontal: 16,
};

export const AccountsScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const { accounts } = useSelector((state: RootState) => state.accountState);
  const currentAccountAddress = useSelector((state: RootState) => state.accountState.currentAccount?.address);

  const selectedAction = useRef<SelectedActionType>();

  const [importAccountModalVisible, setImportAccountModalVisible] = useState<boolean>(false);
  const [attachAccountModalVisible, setAttachAccountModalVisible] = useState<boolean>(false);
  const [createAccountModalVisible, setCreateAccountModalVisible] = useState<boolean>(false);

  const renderListEmptyComponent = () => {
    return <Warning title={i18n.warningTitle.warning} message={i18n.warningMessage.noAccountText} isDanger={false} />;
  };

  const onComplete = useCallback(() => {
    switch (selectedAction.current) {
      case 'createAcc':
        setCreateAccountModalVisible(true);
        break;
      case 'attachAcc':
        setAttachAccountModalVisible(true);
        break;
      case 'importAcc':
        setImportAccountModalVisible(true);
        break;
    }
  }, []);

  const selectAccount = useCallback(
    (accAddress: string) => {
      if (currentAccountAddress !== accAddress) {
        const accountByAddress = findAccountByAddress(accounts, accAddress);

        if (accountByAddress) {
          const accountInfo = {
            address: accAddress,
          } as CurrentAccountInfo;

          saveCurrentAccountAddress(accountInfo, () => {
            triggerAccountsSubscription().catch(e => {
              console.error('There is a problem when trigger Accounts Subscription', e);
            });
          }).catch(e => {
            console.error('There is a problem when set Current Account', e);
          });
        }
      }

      navigation.navigate('Home');
    },
    [currentAccountAddress, navigation, accounts],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AccountJson>) => {
      return (
        <TouchableOpacity style={accountItemContainer} onPress={() => selectAccount(item.address)}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Account
              key={item.address}
              name={item.name || ''}
              address={item.address}
              showCopyBtn={false}
              selectAccount={() => {
                selectAccount(item.address);
              }}
              isSelected={currentAccountAddress === item.address}
              showSubIcon={true}
            />

            {!isAccountAll(item.address) && (
              <IconButton
                icon={DotsThree}
                color={ColorMap.disabled}
                onPress={() => {
                  navigation.navigate('EditAccount', { address: item.address, name: item.name || '' });
                }}
              />
            )}
          </View>
          <Divider style={{ paddingLeft: 56 }} color={ColorMap.dark2} />
        </TouchableOpacity>
      );
    },
    [currentAccountAddress, navigation, selectAccount],
  );

  const { onPress, visible, onPasswordComplete, onHideModal } = useUnlockModal(onComplete);

  const onPressActionButton = useCallback(
    (action: SelectedActionType) => {
      selectedAction.current = action;
      onPress().catch(noop).finally(noop);
    },
    [onPress],
  );

  const renderFooterComponent = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          ...MarginBottomForSubmitButton,
          marginTop: 16,
          flexDirection: 'row',
        }}>
        <Button
          style={{ marginRight: 12 }}
          block
          icon={<Icon phosphorIcon={PlusCircle} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          onPress={() => {
            onPressActionButton('createAcc');
          }}>
          {'Create new account'}
        </Button>
        <Button
          style={{ marginRight: 12 }}
          icon={<Icon phosphorIcon={FileArrowDown} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          onPress={() => {
            onPressActionButton('importAcc');
          }}
        />
        <Button
          icon={<Icon phosphorIcon={Swatches} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          onPress={() => {
            onPressActionButton('attachAcc');
          }}
        />
      </View>
    );
  };

  return (
    <SubScreenContainer navigation={navigation} title={i18n.title.accounts}>
      <View style={accountsWrapper}>
        <FlatList
          style={{ flex: 1 }}
          keyboardShouldPersistTaps={'handled'}
          data={accounts}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={item => item.address}
        />
        {renderFooterComponent()}

        <AccountCreationArea
          allowToShowSelectType={true}
          createAccountModalVisible={createAccountModalVisible}
          importAccountModalVisible={importAccountModalVisible}
          attachAccountModalVisible={attachAccountModalVisible}
          onChangeCreateAccountModalVisible={setCreateAccountModalVisible}
          onChangeImportAccountModalVisible={setImportAccountModalVisible}
          onChangeAttachAccountModalVisible={setAttachAccountModalVisible}
        />
      </View>
      <UnlockModal onPasswordComplete={onPasswordComplete} visible={visible} onHideModal={onHideModal} />
    </SubScreenContainer>
  );
};
