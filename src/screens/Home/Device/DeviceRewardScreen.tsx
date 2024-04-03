import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from 'routes/index';

const DeviceRewardScreen = () => {
    const navigation = useNavigation<RootNavigationProps>();
  // 假设这是从 mmkvStore 中获取的设备数量
  const deviceCount = 3;

  // 模拟设备列表数据
  const deviceListData = [
    { id: '1', reward: '100 ECT', deadline: '2024-03-25' },
    { id: '2', reward: '150 ECT', deadline: '2024-03-26' },
    { id: '3', reward: '200 ECT', deadline: '2024-03-27' },
    // 更多设备数据...
  ];


  // 渲染设备列表项
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#797979' }}>#{item.id}</Text>
      <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#797979' }}>{item.reward}</Text>
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


  return (
    <View style={{ flex: 1, backgroundColor: '#000', paddingVertical: 40 }}>
      {/* 标题 */}
      <Text style={{ textAlign: 'center', fontSize: 36, color: '#fff', marginTop: 20, marginBottom: 57 }}>Cube Overview</Text>

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
        <TouchableOpacity style={{ backgroundColor: '#323232', borderRadius: 15, alignItems: 'center', paddingVertical: 15, marginBottom: 20, width: 220 }}>
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

