import React, { useEffect, useMemo, useState, useRef, } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import NftCollectionList from 'screens/Home/NFT/Collection/NftCollectionList';
import NftItemList from 'screens/Home/NFT/Item/NftItemList';
import NftDetail from 'screens/Home/NFT/Detail/NftDetail';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { EmptyList } from 'components/EmptyList';
// import { Image } from 'phosphor-react-native';
import withPageWrapper from 'components/pageWrapper';
import i18n from 'utils/i18n/i18n';
import { downloadData, showReward, getReward, mining, downloadDataWith } from 'messaging/index';
import { Text, View } from 'react-native-animatable';
import { ActivityIndicator, Image, Button, TouchableOpacity,Dimensions,  Alert, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ToggleItem } from 'components/ToggleItem';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { dev } from '@polkadot/types/interfaces/definitions';
import { mmkvStore } from 'utils/storage';
import { BLE_DEVICE_DID_ADDR_KEY, BLE_DEVICE_INIT_TIME_KEY, generateDeviceDataPrefix, generateDeviceDataConsumptionPrefix, calculateRound,
  generateDeviceRewardValuePrefix, generateDeviceRewardStatusPrefix, generateDeviceMiningLastRoundPrefix, generateDeviceGetRewardLastRoundPrefix, 
  calculateTimestampByRound, generateDeviceDataConsumptionBAKPrefix } from 'constants/index';

import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { isAccountAll } from '@subwallet/extension-base/utils';
import SpinnerGap from 'assets/SpinnerGap.png'; // 替换为SpinnerGap图片的路径

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

function alert(text: string) {
  Alert.alert('', text, [{text: 'Confirm', onPress: () => {}}]);
}

