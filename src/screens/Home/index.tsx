import React, { useCallback, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreenProps } from 'routes/index';
import { StakingScreen } from './StakingScreen';

import { TouchableOpacity } from 'react-native';
import { Aperture, CurrencyCircleDollar, Database, GlobeSimple, Rocket } from 'phosphor-react-native';
import { CryptoScreen } from 'screens/Home/Crypto';
import { FontMedium } from 'styles/sharedStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_BAR_HEIGHT } from '../../constant';
import { useToast } from 'react-native-toast-notifications';
import { ColorMap } from 'styles/color';
import i18n from 'utils/i18n/i18n';
import useCheckEmptyAccounts from 'hooks/useCheckEmptyAccounts';
import { FirstScreen } from 'screens/Home/FirstScreen';
import { CrowdloansScreen } from 'screens/Home/Crowdloans';
import { BrowserScreen } from 'screens/Home/Browser';
import { HomeScreenParams, HomeStackParamList } from 'routes/home';
import NFTStackScreen from 'screens/Home/NFT/NFTStackScreen';

function checkTabNotCompleted(target: string) {
  return target.includes('Staking');
}

interface MainScreenProps {
  params?: HomeScreenParams;
}

const MainScreen = ({ params }: MainScreenProps) => {
  const Tab = createBottomTabNavigator<HomeStackParamList>();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const tab = useMemo((): keyof HomeStackParamList => {
    return params?.tab || 'Crypto';
  }, [params?.tab]);

  const onPressComingSoonTab = useCallback(() => {
    toast.hideAll();
    toast.show(i18n.common.comingSoon);
  }, [toast]);

  return (
    <Tab.Navigator
      initialRouteName={tab}
      screenOptions={{
        headerShown: false,
        tabBarButton: props => {
          let customStyle = {
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
          if (checkTabNotCompleted(props.to || '')) {
            return <TouchableOpacity {...props} activeOpacity={1} onPress={() => onPressComingSoonTab()} />;
          } else {
            return <TouchableOpacity {...props} activeOpacity={1} />;
          }
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
          tabBarIcon: ({ color }) => {
            return <Aperture size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Crowdloans'}
        component={CrowdloansScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Rocket size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Staking'}
        component={StakingScreen}
        options={{
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

export const Home = ({ route: { params: params } }: HomeScreenProps) => {
  const isEmptyAccounts = useCheckEmptyAccounts();

  return <>{isEmptyAccounts ? <FirstScreen /> : <MainScreen params={params} />}</>;
};
