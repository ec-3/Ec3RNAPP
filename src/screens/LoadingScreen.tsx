import { View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'components/design-system-ui';
import { useEC3Theme } from 'hooks/useEC3Theme';

export function LoadingScreen() {
  const theme = useEC3Theme().swThemes;
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <ActivityIndicator size={40} indicatorColor={theme.colorWhite} />
    </View>
  );
}
