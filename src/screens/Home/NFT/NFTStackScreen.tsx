import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import NftCollectionList from 'screens/Home/NFT/Collection/NftCollectionList';
import NftItemList from 'screens/Home/NFT/Item/NftItemList';
import NftDetail from 'screens/Home/NFT/Detail/NftDetail';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { EmptyList } from 'components/EmptyList';
// import { Image } from 'phosphor-react-native';
import withPageWrapper from 'components/pageWrapper';
import i18n from 'utils/i18n/i18n';
import { downloadData, showReward, getReward, mining } from 'messaging/index';
import { Text, View } from 'react-native-animatable';
import { ActivityIndicator, Image, Button, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ToggleItem } from 'components/ToggleItem';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { dev } from '@polkadot/types/interfaces/definitions';

export type NFTStackParamList = {
  CollectionList: undefined;
  Collection: { collectionId: string };
  NftDetail: { collectionId: string; nftId: string };
};
export type NavigationProps = NativeStackScreenProps<NFTStackParamList & RootStackParamList>;
export type NFTNavigationProps = NavigationProps['navigation'];
export type NFTCollectionProps = NativeStackScreenProps<NFTStackParamList, 'Collection'>;
export type NFTDetailProps = NativeStackScreenProps<NFTStackParamList, 'NftDetail'>;
const {width, height, scale} = Dimensions.get('window');

export const renderEmptyNFT = () => {
  return <EmptyList title={i18n.emptyScreen.nftEmptyTitle} icon={Image} message={i18n.emptyScreen.nftEmptyMessage} />;
};

export const  NFTStackScreen = () => {
  const NFTStack = createNativeStackNavigator<NFTStackParamList>();
  const navigation = useNavigation<RootNavigationProps>();

  const theme = useSubWalletTheme().swThemes;
  
  // const [myData,setMyData] = useState();

  var myString;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(String());
  const [devID, setDevID] = useState(String());
  const [initTime, setInitTime] = useState(String());
  const [todayData, setTodayData] = useState(String());
  const [weeklyData, setWeeklyData] = useState(String());
  const [cumulativeData, setCumulativeData] = useState(String());
  const [reward, setReward] = useState(String());

  downloadData()
  .then(myData => {
    myString =  myData as String;
    console.log("****焦焦焦****")
    console.log({myString})
    console.log("****焦焦焦****")
    setName((myString.substring(0,myString.length)))
    setDevID("2ied383udldndabfiu")
    setInitTime("06/05/2024")
    setTodayData((myString.substring(0,myString.length)))
    setWeeklyData((myString.substring(0,myString.length)))
    setCumulativeData((myString.substring(0,myString.length)))
    // setLoading(false); // 隐藏等待框
    showReward().then(reward => {
      setReward(reward)

      setLoading(false); // 隐藏等待框
    });
  })
  .catch(e => {
    console.log('--- subscribeActiveCronAndSubscriptionServiceMap error:', e)
  });
  
  const handleButtonClick = () => {
    setLoading(true); // 显示等待框
    showReward().then(reward => {
      setReward(reward)

      setLoading(false); // 隐藏等待框
    });

    
    // getReward();
    // mining();
  };


  return (

    
    // <View style={{ height: height, backgroundColor: "black", justifyContent: 'flex-start', alignItems: 'center' }}>
    
    //   <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 60, color: 'white' }}>Action Log</Text>

    //     <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 100, color: 'red' }}>data:{name}</Text>
        
    //     <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 30, color: 'black' }}>reward:{reward}</Text>
  
    //     <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, width: 200, height: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
    //       <Text style={{ color: 'white', fontSize: 20 }}>showReward</Text>
    //     </TouchableOpacity>
  
  
  
    //     {loading && (
    //       <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    //         <ActivityIndicator size="large" color="white" />
    //       </View>
    //     )}
    // </View>
    
    // <View style={{ height: height, backgroundColor: "black", justifyContent: 'flex-start', alignItems: 'center' }}>
    // <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 60, color: 'white' }}>Action Log</Text>

    // <View style={{ height: height, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'flex-start' }}>
    //   <View style={{ marginLeft: 0 }}>
    //     <Text style={{ textAlign: 'center', fontSize: 15, paddingTop: 30, color: 'white' }}>data:{name}</Text>
    //     <Text style={{ textAlign: 'center', fontSize: 15, paddingTop: 30, color: 'white' }}>reward:{reward}</Text>
    //   </View>
    //   <View style={{ marginLeft: 20 }}>
    //     <Image source={require('assets/fail-status.png')} style={{ width: 100, height: 100 }} />
    //     <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, width: 200, height: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
    //       <Text style={{ color: 'white', fontSize: 20 }}>showReward</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {loading && (
    //     <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    //       <ActivityIndicator size="large" color="white" />
    //     </View>
    //   )}
    // </View>
    // </View> 



    <View style={{ height: height, backgroundColor: theme.colorBgSecondary, justifyContent: 'flex-start', alignItems: 'center' }}>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'white', width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 40, paddingBottom: 10,  color: 'white' }}>Action Log</Text>
      </View>
      <View style={{ height: 'auto', backgroundColor: theme.colorBgSecondary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>ID: {devID}</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Initial Connection Time: {initTime}</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Discharge Capacity</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Today: {todayData}</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Weekly: {weeklyData}</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Cumulative: {cumulativeData}</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Reward: {reward ? reward + ' ECT' : null}</Text>
        </View>
        <View style={{ marginRight: 20,  justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('assets/BatteryCharging.png')} style={{ width: 32, height: 32 }} />
          {/* <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, backgroundColor: '#242424', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>getReward</Text>
          </TouchableOpacity> */}

        </View>
      </View>
      
      {parseFloat(reward) > 0 && (
      <View style={{ height: 'auto', backgroundColor: theme.colorBgSecondary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0 }}>
        <View style={{ marginLeft: 20, flex: 1 }}>
        </View>
        <View style={{ marginRight: 20,  justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, backgroundColor: '#242424', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>getReward</Text>
          </TouchableOpacity>

        </View>
      </View>
      )}
      
      {loading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      {/* <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'white', width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 10, color: 'white' }}></Text>
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


