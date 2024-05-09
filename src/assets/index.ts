import React from 'react';
import { ImageLogosMap } from 'assets/logo';

const CheckBoxIcon = React.lazy(() => import('./checkbox.svg'));
const SignalIcon = React.lazy(() => import('./signal.svg'));
const SignalSplashIcon = React.lazy(() => import('./signal-splash.svg'));
const CheckBoxFilledIcon = React.lazy(() => import('./checkbox-filled.svg'));
const LogoGradient = React.lazy(() => import('./ec3_product.svg'));
const MenuBarLogo = React.lazy(() => import('./menu-bar.svg'));
const IcHalfSquare = React.lazy(() => import('./ic-half-square.svg'));
const WalletConnect = React.lazy(() => import('./wallet-connect.svg'));

export const SVGImages = {
  LogoGradient,
  CheckBoxIcon,
  CheckBoxFilledIcon,
  SignalIcon,
  SignalSplashIcon,
  MenuBarLogo,
  IcHalfSquare,
  WalletConnect,
};

export const Images = {
  ...ImageLogosMap,
  loading: require('./loading.gif'),
  stackingEmptyList: require('./stacking-empty-list.png'),
  successStatusImg: require('./success-status.png'),
  failStatusImg: require('./fail-status.png'),
  historyEmpty: require('./transaction-history-coming-soon.png'),
  squircleBorder: require('./squircleBorder.png'),
  avatarPlaceholder: require('./avatar-placeholder.png'),
  circleRobot: require('./circle-robot.png'),
  Logo:require('./icon_ect.png'),
};
