import React from 'react';
import { ActivityIndicator } from 'components/design-system-ui';
import { useEC3Theme } from 'hooks/useEC3Theme';
import { View } from 'react-native';

export const ActivityLoading = () => {
  const theme = useEC3Theme().swThemes;
  return (
    <View style={{ marginVertical: 20 }}>
      <ActivityIndicator size={20} indicatorColor={theme.colorWhite} />
    </View>
  );
};
