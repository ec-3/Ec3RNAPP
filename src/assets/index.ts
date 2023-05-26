import React from 'react';
import { ImageLogosMap } from 'assets/logo';

const CheckBoxIcon = React.lazy(() => import('./checkbox.svg'));
const SignalIcon = React.lazy(() => import('./signal.svg'));
const SignalSplashIcon = React.lazy(() => import('./signal-splash.svg'));
const CheckBoxFilledIcon = React.lazy(() => import('./checkbox-filled.svg'));
const NftIcon = React.lazy(() => import('./logo-nft.svg'));
const Logo = React.lazy(() => import('./subwallet-logo.svg'));
const LogoGradient = React.lazy(() => import('./subwallet-logo-gradient.svg'));
const MenuBarLogo = React.lazy(() => import('./menu-bar.svg'));

export const SVGImages = {
  Logo,
  LogoGradient,
  CheckBoxIcon: CheckBoxIcon,
  CheckBoxFilledIcon: CheckBoxFilledIcon,
  NftIcon: NftIcon,
  SignalIcon: SignalIcon,
  SignalSplashIcon: SignalSplashIcon,
  MenuBarLogo: MenuBarLogo,
};

export const Images = {
  ...ImageLogosMap,
  loading: require('./loading.gif'),
  stackingEmptyList: require('./stacking-empty-list.png'),
  successStatusImg: require('./success-status.png'),
  failStatusImg: require('./fail-status.png'),
  backgroundImg: require('./subwallet-background-img.png'),
  historyEmpty: require('./transaction-history-coming-soon.png'),
  squircleBorder: require('./squircleBorder.png'),
  avatarPlaceholder: require('./avatar-placeholder.png'),
  subwalletDappLogo: require('./subwallet-dapp-logo.png'),
};
