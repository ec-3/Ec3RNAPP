import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import NftCollectionList from 'screens/Home/NFT/Collection/NftCollectionList';
import NftItemList from 'screens/Home/NFT/Item/NftItemList';
import NftDetail from 'screens/Home/NFT/Detail/NftDetail';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { EmptyList } from 'components/EmptyList';
import { Image } from 'phosphor-react-native';
import withPageWrapper from 'components/pageWrapper';
import i18n from 'utils/i18n/i18n';
import { downloadData, showReward, getReward, mining } from 'messaging/index';
import { Text, View } from 'react-native-animatable';
import { ActivityIndicator, Button, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ToggleItem } from 'components/ToggleItem';
import { SubScreenContainer } from 'components/SubScreenContainer';

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


  
  // const [myData,setMyData] = useState();

  var myString;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(String());
  const [reward, setReward] = useState(String());

  downloadData()
  .then(myData => {
    myString =  myData as String;
    console.log("****焦焦焦****")
    console.log({myString})
    console.log("****焦焦焦****")
    setName((myString.substring(0,myString.length)))
    setLoading(false); // 隐藏等待框
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






  // return (
  //   <NFTStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
  //     <NFTStack.Screen name="CollectionList" component={withPageWrapper(NftCollectionList, ['nft'])} />
  //     <NFTStack.Screen name="Collection" component={NftItemList} />
  //     <NFTStack.Screen name="NftDetail" component={NftDetail} />
  //   </NFTStack.Navigator>
  // );


  return (

    
    <View style={{ height: height, backgroundColor: "white", justifyContent: 'flex-start', alignItems: 'center' }}>
    
        <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 100, color: 'red' }}>data:{name}</Text>
        
        <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 30, color: 'black' }}>reward:{reward}</Text>
  
        <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, width: 200, height: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>showReward</Text>
        </TouchableOpacity>
  
  
  
        {loading && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
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


