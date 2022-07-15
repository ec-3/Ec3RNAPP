import React, { useCallback, useRef } from 'react';
import { SubWalletModal } from 'components/SubWalletModal';
import { StyleProp, Text, TouchableOpacity, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { FontBold, FontSemiBold, sharedStyles, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import QRCode from 'react-native-qrcode-svg';
import reformatAddress, { getNetworkLogo, toShort } from 'utils/index';
import { IconButton } from 'components/IconButton';
import { CopySimple } from 'phosphor-react-native';
import { SubmitButton } from 'components/SubmitButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { BUTTON_ACTIVE_OPACITY, deviceHeight } from '../../../constant';
import Toast from 'react-native-toast-notifications';

interface Props {
  receiveModalVisible: boolean;
  onChangeVisible: () => void;
  networkKey: string;
  networkPrefix: number;
  openChangeNetworkModal: () => void;
}

const receiveModalContentWrapper: StyleProp<any> = {
  alignItems: 'center',
  width: '100%',
};

const receiveModalTitle: StyleProp<any> = {
  ...sharedStyles.mediumText,
  ...FontBold,
  color: ColorMap.light,
  paddingBottom: 24,
};

const receiveModalGuide: StyleProp<any> = {
  color: ColorMap.disabled,
  ...sharedStyles.mainText,
  ...FontSemiBold,
  paddingVertical: 16,
};

const receiveModalAddressWrapper: StyleProp<any> = {
  paddingHorizontal: 16,
  backgroundColor: ColorMap.dark1,
  borderRadius: 5,
  height: 48,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
};

const receiveModalAddressText: StyleProp<any> = {
  color: ColorMap.disabled,
  ...sharedStyles.mainText,
  ...FontSemiBold,
  paddingLeft: 16,
};

const receiveModalCopyBtn: StyleProp<any> = {
  width: 48,
  height: '100%',
  position: 'absolute',
  right: 0,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
};

const receiveModalExplorerBtn: StyleProp<any> = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: ColorMap.light,
  flex: 1,
  marginRight: 8,
};

export const ReceiveModal = ({
  receiveModalVisible,
  onChangeVisible,
  networkKey,
  networkPrefix,
  openChangeNetworkModal,
}: Props) => {
  const toastRef = useRef();
  const {
    accounts: { currentAccountAddress },
    currentNetwork,
  } = useSelector((state: RootState) => state);
  const copyToClipboard = useCallback((text: string) => {
    Clipboard.setString(text);
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.hideAll();
      // @ts-ignore
      toastRef.current.show('Copied to clipboard');
    }
  }, []);
  const formattedAddress = reformatAddress(currentAccountAddress, networkPrefix);

  return (
    <SubWalletModal
      modalStyle={{ height: 496 }}
      modalVisible={receiveModalVisible}
      onChangeModalVisible={onChangeVisible}>
      <View style={receiveModalContentWrapper}>
        <Text style={receiveModalTitle}>Receive Asset</Text>
        <QRCode value={formattedAddress} size={180} />
        <Text style={receiveModalGuide}>Scan address to receive payment</Text>

        <View style={receiveModalAddressWrapper}>
          <TouchableOpacity
            activeOpacity={BUTTON_ACTIVE_OPACITY}
            disabled={currentNetwork.networkKey !== 'all'}
            onPress={() => {
              onChangeVisible();
              openChangeNetworkModal();
            }}>
            {getNetworkLogo(networkKey, 20)}
          </TouchableOpacity>

          <Text style={receiveModalAddressText}>{toShort(formattedAddress, 12, 12)}</Text>
          <IconButton
            style={receiveModalCopyBtn}
            icon={CopySimple}
            color={ColorMap.disabled}
            onPress={() => copyToClipboard(formattedAddress)}
          />
        </View>

        <View style={{ flexDirection: 'row', paddingTop: 27 }}>
          <SubmitButton title={'Explorer'} backgroundColor={ColorMap.dark2} style={receiveModalExplorerBtn} />
          <SubmitButton style={{ flex: 1, marginLeft: 8 }} title={'Share'} />
        </View>
        {
          // @ts-ignore
          <Toast ref={toastRef} placement={'bottom'} offsetBottom={deviceHeight - STATUS_BAR_HEIGHT - 120} />
        }
      </View>
    </SubWalletModal>
  );
};
