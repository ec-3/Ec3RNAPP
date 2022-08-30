import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { CircleWavyCheck } from 'phosphor-react-native';
import Text from '../components/Text';
import { ColorMap } from 'styles/color';
import { FontSemiBold, sharedStyles } from 'styles/sharedStyles';

interface Props extends TouchableOpacityProps {
  label: string;
  isSelected: boolean;
  showSeparator?: boolean;
  leftIcon?: JSX.Element;
}

const selectItemSeparator: StyleProp<any> = {
  width: '100%',
  height: 1,
  backgroundColor: ColorMap.dark2,
};

export const SelectItem = ({ label, isSelected, onPress, showSeparator = true, leftIcon }: Props) => {
  const CheckIcon = CircleWavyCheck;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 52,
          paddingRight: 16,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon && <View style={{ paddingHorizontal: 16 }}>{leftIcon}</View>}
          <Text
            style={{
              ...sharedStyles.mediumText,
              color: ColorMap.light,
              ...FontSemiBold,
              paddingVertical: 14,
            }}>
            {label}
          </Text>
        </View>

        {isSelected && <CheckIcon color={ColorMap.primary} weight={'bold'} size={20} />}
      </View>

      {showSeparator && <View style={selectItemSeparator} />}
    </TouchableOpacity>
  );
};
