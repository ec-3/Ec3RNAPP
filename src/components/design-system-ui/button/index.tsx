import React, { useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlightProps,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import { ButtonPropsType } from './PropsType';
import Squircle from 'components/design-system-ui/squircle';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import ButtonStyles from './style';
import capitalize from '@subwallet/react-ui/es/_util/capitalize';

export interface ButtonProps extends ButtonPropsType, TouchableHighlightProps {
  onPress?: (event?: GestureResponderEvent) => void;
  onPressIn?: (event?: GestureResponderEvent) => void;
  onPressOut?: (event?: GestureResponderEvent) => void;
  activeStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    loading = false,
    disabled = false,
    style,
    size = 'md',
    type = 'primary',
    shape = 'default',
    block = false,
    activeStyle,
    onPress,
    children,
    onPressIn,
    onPressOut,
    onLongPress,
    onShowUnderlay,
    onHideUnderlay,
    icon,
    contentAlign = 'center',
    ...restProps
  } = props;
  const theme = useSubWalletTheme().swThemes;
  const _style = ButtonStyles(theme);
  const [pressIn, setPressIn] = useState<boolean>(false);
  const [touchIt, setTouchIt] = useState<boolean>(false);
  const isIconOnly = !children && children !== 0 && !!icon;
  const buttonType = shape === 'squircle' ? 'ghost' : type;

  const _onPress = (event?: GestureResponderEvent) => {
    onPress && onPress(event);
  };

  const _onPressIn = (event?: GestureResponderEvent) => {
    setPressIn(true);
    onPressIn && onPressIn(event);
  };

  const _onPressOut = (event?: GestureResponderEvent) => {
    setPressIn(false);
    onPressOut && onPressOut(event);
  };

  const _onShowUnderlay = () => {
    setTouchIt(true);
    onShowUnderlay && onShowUnderlay();
  };

  const _onHideUnderlay = () => {
    setTouchIt(false);
    onHideUnderlay && onHideUnderlay();
  };

  const textStyle = [
    _style.textStyle,
    _style[`${size}RawText`],
    _style[`${buttonType}RawText`],
    (loading || !!icon) && _style.buttonRawText,
    disabled && _style[`${buttonType}DisabledRawText`],
  ];

  const wrapperStyle = [
    _style.wrapperStyle,
    _style[`${size}Raw`],
    _style[`${buttonType}Raw`],
    _style[`${shape}ShapeRaw`],
    _style[`${contentAlign}ContentAlign`],
    isIconOnly && _style[`${size}IconOnly`],
    disabled && _style[`${buttonType}DisabledRaw`],
    block && _style.blockButtonRaw,
    pressIn && activeStyle && _style[`${buttonType}Highlight`],
    activeStyle && touchIt && activeStyle,
    style,
  ];

  const underlayColor = (StyleSheet.flatten(activeStyle ? activeStyle : _style[`${buttonType}Highlight`]) as any)
    .backgroundColor;

  const indicatorColor = (StyleSheet.flatten(_style[`${buttonType}RawText`]) as any).color;

  const iconNode = loading ? <ActivityIndicator animating color={indicatorColor} size="small" /> : icon ? icon : null;

  const buttonNode = (
    <TouchableHighlight
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      activeOpacity={0.4}
      {...restProps}
      style={wrapperStyle}
      disabled={disabled}
      underlayColor={underlayColor}
      onPress={_onPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onShowUnderlay={_onShowUnderlay}
      onHideUnderlay={_onHideUnderlay}>
      <View style={[_style.container, { paddingVertical: 16 }]}>
        {iconNode}
        {typeof children === 'string' ? <Text style={textStyle}>{children}</Text> : <>{children}</>}
      </View>
    </TouchableHighlight>
  );

  if (shape === 'squircle' && isIconOnly) {
    return (
      <Squircle size={size} backgroundColor={theme[`color${capitalize(type)}`]}>
        <View style={{ position: 'absolute' }}>{buttonNode}</View>
      </Squircle>
    );
  }

  return buttonNode;
};

export default Button;
