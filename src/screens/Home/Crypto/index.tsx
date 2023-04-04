import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TokenGroups } from 'screens/Home/Crypto/TokenGroups';
import { TokenGroupsDetail } from 'screens/Home/Crypto/TokenGroupsDetail';
import { CryptoStackParamList } from 'routes/home';
import withPageWrapper from 'components/pageWrapper';

export const CryptoScreen = () => {
  const Stack = createNativeStackNavigator<CryptoStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen
        name="TokenGroups"
        component={withPageWrapper(TokenGroups, ['price', 'chainStore', 'assetRegistry', 'balance'])}
      />
      <Stack.Screen name="TokenGroupsDetail" component={TokenGroupsDetail} />
    </Stack.Navigator>
  );
};
