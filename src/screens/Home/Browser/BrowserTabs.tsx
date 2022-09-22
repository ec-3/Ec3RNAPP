import React, { useEffect } from 'react';
import { ScrollView, StyleProp, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { IconButton } from 'components/IconButton';
import { X } from 'phosphor-react-native';
import { closeAllTab, closeTab, updateActiveTab } from 'stores/updater';
import { FontMedium, FontSize2 } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { getHostName } from 'utils/browser';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';

const tabItemStyle: StyleProp<any> = {
  marginBottom: 20,
  position: 'relative',
};

const tabItemHeaderStyle: StyleProp<any> = {
  justifyContent: 'center',
  backgroundColor: ColorMap.dark2,
  height: 32,
  paddingHorizontal: 14,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
};

const tabItemBodyStyle: StyleProp<any> = {
  height: 128,
  backgroundColor: ColorMap.light,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
};

const tabItemTitleStyle: StyleProp<any> = {
  ...FontSize2,
  ...FontMedium,
  color: ColorMap.light,
};

function getTabItemOverlayStyle(isActive: boolean): StyleProp<any> {
  const style: StyleProp<any> = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    borderRadius: 5,
  };

  if (isActive) {
    style.borderWidth = 1;
    style.borderColor = ColorMap.secondary;
  }

  return style;
}

const actionButtonStyle: StyleProp<any> = {
  paddingHorizontal: 16,
};

const actionButtonTitleStyle: StyleProp<any> = {
  ...FontSize2,
  ...FontMedium,
  lineHeight: 50,
  color: ColorMap.light,
};

//todo: style
//todo: i18n
//todo: take screenshot of site to make tab thumbnail
export const BrowserTabs = () => {
  const activeTab = useSelector((state: RootState) => state.browser.activeTab);
  const tabs = useSelector((state: RootState) => state.browser.tabs);
  const navigation = useNavigation<RootNavigationProps>();

  useEffect(() => {
    if (!tabs.length) {
      navigation.navigate('Home', { tab: 'Browser' });
    }
  }, [tabs.length, navigation]);

  const onPressItem = (id: string) => {
    updateActiveTab(id);
    navigation.navigate('BrowserTab', {});
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        {tabs.map(t => (
          <View key={t.id} style={tabItemStyle}>
            <View style={tabItemHeaderStyle}>
              <Text style={tabItemTitleStyle}>{getHostName(t.url)}</Text>
            </View>
            <View style={tabItemBodyStyle}>
              <Text>{t.url}</Text>
            </View>
            <TouchableOpacity style={getTabItemOverlayStyle(t.id === activeTab)} onPress={() => onPressItem(t.id)} />
            <IconButton
              icon={X}
              size={16}
              color={ColorMap.disabled}
              style={{ width: 40, height: 40, position: 'absolute', right: -4, top: -4 }}
              onPress={() => closeTab(t.id)}
            />
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 20,
          borderTopWidth: 1,
          borderTopColor: ColorMap.dark2,
        }}>
        <TouchableOpacity
          style={actionButtonStyle}
          onPress={() => {
            closeAllTab();
            // go back to tab Browser in screen Home
          }}>
          <Text style={actionButtonTitleStyle}>Close All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={actionButtonStyle}
          onPress={() => {
            navigation.navigate('BrowserSearch', { isOpenNewTab: true });
          }}>
          <Text style={actionButtonTitleStyle}>Create New Tab</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={actionButtonStyle}
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}>
          <Text style={actionButtonTitleStyle}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
