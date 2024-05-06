import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import Text from '../components/Text';
import { FontMedium } from 'styles/sharedStyles';
import { Button, Icon } from 'components/design-system-ui';
import { ThemeTypes } from 'styles/themes';
import { useEC3Theme } from 'hooks/useEC3Theme';
import { ButtonPropsType } from 'components/design-system-ui/button/PropsType';

interface Props extends TouchableOpacityProps {
  label?: string;
  icon: ButtonPropsType['icon'];
  buttonWrapperStyle?: StyleProp<ViewStyle>;
}

function getButtonTextStyle(disabled: boolean, theme: ThemeTypes) {
  return {
    color: disabled ? theme.colorTextLight4 : theme.colorTextLight1,
    fontSize: 15,
    lineHeight: 26,
    ...FontMedium,
    paddingTop: 8,
  };
}

const ActionButton = (actionButtonProps: Props) => {
  const theme = useEC3Theme().swThemes;
  const { label, icon, disabled, onPress, buttonWrapperStyle } = actionButtonProps;
 
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={buttonWrapperStyle}>
        {/* <Button
          // shape={'squircle'}
          size={'sm'}
          contentAlign='center'
          disabled={!!disabled}
          icon={typeof icon === 'function' ? icon('white') : icon}
          // @ts-ignore
          onPress={() => onPress && onPress()}
        /> */}
          <TouchableOpacity onPress={onPress}>
          {typeof icon === 'function' ? icon('white') : icon}
          </TouchableOpacity>

      </View>

      {!!label && <Text style={getButtonTextStyle(!!disabled, theme)}>{label}</Text>}
    </View>
  );
};

export default ActionButton;
