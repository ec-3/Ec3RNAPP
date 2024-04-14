import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InitSecretPhrase } from 'screens/Account/CreateAccount1/InitSecretPhrase';
import { VerifySecretPhrase } from 'screens/Account/CreateAccount1/VerifySecretPhrase';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import { createAccountSuriV2, createSeedV2 } from 'messaging/index';
import { useNavigation } from '@react-navigation/native';
import { CreateAccountProps, RootNavigationProps, RootStackParamList } from 'routes/index';
import i18n from 'utils/i18n/i18n';
import { backToHome } from 'utils/navigation';
import useGoHome from 'hooks/screen/useGoHome';
import useHandlerHardwareBackPress from 'hooks/screen/useHandlerHardwareBackPress';
import { EVM_ACCOUNT_TYPE, SUBSTRATE_ACCOUNT_TYPE } from 'constants/index';
import useGetDefaultAccountName from 'hooks/useGetDefaultAccountName';


import { View, FlatList, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Number } from 'components/design-system-ui';
import { ModalRef } from 'types/modalRef';
import { KeypairType } from '@polkadot/util-crypto/types';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import LinearGradient from 'react-native-linear-gradient';
import { ActionItemType } from 'components/Modal/AccountActionSelectModal';
// import { Text } from 'react-native-svg';
const { width } = Dimensions.get('window');

// const navigation = useNavigation<RootNavigationProps>();



// const createAccountRef = useRef<ModalRef>();
// const importAccountRef = useRef<ModalRef>();
// const attachAccountRef = useRef<ModalRef>();
// const selectTypeRef = useRef<ModalRef>();
// const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);





const  data = [
  { key: 'page1', backgroundColor: 'black' },
  { key: 'page2', backgroundColor: 'black' },
];
const ViewStep = {
  INIT_SP: 1,
  VERIFY_SP: 2,
};

function getHeaderTitle(viewStep: number) {
  if (viewStep === ViewStep.INIT_SP) {
    // return i18n.header.yourSeedPhrase;
    return "Add New Wallet"
  } else if (viewStep === ViewStep.VERIFY_SP) {
    return i18n.header.verifySeedPhrase;
  }
}

const defaultKeyTypes = [SUBSTRATE_ACCOUNT_TYPE, EVM_ACCOUNT_TYPE];

