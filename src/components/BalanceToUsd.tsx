import React from 'react';
import { StyleProp, View } from 'react-native';
import Text from 'components/Text';
import { ColorMap } from 'styles/color';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import BigN from 'bignumber.js';

const textStyle: StyleProp<any> = {
  color: ColorMap.primary,
  ...sharedStyles.mainText,
  ...FontMedium,
};

interface Props {
  amountToUsd: BigN;
  isShowBalance: boolean;
}

export const BalanceToUsd = ({ amountToUsd, isShowBalance }: Props) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 8 }}>
      <Text style={textStyle}>(</Text>
      {isShowBalance ? (
        <Text style={[textStyle, { marginTop: 1 }]}>{`$${amountToUsd.toFixed()}`}</Text>
      ) : (
        <Text style={[textStyle, { marginTop: 1 }]}>{'******'}</Text>
      )}
      <Text style={textStyle}>)</Text>
    </View>
  );
};
