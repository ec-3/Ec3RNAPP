import React from 'react';
import { SubWalletModal } from 'components/SubWalletModal';
import { SubmitButton } from 'components/SubmitButton';
import i18n from 'utils/i18n/i18n';
import { ConfirmationHeader } from 'screens/Home/Browser/ConfirmationPopup/ConfirmationBase/ConfirmationHeader';
import { View } from 'react-native';

interface Props {
  modalVisible: boolean;
  title: string;
  url: string;
  onChangeModalVisible?: () => void;
  renderContent?: () => JSX.Element | null;
}

export const DetailModal = ({ modalVisible, onChangeModalVisible, renderContent, title, url }: Props) => {
  return (
    <SubWalletModal isFullHeight modalVisible={modalVisible} modalStyle={{ maxHeight: '90%', width: '100%' }}>
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        <ConfirmationHeader title={title} url={url} />

        {renderContent && renderContent()}
        <SubmitButton
          title={i18n.common.close}
          onPress={onChangeModalVisible}
          style={{ marginHorizontal: 16, width: '100%' }}
        />
      </View>
    </SubWalletModal>
  );
};
