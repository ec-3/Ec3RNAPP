import React from 'react';
import { ReceiveModal } from 'screens/Home/CtyptoTab/ReceiveModal';
import { ActionButtonContainer } from 'screens/Home/CtyptoTab/ActionButtonContainer';
import { ScrollView, StyleProp, Text, View } from 'react-native';
import { TokenHistoryItem } from 'components/TokenHistoryItem';
import { ColorMap } from 'styles/color';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import { getNetworkLogo } from 'utils/index';
import { FontMedium, FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { AccountInfoByNetwork } from 'types/ui-types';
import { BalanceVal } from 'components/BalanceVal';
import BigN from 'bignumber.js';

interface Props {
  onPressBack: () => void;
  onShoHideReceiveModal: (isShowModal: boolean) => void;
  receiveModalVisible: boolean;
  selectedTokenName: string;
  selectedNetworkInfo: AccountInfoByNetwork;
  tokenBalanceValue: BigN;
  tokenConvertedValue: BigN;
  tokenHistorySymbol: string;
}

const tokenHistoryHeader: StyleProp<any> = {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const tokenHistoryHeaderTitle: StyleProp<any> = {
  ...sharedStyles.mediumText,
  ...FontSemiBold,
  color: ColorMap.light,
  paddingLeft: 4,
  maxWidth: 150,
};

const balanceContainer: StyleProp<any> = {
  paddingHorizontal: 16,
  alignItems: 'center',
  backgroundColor: '#222222',
  paddingTop: 21,
};

const convertedBalanceStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.primary,
};

export const TokenHistoryScreen = ({
  onPressBack,
  onShoHideReceiveModal,
  receiveModalVisible,
  selectedTokenName,
  selectedNetworkInfo,
  tokenBalanceValue,
  tokenConvertedValue,
  tokenHistorySymbol,
}: Props) => {
  const renderHeaderContent = () => {
    return (
      <View style={tokenHistoryHeader}>
        {getNetworkLogo(selectedNetworkInfo.networkKey, 20)}
        <Text style={tokenHistoryHeaderTitle} numberOfLines={1}>
          {selectedNetworkInfo.networkDisplayName.replace(' Relay Chain', '')}
        </Text>
        <Text
          style={{
            ...sharedStyles.mediumText,
            ...FontSemiBold,
            color: ColorMap.light,
            paddingLeft: 4,
          }}>
          {`(${selectedTokenName})`}
        </Text>
      </View>
    );
  };

  return (
    <ContainerWithSubHeader
      onPressBack={onPressBack}
      backgroundColor={ColorMap.dark2}
      title={''}
      headerContent={renderHeaderContent}>
      <>
        <View style={balanceContainer}>
          <BalanceVal value={tokenBalanceValue} symbol={tokenHistorySymbol} />

          <View style={{ flexDirection: 'row' }}>
            <Text style={convertedBalanceStyle}>{'('}</Text>
            <BalanceVal
              value={tokenConvertedValue}
              startWithSymbol
              symbol={'$'}
              balanceValTextStyle={convertedBalanceStyle}
            />
            <Text style={convertedBalanceStyle}>{')'}</Text>
          </View>

          <ActionButtonContainer openReceiveModal={() => onShoHideReceiveModal(true)} style={{ paddingTop: 25 }} />
        </View>

        <ScrollView style={{ backgroundColor: ColorMap.dark1, flex: 1 }}>
          <TokenHistoryItem isLoading={false} isReceiveHistory={true} />
        </ScrollView>

        <ReceiveModal receiveModalVisible={receiveModalVisible} onChangeVisible={() => onShoHideReceiveModal(false)} />
      </>
    </ContainerWithSubHeader>
  );
};
