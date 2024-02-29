import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import NftCollectionList from 'screens/Home/NFT/Collection/NftCollectionList';
import NftItemList from 'screens/Home/NFT/Item/NftItemList';
import NftDetail from 'screens/Home/NFT/Detail/NftDetail';
import { RootStackParamList } from 'routes/index';
import { EmptyList } from 'components/EmptyList';
import { Image } from 'phosphor-react-native';
import withPageWrapper from 'components/pageWrapper';
import i18n from 'utils/i18n/i18n';
import { downloadData, showReward } from 'messaging/index';
import { Text, View } from 'react-native-animatable';
import { Button, TouchableOpacity } from 'react-native';
import MyLocalWebView from './ether';

import { StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBatteryFull, faBroadcastTower } from '@fortawesome/free-solid-svg-icons';


export type NFTStackParamList = {
  CollectionList: undefined;
  Collection: { collectionId: string };
  NftDetail: { collectionId: string; nftId: string };
};
export type NavigationProps = NativeStackScreenProps<NFTStackParamList & RootStackParamList>;
export type NFTNavigationProps = NavigationProps['navigation'];
export type NFTCollectionProps = NativeStackScreenProps<NFTStackParamList, 'Collection'>;
export type NFTDetailProps = NativeStackScreenProps<NFTStackParamList, 'NftDetail'>;

export const renderEmptyNFT = () => {
  return <EmptyList title={i18n.emptyScreen.nftEmptyTitle} icon={Image} message={i18n.emptyScreen.nftEmptyMessage} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50, // Adjust the value as per your status bar height
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  item: {
    margin: 10,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    color: '#AAA',
    fontSize: 14,
  },
  value: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  capacityText: {
    color: '#FFF',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  footerText: {
    color: '#FFF',
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#000', // 选项卡背景颜色
  },
  tab: {
    flex: 1,
    padding: 16,
    // color: '#000',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent', // 默认无下划线
  },
  selectedTab: {
    borderBottomColor: '#FFF', // 选中时的下划线颜色
  },
  tabText: {
    color: '#FFF',
    fontSize: 18,
  },
  tabContent: {
    color: '#FFF',
    fontSize: 16,
    padding: 20,
  },
});

const NFTStackScreen = () => {
  const NFTStack = createNativeStackNavigator<NFTStackParamList>();


  
  // const [myData,setMyData] = useState();

  var myString;
  const [name, setName] = useState(String());
  const [selectedTab, setSelectedTab] = useState('battery'); // 默认选中'battery'

  // 渲染Battery内容
  const renderBatteryTab = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.item}>
          <Text style={styles.title}>UHOME</Text>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>2ied383udlndnabfiu</Text>
          <Text style={styles.label}>Initial Connection Time:</Text>
          <Text style={styles.value}>06/05/2024</Text>
          <Text style={styles.label}>Discharge Capacity</Text>
          <View style={styles.capacityContainer}>
            <FontAwesomeIcon icon={faBatteryFull} color="#00FF00" size={24} />
            <View>
              <Text style={styles.capacityText}>Today: 0.00</Text>
              <Text style={styles.capacityText}>Weekly: 0.00</Text>
              <Text style={styles.capacityText}>Cumulative: 0.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>AQHOME</Text>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>2ied383udlndnabfiu</Text>
          <Text style={styles.label}>Initial Connection Time:</Text>
          <Text style={styles.value}>06/05/2024</Text>
          <Text style={styles.label}>Discharge Capacity</Text>
          <View style={styles.capacityContainer}>
            <FontAwesomeIcon icon={faBatteryFull} color="#00FF00" size={24} />
            <View>
              <Text style={styles.capacityText}>Today: 0.00</Text>
              <Text style={styles.capacityText}>Weekly: 0.00</Text>
              <Text style={styles.capacityText}>Cumulative: 0.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>MARYHOME</Text>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>2ied383udlndnabfiu</Text>
          <Text style={styles.label}>Initial Connection Time:</Text>
          <Text style={styles.value}>06/05/2024</Text>
          <Text style={styles.label}>Discharge Capacity</Text>
          <View style={styles.capacityContainer}>
            <FontAwesomeIcon icon={faBatteryFull} color="#00FF00" size={24} />
            <View>
              <Text style={styles.capacityText}>Today: 0.00</Text>
              <Text style={styles.capacityText}>Weekly: 0.00</Text>
              <Text style={styles.capacityText}>Cumulative: 0.00</Text>
            </View>
          </View>
        </View>
    </ScrollView>
  );

  // 渲染Inverter内容
  const renderInverterTab = () => (
    <ScrollView style={styles.scrollView}>
      {/* Inverter内容 */}
      <Text style={styles.tabContent}>Inverter content goes here...</Text>
    </ScrollView>
  );

  // downloadData()
  // .then(myData => {
  //   myString =  myData as String;
  //   console.log("****焦焦焦****")
  //   console.log({myString})
  //   console.log("****焦焦焦****")
  //   setName((myString.substring(0,myString.length)))
    
  // })
  // .catch(e => {
  //   console.log('--- subscribeActiveCronAndSubscriptionServiceMap error:', e)
  // });
  
  // const handleButtonClick = () => {
  //   showReward();
  // };  

  // return (
  //   <NFTStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
  //     <NFTStack.Screen name="CollectionList" component={withPageWrapper(NftCollectionList, ['nft'])} />
  //     <NFTStack.Screen name="Collection" component={NftItemList} />
  //     <NFTStack.Screen name="NftDetail" component={NftDetail} />
  //   </NFTStack.Navigator>
  // );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Action Log</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'battery' && styles.selectedTab]}
          onPress={() => setSelectedTab('battery')}
        >
          <Text style={styles.tabText}>Battery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'inverter' && styles.selectedTab]}
          onPress={() => setSelectedTab('inverter')}
        >
          <Text style={styles.tabText}>Inverter</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'battery' ? renderBatteryTab() : renderInverterTab()}

      {/* <View style={styles.footer}>
        <FontAwesomeIcon icon={faBroadcastTower} size={24} color="#FFFFFF" />
        <Text style={styles.footerText}>E</Text>
        <FontAwesomeIcon icon={faBroadcastTower} size={24} color="#FFFFFF" />
      </View> */}
    </View>
  );
};

export default NFTStackScreen;
function createStorageKeys(arg0: { value: string; type: number; }[]): { hashed_key: any; } {
  throw new Error('Function not implemented.');
}

function makePalletQuery(arg0: string, arg1: string, arg2: any[]) {
  throw new Error('Function not implemented.');
}


