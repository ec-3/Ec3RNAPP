import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const PrepareConnectScreen = ({ navigation }) => {
  const handleConnectPress = () => {
    // 这里添加连接操作的代码
    navigation.navigate('DeviceAddScreen')
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('assets/icon_close.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Select connection method</Text>
        <Text style={styles.subtitle}>Before connecting, ensure the Cube is linked to the energy storage battery.</Text>
        <Image source={require('assets/beijingBlu.png')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={handleConnectPress}>
          <Image source={require('assets/icon_bluetooth.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Bluetooth</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 100, // 或者设置为一个较小的值，如 paddingTop: 10，
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  content: {
    top: 20,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginTop: 21,
    marginBottom: 22,
  },
  subtitle: {
    fontSize: 16,
    color: '#797979',
    textAlign: 'center',
    marginBottom: 43,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 213,
    height: 192,
    marginBottom: 33,
  },
  button: {
    backgroundColor: '#323232',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PrepareConnectScreen;
