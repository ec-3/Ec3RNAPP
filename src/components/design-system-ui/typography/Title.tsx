import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { LevelProps, SuperLevelProps } from './PropsType';
import TypographyStyles from './style';
import { useEC3Theme } from 'hooks/useEC3Theme';

export interface TitleProps {
  level?: LevelProps;
  superLevel?: SuperLevelProps;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ level, superLevel, style, children, ...restProps }) => {
  const theme = useEC3Theme().swThemes;
  const _style = TypographyStyles(theme);
  const allStyle = [
    _style.title,
    level && _style[`titleLevel${level}`],
    superLevel && _style[`titleSuperLevel${superLevel}`],
    style,
  ];

  return (
    <RNText style={allStyle} {...restProps}>
      {children}
    </RNText>
  );
};

export default Title;
