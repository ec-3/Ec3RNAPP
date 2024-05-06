import { useEC3Theme } from 'hooks/useEC3Theme';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import createStyle from './styles';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const ConfirmationFooter: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const theme = useEC3Theme().swThemes;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return <View style={styles.container}>{children}</View>;
};

export default ConfirmationFooter;
