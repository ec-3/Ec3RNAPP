import React, { useEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StakingScreen from './Staking/StakingScreen';

import { Platform, TouchableOpacity } from 'react-native';
import { Aperture, CurrencyCircleDollar, Database, GlobeSimple, Rocket } from 'phosphor-react-native';
import { CryptoScreen } from 'screens/Home/Crypto';
import { FontMedium } from 'styles/sharedStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_BAR_HEIGHT } from 'constants/index';
import { ColorMap } from 'styles/color';
import useCheckEmptyAccounts from 'hooks/useCheckEmptyAccounts';
import { FirstScreen } from 'screens/Home/FirstScreen';
import { CrowdloansScreen } from 'screens/Home/Crowdloans';
import { BrowserScreen } from 'screens/Home/Browser';
import { HomeStackParamList } from 'routes/home';
import NFTStackScreen from 'screens/Home/NFT/NFTStackScreen';
import withPageWrapper from 'components/pageWrapper';
import MigrateMasterPasswordConfirmModal from 'screens/MasterPassword/MigrateMasterPasswordConfirmModal';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { keyringLock } from '../../messaging';
import { SwFullSizeModal } from 'components/design-system-ui';
import { Confirmations } from 'screens/Confirmations';

const MainScreen = () => {
  const Tab = createBottomTabNavigator<HomeStackParamList>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'Crypto'}
      screenOptions={{
        headerShown: false,
        tabBarButton: props => {
          let customStyle = {
            flexDirection: 'column',
            // opacity: !props.accessibilityState?.selected ? 0.2 : 1,
          };
          if (props.accessibilityState?.selected) {
            customStyle = {
              ...customStyle,
              // @ts-ignore
              borderTopWidth: 2,
              borderTopColor: ColorMap.secondary,
              marginTop: -2,
            };
          }
          // @ts-ignore
          props.style = [[...props.style], customStyle];
          return <TouchableOpacity {...props} activeOpacity={1} />;
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: insets.bottom && insets.bottom - 12,
          fontSize: 10,
          lineHeight: 25,
          ...FontMedium,
        },
        tabBarStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: ColorMap.dark1,
          borderTopWidth: 1,
          paddingLeft: 16,
          paddingRight: 16,
          height: BOTTOM_BAR_HEIGHT + (insets.bottom ? insets.bottom - 15 : insets.bottom),
        },
        tabBarActiveTintColor: ColorMap.secondary,
        tabBarInactiveTintColor: ColorMap.light,
      }}>
      <Tab.Screen
        name={'Crypto'}
        component={CryptoScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <CurrencyCircleDollar size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'NFT'}
        component={NFTStackScreen}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return <Aperture size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Crowdloans'}
        component={withPageWrapper(CrowdloansScreen, ['crowdloan', 'price', 'chainStore'])}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return <Rocket size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Staking'}
        component={StakingScreen}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return <Database size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Browser'}
        component={BrowserScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <GlobeSimple size={24} color={color} weight={'bold'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const Home = () => {
  const isEmptyAccounts = useCheckEmptyAccounts();
  const navigation = useNavigation<RootNavigationProps>();
  const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);
  const { hasConfirmations, hasInternalConfirmations } = useSelector((state: RootState) => state.requestState);
  console.log('hasConfirmations', hasConfirmations, hasInternalConfirmations);

  const needMigrate = useMemo(
    () =>
      !!accounts.filter(acc => acc.address !== ALL_ACCOUNT_KEY && !acc.isExternal).filter(acc => !acc.isMasterPassword)
        .length,
    [accounts],
  );

  useEffect(() => {
    if (needMigrate && hasMasterPassword) {
      navigation.navigate('MigratePassword');
    }
  }, [hasMasterPassword, navigation, needMigrate]);

  useEffect(() => {
    if (hasMasterPassword) {
      keyringLock().catch((e: Error) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isEmptyAccounts ? <FirstScreen /> : <MainScreen />}
      <MigrateMasterPasswordConfirmModal visible={!hasMasterPassword && !isEmptyAccounts} />
      <SwFullSizeModal modalVisible={hasConfirmations || hasInternalConfirmations}>
        <Confirmations />
      </SwFullSizeModal>
    </>
  );
};
