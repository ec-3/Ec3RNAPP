import { Images, SVGImages } from 'assets/index';
import { FileArrowDown, PlusCircle, Swatches } from 'phosphor-react-native';
import React, { Suspense, useCallback, useRef } from 'react';
import { ImageBackground, Platform, SafeAreaView, StatusBar, StyleProp, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, FontSemiBold, sharedStyles, STATUS_BAR_LIGHT_CONTENT } from 'styles/sharedStyles';
import i18n from 'utils/i18n/i18n';
import Text from 'components/Text';
import { useEC3Theme } from 'hooks/useEC3Theme';
import AccountActionButton from 'components/common/Account/AccountActionButton';
import { AccountCreationArea } from 'components/common/Account/AccountCreationArea';
import { SelectedActionType } from 'stores/types';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { ModalRef } from 'types/modalRef';

const imageBackgroundStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: Platform.OS === 'ios' ? 56 : 20,
  position: 'relative',
};

const logoStyle: StyleProp<any> = {
  width: '100%',
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative',
  alignItems: 'center',
  paddingBottom: 22,
};

// const logoTextStyle: StyleProp<any> = {
//   fontSize: 38,
//   lineHeight: 46,
//   ...FontSemiBold,
//   color: ColorMap.light,
//   paddingTop: 9,
// };

  const logoTextStyle = {
    fontSize: 38,
    fontWeight: 'bold',
    position: 'absolute',
    top: '65%',
    left: '55%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white',
    textAlign: 'center',
  };

const logoSubTextStyle: StyleProp<any> = {
  fontSize: 16,
  lineHeight: 24,
  ...FontMedium,
  color: 'rgba(255, 255, 255, 0.65)',
  paddingTop: 32,
};

const firstScreenNotificationStyle: StyleProp<any> = {
  ...sharedStyles.smallText,
  color: 'rgba(255, 255, 255, 0.45)',
  textAlign: 'center',
  paddingHorizontal: 16,
  paddingTop: 0,
  ...FontMedium,
};

export const FirstScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const hasMasterPassword = useSelector((state: RootState) => state.accountState.hasMasterPassword);
  const createAccountRef = useRef<ModalRef>();
  const importAccountRef = useRef<ModalRef>();
  const attachAccountRef = useRef<ModalRef>();
  const theme = useEC3Theme().swThemes;

  const onPressActionButton = useCallback((action: SelectedActionType) => {
    return () => {
      switch (action) {
        case 'createAcc':
          createAccountRef && createAccountRef.current?.onOpenModal();
          break;
        case 'attachAcc':
          attachAccountRef && attachAccountRef.current?.onOpenModal();
          break;
        case 'importAcc':
          console.log("---------------")
          importAccountRef && importAccountRef.current?.onOpenModal();
          break;
      }
    };
  }, []);

  const onPressTermsCondition = () => {
    Linking.openURL('https://docs.subwallet.app/main/privacy-and-security/terms-of-service');
  };

  const onPressPolicy = () => {
    Linking.openURL('https://docs.subwallet.app/main/privacy-and-security/privacy-policy');
  };

  const onCreate = useCallback(() => {
    if (hasMasterPassword) {
      navigation.navigate('CreateAccount', {});
    } else {
      navigation.navigate('CreatePassword', { pathName: 'CreateAccount' });
    }
  }, [hasMasterPassword, navigation]);

  const actionList = [
    {
      key: 'create',
      icon: PlusCircle,
      title: i18n.welcomeScreen.createAccLabel,
      subTitle: i18n.welcomeScreen.createAccMessage,
      onPress: onCreate,
    },
    {
      key: 'import',
      icon: FileArrowDown,
      title: i18n.welcomeScreen.importAccLabel,
      subTitle: i18n.welcomeScreen.importAccMessage,
      onPress: onPressActionButton('importAcc'),
    },
    // {
    //   key: 'attach',
    //   icon: Swatches,
    //   title: i18n.welcomeScreen.attachAccLabel,
    //   subTitle: i18n.welcomeScreen.attachAccMessage,
    //   onPress: onPressActionButton('attachAcc'),
    // },
  ];

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <StatusBar barStyle={STATUS_BAR_LIGHT_CONTENT} translucent={true} backgroundColor={'transparent'} />
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView />
        <View style={logoStyle}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginBottom: 16,
              paddingTop: 20,
              alignItems: 'center',
            }}>
              {/* <Text style={logoTextStyle}>Ec³</Text> */}
              <Text style={logoSubTextStyle}>{i18n.title.slogan}</Text>
          </View>

          <View style={{ width: '100%' }}>
            {actionList.map(item => (
              <AccountActionButton key={item.key} item={item} />
            ))}
          </View>
        </View>

        {/*//TODO: add hyperlink for T&C and Privacy Policy*/}
        <Text style={firstScreenNotificationStyle}>{i18n.common.firstScreenMessagePart1}</Text>
        <Text style={firstScreenNotificationStyle}>
          <Text onPress={onPressTermsCondition} style={{ color: theme.colorTextLight1 }}>
            {i18n.common.termAndConditions}
          </Text>
          <Text>{i18n.common.and}</Text>
          <Text onPress={onPressPolicy} style={{ color: theme.colorTextLight1 }}>
            {i18n.common.privacyPolicy}
          </Text>
        </Text>

        <AccountCreationArea
          createAccountRef={createAccountRef}
          importAccountRef={importAccountRef}
          attachAccountRef={attachAccountRef}
          allowToShowSelectType={true}
        />
        <SafeAreaView />
      </View>
    </View>
  );
};
