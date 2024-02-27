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
import { downloadData } from 'messaging/index';
import { Text, View } from 'react-native-animatable';

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


  console.log("****焦焦焦00****")
  console.log("****焦焦焦00****")
  
  const [age, setAge] = useState(String());

    useEffect(() => {
      downloadData()
    .then(myData => {
      myString =  myData as String;
      // console.log("****焦焦焦****")
      console.log({myString})
      // console.log("****焦焦焦****")
      setAge(myString.substring(0,myString.length))
    })
    .catch(e => {
      console.log('--- subscribeActiveCronAndSubscriptionServiceMap error:', e)
    });
    });
  

  

  // return (
  //   <NFTStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
  //     <NFTStack.Screen name="CollectionList" component={withPageWrapper(NftCollectionList, ['nft'])} />
  //     <NFTStack.Screen name="Collection" component={NftItemList} />
  //     <NFTStack.Screen name="NftDetail" component={NftDetail} />
  //   </NFTStack.Navigator>
  // );

  return (
    <View style={{height: 300,backgroundColor:"white"}}>
      <Text style={{textAlign:'center',fontSize:30,paddingTop:30}}>{age}</Text>
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

