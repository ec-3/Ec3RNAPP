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

const NFTStackScreen = () => {
  const NFTStack = createNativeStackNavigator<NFTStackParamList>();


  
  // const [myData,setMyData] = useState();

  var myString;
  const [name, setName] = useState(String());

  downloadData()
  .then(myData => {
    myString =  myData as String;
    console.log("****焦焦焦****")
    console.log({myString})
    console.log("****焦焦焦****")
    setName((myString.substring(0,myString.length)))
    
  })
  .catch(e => {
    console.log('--- subscribeActiveCronAndSubscriptionServiceMap error:', e)
  });
  
  const handleButtonClick = () => {
    showReward();
  };


  // return (
  //   <View style={{height: 300,backgroundColor:"white"}}>
  //     <Text style={{textAlign:'center',fontSize:30,paddingTop:30}}>{name}</Text>
  //   </View>
  // );
  

  // return (
  //   <NFTStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
  //     <NFTStack.Screen name="CollectionList" component={withPageWrapper(NftCollectionList, ['nft'])} />
  //     <NFTStack.Screen name="Collection" component={NftItemList} />
  //     <NFTStack.Screen name="NftDetail" component={NftDetail} />
  //   </NFTStack.Navigator>
  // );


  return (
    <View style={{ height: 300, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 30, color: 'red' }}>{name}</Text>
      
      <TouchableOpacity onPress={handleButtonClick} style={{ marginTop: 20, width: 200, height: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>showReward</Text>
      </TouchableOpacity>
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


