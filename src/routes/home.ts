import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StakingScreenStackParamList } from 'routes/staking/stakingScreen';
import { BrowserHomeProps, RootStackParamList } from 'routes/index';

export type CryptoStackParamList = {
  TokenGroups: undefined;
  TokenGroupsDetail: { slug: string };
};

export type CryptoNavigationProps = NativeStackScreenProps<CryptoStackParamList & RootStackParamList>['navigation'];
export type TokenGroupsDetailProps = NativeStackScreenProps<CryptoStackParamList, 'TokenGroupsDetail'>;

export type HomeStackParamList = {
  Tokens: NavigatorScreenParams<CryptoStackParamList>;
  Crowdloans: undefined;
  Staking: NavigatorScreenParams<StakingScreenStackParamList> | undefined;
  Browser: NavigatorScreenParams<BrowserHomeProps>;
};

type NavigationProps = NativeStackScreenProps<HomeStackParamList>;
export type HomeNavigationProps = NavigationProps['navigation'];
