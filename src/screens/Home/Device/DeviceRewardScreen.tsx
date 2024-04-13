import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { mmkvStore } from 'utils/storage';
import { DEVICE_COUNT, calculateRound, calculateTimestampByRound, formatTimestampToDateTimeString, generateDeviceDataConsumptionPrefix, generateDeviceRewardValuePrefix } from 'constants/index';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { downloadData, showReward, getReward, mining, downloadDataWith } from 'messaging/index';
import { useFocusEffect } from '@react-navigation/native';

function alert(text: string) {
    Alert.alert('', text, [{text: 'Confirm', onPress: () => {}}]);
  }
  
const DeviceRewardScreen = () => {
    const navigation = useNavigation<RootNavigationProps>();
    const [loading, setLoading] = useState(false);

  // 假设这是从 mmkvStore 中获取的设备数量
  var deviceCount = mmkvStore.getNumber(DEVICE_COUNT) ?? 0;

  // 模拟设备列表数据
//   const deviceListData = [
//     { id: '1', reward: '100 ECT', deadline: '2024-03-25' },
//     { id: '2', reward: '150 ECT', deadline: '2024-03-26' },
//     { id: '3', reward: '200 ECT', deadline: '2024-03-27' },
//     // 更多设备数据...
//   ];
  const initializeDeviceListData = () => {
    deviceCount = mmkvStore.getNumber(DEVICE_COUNT) ?? 1;
    const newData = [];
    // 使用当前时间戳计算轮次值
    const timestamp = Date.now(); // 当前时间戳
    const round = calculateRound(timestamp);    //要领奖励的话应该是上一轮 round-1
    console.log("当前时间戳对应的轮次值是：", round);

    const lastMiningRoundNext0Time = calculateTimestampByRound(round - 1);
    console.log("***最后一次mining的轮次后面一天的零点时间戳[也就是下次mining的数据起点]是:", lastMiningRoundNext0Time);
    const formattedDateTimeString = formatTimestampToDateTimeString(lastMiningRoundNext0Time);
    console.log("***以上对应通用显示形式:", formattedDateTimeString);
    // const startTimeData = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(lastMiningRoundNext0Time)) ?? 0;
    // const startTimeData = await getCertainTimeConsumption(lastMiningRoundNext0Time);
    // let certainTimeConsumption = mmkvStore.getNumber(generateDeviceDataConsumptionPrefix(lastMiningRoundNext0Time)) ?? -1;
    const rewardValue = mmkvStore.getString(generateDeviceRewardValuePrefix(round-1)) ?? 0;     

    for (let i = 1; i <= deviceCount; i++) {
      newData.push({
        id: i.toString(),
        reward: rewardValue, // 初始奖励值为 0
        deadline: formattedDateTimeString,    // 初始截止日期为空字符串，您可以根据需求设置默认值
      });
    }
    return newData;
  };
  
  const [deviceListData, setDeviceListData] = useState(initializeDeviceListData());

  // 调用函数并更新 deviceListData
//   var deviceListData = initializeDeviceListData();
  
  useFocusEffect(
    React.useCallback(() => {
        setDeviceListData(initializeDeviceListData());

      return () => {
        
      };
    }, [])
  );


  // 渲染设备列表项
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#797979' }}>#{item.id}</Text>
      <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#797979' }}>{item.reward} ECT</Text>
      <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#797979' }}>{item.deadline}</Text>
    </View>
  );

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>{item.deviceNumber}</Text>
//       <Text style={styles.itemText}>{item.rewards}</Text>
//       <Text style={styles.itemText}>{item.calcDeadline}</Text>
//       <View style={styles.separator} />
//     </View>
//   );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

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
        //   setReward(reward);
          setDeviceListData(initializeDeviceListData());
          setLoading(false); // 隐藏等待框
          console.log("**************** end getdata:", Date.now());
        });
      });
      
    };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#000', paddingVertical: 40 }}>
      {/* 标题 */}
      <Text style={{ textAlign: 'center', fontSize: 26, color: '#fff', marginTop: 30, marginBottom: 57 }}>Cube Overview</Text>

      {/* 设备信息 */}
      <View style={{ alignItems: 'center' }}>
        <View style={{ backgroundColor: '#323232', height: 90, borderRadius: 15, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('assets/icon_ec3_cube.png')} style={{ width: 90, height: 90, marginRight: 10 }} />
          <View>
            <Text style={{ fontSize: 24, color: '#fff' }}>{deviceCount}</Text>
            <Text style={{ fontSize: 14, color: '#797979' }}>Ec³ Cube</Text>
          </View>
        </View>
      </View>


      {/* 设备列表标题 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 26 }}>
        <Text style={{ fontSize: 16, flex: 1, color: '#797979', textAlign: 'center' }}>Ec³ cube No.</Text>
        <Text style={{ fontSize: 16, flex: 1, color: '#797979', textAlign: 'center' }}>Rewards</Text>
        <Text style={{ fontSize: 16, flex: 1, color: '#797979', textAlign: 'center' }}>Calc. Deadline</Text>
      </View>

      <View style={styles.separator} />

      {/* 设备列表 */}
      {/* <FlatList
        data={deviceListData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ marginTop: 10 }}
      /> */}

        <FlatList
        data={deviceListData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderSeparator} // 在列表底部添加分隔线
        />

      {/* 按钮 */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={handleButtonClick}  style={{ backgroundColor: '#323232', borderRadius: 15, alignItems: 'center', paddingVertical: 15, marginBottom: 20, width: 220 }}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Get all rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrepareConnectScreen')}   style={{ borderColor: '#00FF00', borderWidth: 1, borderRadius: 15, alignItems: 'center', paddingVertical: 15, width: 220 }}>
          <Text style={{ fontSize: 16, color: '#00FF00' }}>Connect new cube</Text>
        </TouchableOpacity>

        {/* navigation.navigate('CreateAccount', { keyTypes: keyTypes }); */}

        {/* <TouchableOpacity
        //   onPress={() => navigation.navigate('CrowdloansScreen')} // 导航到 CrowdloansScreen
          onPress={() => navigation.navigate('DeviceAddScreen')} // 导航到 CrowdloansScreen
          style={{ borderColor: '#00FF00', borderWidth: 1, borderRadius: 15, paddingHorizontal: 40, paddingVertical: 15, width: 275 }}
        >
          <Text style={{ color: '#00FF00' }}>Connect new cube</Text>
        </TouchableOpacity> */}

      </View>


          {/* Loading Indicator */}
          {loading && (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}


    </View>
  );


};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    itemText: {
        fontSize: 16,
        flex: 1,
        color: '#797979',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#232323',
    },
});

export default DeviceRewardScreen;

