import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { MarginBottomForSubmitButton, ScrollViewStyle } from 'styles/sharedStyles';
import { ThemeTypes } from 'styles/themes';

export interface ComponentStyle {
  wrapper: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  error: ViewStyle;
  passwordContainer: ViewStyle;
  passwordField: ViewStyle;
  accountPreview: ViewStyle;
  accountList: ViewStyle;
  accountItem: ViewStyle;
  footer: ViewStyle;
}

const createStyles = (theme: ThemeTypes) => {
  return StyleSheet.create<ComponentStyle>({
    wrapper: {
      paddingHorizontal: theme.padding,
      flex: 1,
    },
    container: {
      flex: 1,
      ...ScrollViewStyle,
    },
    title: {
      color: theme.colorTextDescription,
      paddingHorizontal: theme.padding,
      marginVertical: theme.margin,
      textAlign: 'center',
      fontWeight: theme.bodyFontWeight,
      width: '100%',
    },
    description: {
      color: theme.colorTextDescription,
      fontWeight: theme.bodyFontWeight,
    },
    error: {
      marginTop: theme.marginXS,
    },
    accountPreview: {
      marginTop: theme.marginXS,
      marginBottom: theme.marginXS,
    },
    accountList: {
      width: '100%',
    },
    accountItem: {
      paddingTop: theme.paddingSM,
      paddingBottom: theme.paddingSM,
      marginBottom: theme.marginXS,
    },
    passwordContainer: {
      marginTop: theme.margin,
    },
    passwordField: {
      paddingTop: theme.paddingSM,
      paddingBottom: theme.paddingXXS - 1,
    },
    footer: {
      marginTop: theme.marginXS,
      ...MarginBottomForSubmitButton,
    },
  });
};

export default createStyles;