export const CreateAccount1 = ({ route: { params } }: CreateAccountProps) => {
  const [currentViewStep, setCurrentViewStep] = useState<number>(ViewStep.INIT_SP);
  const [seed, setSeed] = useState<null | string>(null);
  const [isBusy, setIsBusy] = useState(false);
  const navigation = useNavigation<RootNavigationProps>();
  const goHome = useGoHome();
  const accountName = useGetDefaultAccountName();



const renderItem = ({ item, index }:{item:any,index:any}) => {
  if(index ===0) {
    return (
      <View style={{width,height:'100%',backgroundColor:item.backgroundColor,alignItems:'center'}}>
        {/* <Text>{item.key}</Text>
        <Text>{item.backgroundColor}</Text> */}
        <Image
          source={require('./wallet_new.png')}
          style={{width:60,height:60,marginTop:100}}
        />
        <Text style={{fontSize:30,color:'white',marginTop:10,textAlign:'center'}}>
          Create {'\n'} New Wallet
        </Text>
        
        <Text numberOfLines={2} style={{fontSize:16,color:'#767676',marginTop:30,textAlign:'center'}}>
          Every new wallet is protected by 24 secure {'\n'} words, serving as your access key.
        </Text>

        <Text numberOfLines={2} style={{fontSize:16,color:'#5AEB46',marginTop:30,textAlign:'center'}}>
          Write them down, keep them {'\n'} safe, and don't share.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.buttonText}>Create New Wallet</Text>
        </TouchableOpacity>

      </View>
    );
  }else {
    return (
      <View style={{width,height:'100%',backgroundColor:item.backgroundColor,alignItems:'center'}}>
     
        <Image
          source={require('./importWallet.png')}
          style={{width:60,height:60,marginTop:100}}
        />
        <Text style={{fontSize:30,color:'white',marginTop:10,textAlign:'center'}}>
          Import {'\n'} Wallet
        </Text>
        

        <Text numberOfLines={2} style={{fontSize:16,color:'#5AEB46',marginTop:30,textAlign:'center'}}>
          Access your existing wallet, have its 24-word {'\n'} passphrase ready.    
        </Text>

        


        <View style={{flexDirection :'row',justifyContent: 'space-between'}}>

          <TouchableOpacity style={[styles.importButton, { marginRight: 20 }]} onPress={() => importAccountActionFunc('secretPhrase')}>
            <LinearGradient
                colors={['#6F63F6', '#5AEB46']}
                start={{x: 0, y: 0}} // 从左到右
                end={{x: 1, y: 0}} // 从左到右
                style={styles.gradient}>
                  <Text style={styles.buttonText}>Mnemonic{'\n'}Phrase</Text>
                </LinearGradient>
            </TouchableOpacity>


          
            <TouchableOpacity style={[styles.importButton, { marginRight: 20 }]} onPress={() => importAccountActionFunc('privateKey')}>
            <LinearGradient
                colors={['#6F63F6', '#5AEB46']}
                start={{x: 0, y: 0}} // 从左到右
                end={{x: 1, y: 0}} // 从左到右
                style={styles.gradient}>
            <Text style={styles.buttonText}>Private {'\n'} Key</Text>
                </LinearGradient>
            </TouchableOpacity>



        </View>
        
      </View>
    );
  }
  
};




  useHandlerHardwareBackPress(isBusy);
  useEffect((): void => {
    createSeedV2(undefined, undefined, defaultKeyTypes)
      .then((response): void => {
        // @ts-ignore
        setSeed(response.seed);
      })
      .catch(console.error);
  }, [params]);

  const onPressBack = () => {
    if (currentViewStep === ViewStep.INIT_SP) {
      navigation.goBack();
    } else if (currentViewStep === ViewStep.VERIFY_SP) {
      setCurrentViewStep(ViewStep.INIT_SP);
    }
  };

  const onPressSubmitInitSecretPhrase = () => {
    setCurrentViewStep(ViewStep.VERIFY_SP);
  };

  const onCreateAccount = () => {
      navigation.navigate('CreateAccount', { keyTypes: params?.keyTypes || defaultKeyTypes });
  };

  // const importSecretPhrase = () => {
  //   navigation.navigate('CreateAccount', { keyTypes: params?.keyTypes || defaultKeyTypes });
  // };

  const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);

  const importAccountActionFunc = (item: string) => {
    let pathName: keyof RootStackParamList;
    if (item === 'secretPhrase') {
      pathName = 'ImportSecretPhrase';
    } else if (item === 'restoreJson') {
      pathName = 'RestoreJson';
    } else if (item === 'privateKey') {
      pathName = 'ImportPrivateKey';
    } else {
      pathName = 'ImportQrCode';
    }
    console.log("jiaoqilong--====")
    console.log(item)
    console.log(pathName)

    
    console.log(pathName)
    setTimeout(() => {
      if (hasMasterPassword) {
        // @ts-ignore
        navigation.navigate(pathName);
      } else {
        // @ts-ignore
        navigation.navigate('CreatePassword', { pathName: pathName });
      }
    }, 300);
  };


  const getTitle = (index: number) => {
    if(index === 0) {
      return "New"
    }else {
      return "Import"
    }
  };

  const PaginationIndicator = ({ selectedIndex }:{selectedIndex:any}) => {
    return (

      <View style={styles.indicatorContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.indicatorItem}>
            <Text
              style={[
                styles.indicatorText,
                index === selectedIndex ? styles.activeText : null
              ]}
            >
              {getTitle(index)}
            </Text>
          <View style={{width: 80,  height: 3,  backgroundColor: selectedIndex === index? 'white' : 'black', marginTop: 17 }} />            
          </View>
        ))}
      </View>

    );
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePageChange = (event: { nativeEvent: { contentOffset: any; }; }) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setSelectedIndex(index);
  };


  return (
    <ContainerWithSubHeader onPressBack={onPressBack} disabled={isBusy} title={getHeaderTitle(currentViewStep)}>
      <>
        {/* {!!seed && (
          <>
            {currentViewStep === ViewStep.INIT_SP && (
              <InitSecretPhrase seed={seed} onPressSubmit={onPressSubmitInitSecretPhrase} />
            )}
            {currentViewStep === ViewStep.VERIFY_SP && (
              <VerifySecretPhrase seed={seed} onPressSubmit={onCreateAccount} isBusy={isBusy} navigation={navigation} />
            )}
          </>
        )} */}
      <PaginationIndicator selectedIndex={selectedIndex} />

      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        onScroll={handlePageChange}
        stickyHeaderHiddenOnScroll={true}
        scrollEventThrottle={16}
      />

      </>

    </ContainerWithSubHeader>
  );

  

  
  
};
const styles = StyleSheet.create({
  page: {
    width,
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 20,
    backgroundColor:'black',
    height:44
  },
  indicator: {
    width: 30,
    height: 30,
    borderRadius: 5,
    // backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: 'blue',
  },
  indicatorText: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 50,
  
    // backgroundColor:'white'
  },
  activeText: {
    color: 'white',
  },
  indicatorItem: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
  indicatorLine: {
    width: 80, // 调整横线的宽度
    height: 3,
    backgroundColor: 'white',
    // marginTop: 10, // 调整横线与文本之间的间距
  },
  pageContainer: {
    width, // 使页面铺满整个屏幕
    height: '100%', // 使用百分比设置页面高度
    justifyContent: 'center', // 居中内容
    alignItems: 'center', // 居中内容
    backgroundColor:'red'
  },
  button: {
    backgroundColor: '#5AEB46',
    padding: 10,
    borderRadius: 15, // 圆角半径，可以根据需要调整
    width:300,
    height:80,
    marginTop:40,
    // alignItems:'center',
    // textAlign:'center',
    justifyContent:'center'
  },
  importButton: {
    // backgroundColor: '#5AEB46',
    padding: 10,
    borderRadius: 15, // 圆角半径，可以根据需要调整
    width:170,
    height:80,
    marginTop:60,
    // alignItems:'center',
    // textAlign:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
  gradient: {
    width: 170,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});