export const  DeviceActionScreen = () => {
  const [activeTab, setActiveTab] = useState('battery');

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  const NFTStack = createNativeStackNavigator<NFTStackParamList>();
  const navigation = useNavigation<RootNavigationProps>();

  const theme = useSubWalletTheme().swThemes;
  
  // const [myData,setMyData] = useState();

  // var myString;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(String());
  const [devID, setDevID] = useState(String());
  const [initTime, setInitTime] = useState(String());
  const [todayData, setTodayData] = useState(String());
  const [weeklyData, setWeeklyData] = useState(String());
  const [cumulativeData, setCumulativeData] = useState(String());
  const [reward, setReward] = useState(String());

  const formatTimestampToDateTimeString = (timestamp) => {  //timestamp单位为秒
    const date = new Date(timestamp * 1000); // 注意JavaScript中的时间戳是以毫秒为单位的，所以乘以1000转换为毫秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并且保证两位数
    const day = date.getDate().toString().padStart(2, '0'); // 保证两位数
    const hours = date.getHours().toString().padStart(2, '0'); // 保证两位数
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 保证两位数
    const seconds = date.getSeconds().toString().padStart(2, '0'); // 保证两位数

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


  // 获取当前时间前面一个5秒的倍数时间戳的秒值
  // const getNearestMultipleOf5Seconds = () => {
  //   const currentTimestamp = Date.now();
  //   const nearestMultipleOf5 = Math.floor(currentTimestamp / 5000) * 5; //000;
  //   return nearestMultipleOf5 - 200;  
  // };
  const getNearestMultipleOf5Seconds = () => {  //取100秒的整数, 单位为秒
    const currentTimestamp = Date.now();
    const nearestMultipleOf100 = Math.floor(currentTimestamp / 100000) * 100; //000;
    return nearestMultipleOf100 - 200;
  };

  // 获取当天的零点时间戳的秒值
  const getTodayStartTimestampInSeconds = () => { 
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return Math.floor(todayStart.getTime() / 1000);
  }; 
  
  
  // 获取本周第一天的零点时间戳的秒值
  const getFirstDayOfWeekStartTimestampInSeconds = () => {
      const now = new Date();
      const firstDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
      return Math.floor(firstDayOfWeek.getTime() / 1000);
  };
  
  const getCertainTimeConsumption = async (certainTime: number): Promise<number> => {
    console.log("******** start check certain time == ", certainTime);
    let certainTimeConsumption = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(certainTime)) ?? -1;
    console.log("******** mmkvstore certainTimeConsumption == ", certainTimeConsumption);
    if (certainTimeConsumption == -1) {
      const myDataCertainTime = ""; //await downloadDataWith((certainTime).toString());
      const myStringCertainTime =  myDataCertainTime as string;
      console.log("******** myDataCertainTime == ", myDataCertainTime);
      if (myStringCertainTime.length > 0) {
        const parsedDataCertainTime = JSON.parse(myStringCertainTime);
        console.log("******** json.parsedDataCertainTime.Consumption == ",parsedDataCertainTime.Consumption)
        certainTimeConsumption = parsedDataCertainTime.Consumption;
        mmkvStore.set(generateDeviceDataConsumptionPrefix(certainTime), certainTimeConsumption);
      } else {
        certainTimeConsumption = mmkvStore.getNumber(generateDeviceDataConsumptionBAKPrefix(certainTime)) ?? -1;
        console.log("******** get bak data Consumption == ",certainTimeConsumption)
        if (certainTimeConsumption == -1) {
          certainTimeConsumption = 0;
          // mmkvStore.set(generateDeviceDataConsumptionBAKPrefix(certainTime), certainTimeConsumption);
        }
      }
    }
    console.log("******** end check certain got == ", certainTimeConsumption);
    return certainTimeConsumption;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 使用当前时间戳计算轮次值
        const timestamp = Date.now(); // 当前时间戳
        const round = calculateRound(timestamp);    //要领奖励的话应该是上一轮 round-1
        console.log("当前时间戳对应的轮次值是：", round);

        const nearestMultiple = getNearestMultipleOf5Seconds();
        console.log("获取当前时间前面一个5秒-[变成100秒]-的倍数时间戳的秒值 nearestMultiple:", nearestMultiple);
        var formattedDateTimeString = formatTimestampToDateTimeString(nearestMultiple);
        console.log("***以上对应通用显示形式:", formattedDateTimeString);
        console.log("**************** start getdata:", Date.now());
        // const myData = await downloadDataWith("sensorData");
        // console.log("******** nearestMultiple == ", nearestMultiple); 
        const currConsumption = await getCertainTimeConsumption(nearestMultiple);
        console.log("***** get currConsumption:", currConsumption);
        // const myData = await downloadDataWith((nearestMultiple).toString());
        // myString =  myData as string;
        // console.log("******** myString == ", myString);
        // if (myString.length == 0) {  //debug
        //   myString = '{"Voltage":"78.77","Current":"17.97","Power":"1.42","Consumption":"4.54","Polarity":"1"}';
        // }
        
        // console.log("******** key == ", generateDeviceDataPrefix(nearestMultiple));
        // mmkvStore.set(generateDeviceDataPrefix(nearestMultiple), myString);

        // 模拟从API获取的JSON数据
        // const jsonData = '{"Voltage":"78.77","Current":"17.97","Power":"1.42","Consumption":"0.04","Polarity":"1"}';
        // 解析JSON数据
        // const parsedData = JSON.parse(myString);
        // console.log("******** json.parsedData.Consumption == ",parsedData.Consumption)
        // const currConsumption: number = Number(parsedData.Consumption);
        const lastMiningRound = mmkvStore.getNumber(generateDeviceMiningLastRoundPrefix()) ?? 1;
        console.log("*** lastMiningRound:", lastMiningRound);
        // const today0Time = getTodayStartTimestampInSeconds();
        const today0Time = calculateTimestampByRound(round-1);  //TODO: for test
        console.log("当天的零点时间戳的秒值:", today0Time);
        formattedDateTimeString = formatTimestampToDateTimeString(today0Time);
        console.log("***以上对应通用显示形式:", formattedDateTimeString);
        if (nearestMultiple == today0Time) {
          mmkvStore.set(generateDeviceDataConsumptionPrefix(nearestMultiple), currConsumption);
        }
        const nextDay0Time = today0Time + 24*60*60;
        mmkvStore.set(generateDeviceDataConsumptionBAKPrefix(nextDay0Time), currConsumption); //备份为后一天的零点的数据
        console.log("*** set bak data for nextDay0Time:", nextDay0Time, currConsumption);
        const checkdata = mmkvStore.getNumber(generateDeviceDataConsumptionBAKPrefix(nextDay0Time)) ?? "-1";
        console.log("*** get bak data for nextDay0Time:", nextDay0Time, checkdata);
        if (mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(0)) ?? -1 < 0) {  //存储设备添加后的第一条数据记录
          mmkvStore.set(generateDeviceDataConsumptionPrefix(0), currConsumption);
        }
        // var today0TimeConsumption = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(today0Time)) ?? -1;
        // if (today0TimeConsumption == -1) {
        //   const myDataToday0Time = await downloadDataWith((today0Time).toString());
        //   const myStringToday0Time =  myDataToday0Time as string;
        //   console.log("******** myDataToday0Time == ", myDataToday0Time);
        //   if (myStringToday0Time.length > 0) {
        //     const parsedDataToday0Time = JSON.parse(myStringToday0Time);
        //     console.log("******** json.parsedDataToday0Time.Consumption == ",parsedDataToday0Time.Consumption)
        //     today0TimeConsumption = parsedDataToday0Time.Consumption;
        //   } else {
        //     today0TimeConsumption = 0;
        //   }
        // }
        const today0TimeConsumption = await getCertainTimeConsumption(today0Time);
        console.log("***** get today0TimeConsumption:", today0TimeConsumption);

        const weekly0Time = getFirstDayOfWeekStartTimestampInSeconds();
        console.log("本周第一天的零点时间戳的秒值:", weekly0Time);
        formattedDateTimeString = formatTimestampToDateTimeString(weekly0Time);
        console.log("***以上对应通用显示形式:", formattedDateTimeString);
        // const weekly0TimeConsumption = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(weekly0Time)) ?? 0;
        const weekly0TimeConsumption = await getCertainTimeConsumption(weekly0Time);
        console.log("***** get weekly0TimeConsumption:", weekly0TimeConsumption);

        // setName((myString.substring(0,myString.length)))
        const resultStore = mmkvStore.getString(BLE_DEVICE_DID_ADDR_KEY) ?? "5GBpnoZbJ5NWi95wxAeET1UUD1ouvpayFwSTTiisshtVnk1u";
        // setDevID('5GBpnoZbJ5NWi95wxAeET1UUD1ouvpayFwSTTiisshtVnk1u');
        setDevID(resultStore);
        const initTime = mmkvStore.getString(BLE_DEVICE_INIT_TIME_KEY) ?? "06/03/2024";
        setInitTime(initTime);
        // setCumulativeData((myString.substring(0,myString.length)))

        setTodayData((currConsumption - today0TimeConsumption).toFixed(2)+" kwh");
        setWeeklyData((currConsumption - weekly0TimeConsumption).toFixed(2)+" kwh");
        setCumulativeData(currConsumption+" kwh");




        //以下的计算等测试完整后需要移到下面的if之内
        const lastMiningRoundNext0Time = calculateTimestampByRound(lastMiningRound);
        console.log("***最后一次mining的轮次后面一天的零点时间戳[也就是下次mining的数据起点]是:", lastMiningRoundNext0Time);
        formattedDateTimeString = formatTimestampToDateTimeString(lastMiningRoundNext0Time);
        console.log("***以上对应通用显示形式:", formattedDateTimeString);
        // const startTimeData = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(lastMiningRoundNext0Time)) ?? 0;
        const startTimeData = await getCertainTimeConsumption(lastMiningRoundNext0Time);
        const data = 1;//Number((today0TimeConsumption - startTimeData).toFixed(2)) * 1000;
        console.log("***mining startTimeData:", startTimeData);
        console.log("***mining today0TimeConsumption:", today0TimeConsumption);
        console.log("***mining data:", data);

        if (round > lastMiningRound) {
          if (data > 0) {
            mining(data, round-1).then(() => {
              showReward(round-1).then(reward => {
                setReward(reward);
                setLoading(false); // 隐藏等待框
                console.log("**************** end getdata:", Date.now());
              });
            });
          } else {  //0值可以不处理, 下一轮有新值时依然可以从此轮开始算起
            setReward("0");
            setLoading(false); // 隐藏等待框

            mmkvStore.set(generateDeviceMiningLastRoundPrefix(), round-1); //此轮无数据mining, 也刷新下最新一次的mining轮数
            mmkvStore.set(generateDeviceRewardValuePrefix(round-1), 0);     //无数据, 对应记录奖励为0, 不用去链上获取了, 因为0奖励没有链上的记录
            mmkvStore.set(generateDeviceRewardStatusPrefix(round-1), true); //奖励为0的轮次保存为已经领取的状态
          }
        } else {
          showReward(round-1).then(reward => {
            setReward(reward);
            setLoading(false); // 隐藏等待框
            console.log("**************** end getdata:", Date.now());
          });
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 首次加载执行一次

    const intervalId = setInterval(fetchData, 100*1000); // 每60秒执行一次

    return () => clearInterval(intervalId); // 组件卸载时清除定时器
  }, []); // 依赖项为空数组，确保仅在组件挂载时执行一次



  
  const fullAccounts = useSelector((state: RootState) => state.accountState.accounts);
  const currentAccountAddress = useSelector((state: RootState) => state.accountState.currentAccount?.address);
  // const accounts = useMemo(() => {
  //   if (fullAccounts.length > 2) {
  //     return fullAccounts;
  //   }

  //   return fullAccounts.filter(a => !isAccountAll(a.address));
  // }, [fullAccounts]);


  const handleButtonClick = () => { 
    console.log("*******fullAccounts=:", fullAccounts);
    console.log("*******currentAccountAddress=:", currentAccountAddress);
    // console.log("*******accounts=:", accounts);

    const ethereumAccounts = fullAccounts.filter(account => account.type === 'ethereum');
    console.log("Ethereum Accounts:", ethereumAccounts);
    console.log("Ethereum Accounts address:::", ethereumAccounts[0].address);

    const timestamp = Date.now(); // 当前时间戳 
    const round = calculateRound(timestamp);  //TODO: round应该需要先记录下来 领取多个的
    console.log("当前时间戳对应的轮次值是：", round);

    setLoading(true); // 显示等待框
    getReward(ethereumAccounts[0].address, round-1).then(reward => {
      alert("Congratulations! Rewards received. Pleace check your wallet.")
       setLoading(false); // 隐藏等待框
      
      showReward(round-1).then(reward => {
        setReward(reward);
        setLoading(false); // 隐藏等待框
        console.log("**************** end getdata:", Date.now());
      });
    });
    
  };


  return (
    <View style={{ height: height, backgroundColor: theme.colorBgSecondary, justifyContent: 'flex-start', alignItems: 'center' }}>
      <View style={{ borderBottomWidth: 0, borderBottomColor: 'white', width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 30, paddingTop: 40, paddingBottom: 10, color: 'white' }}>Action Log</Text>
      </View>

      {/* Tab Buttons */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#FFF', width: '100%', paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 70 }}>
          <TouchableOpacity 
            onPress={() => setActiveTab('battery')} 
            style={{ borderBottomWidth: activeTab === 'battery' ? 2 : 0, borderBottomColor: activeTab === 'battery' ? 'white' : 'transparent', paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ color: activeTab === 'battery' ? 'white' : '#888', fontSize: 16 }}>Battery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('inverter')} 
            style={{ borderBottomWidth: activeTab === 'inverter' ? 2 : 0, borderBottomColor: activeTab === 'inverter' ? 'white' : 'transparent', paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ color: activeTab === 'inverter' ? 'white' : '#888', fontSize: 16 }}>Inverter</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Content based on Active Tab */}
      {activeTab === 'battery' && (
        <View style={{ flex: 1 }}>
          {/* Battery Content */}
          <View style={{ backgroundColor: theme.colorBgSecondary, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 20 }}>
            <View style={{ marginLeft: '6%', marginRight:'6%', width: '88%'  }}>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>ID: {devID}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Initial Connection Time: {initTime}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ flex: 1, textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Discharge Capacity</Text>
                <Image source={require('assets/BatteryCharging.png')} style={{ width: 32, height: 32 }} />
              </View>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Today: {todayData}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Weekly: {weeklyData}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Cumulative: {cumulativeData}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, paddingTop: 6, color: 'white' }}>Reward: {reward ? reward + ' ECT' : null}</Text>
            </View>
          </View>

          {/* Get Rewards Button */}
          {parseFloat(reward) > 0 && (
            <View style={{ backgroundColor: theme.colorBgSecondary, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
              <TouchableOpacity onPress={handleButtonClick} style={{ backgroundColor: '#454545', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Get Rewards</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Loading Indicator */}
          {loading && (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </View>
      )}


      {activeTab === 'inverter' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'white', bottom: 41 }}>Upcoming</Text>
            {/* <ActivityIndicator size="large" color="white" /> */}
            <Animated.Image
              source={SpinnerGap}
              style={{
                width: 50,
                height: 50,
                transform: [{ rotate: spin }],
              }}
            />
          </View>
      )}
    </View>
  );
  
};

export default DeviceActionScreen;

function createStorageKeys(arg0: { value: string; type: number; }[]): { hashed_key: any; } {
  throw new Error('Function not implemented.');
}

function makePalletQuery(arg0: string, arg1: string, arg2: any[]) {
  throw new Error('Function not implemented.');
}


