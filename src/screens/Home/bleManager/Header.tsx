import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Dimensions, Image} from 'react-native';



const {width, height, scale} = Dimensions.get('window');

interface HeaderProps {
  isConnected: boolean;
  scaning: boolean;
  disabled: boolean;
  onPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isConnected,
  scaning,
  disabled,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.buttonView, {opacity: disabled ? 1 : 1}]}
        disabled={disabled}
        onPress={onPress}>

        <Image 
         source={ require('./assets/bluetooth.png')}
         style={{height:40,width:40,marginHorizontal:20}} >


        </Image>

        <Text style={[styles.buttonText]}>
          {scaning ? 'Searching' : isConnected ? 'Unconnect' : 'Scan'}
        </Text>

      </TouchableOpacity>

      <Text style={{marginLeft: 10, marginTop: 10,color:'white'}}>
        {isConnected ? 'Current connect device' : 'Available devices'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  buttonView: {
    backgroundColor: '#454545',
    // paddingHorizontal: 10,
    marginHorizontal:((width-220)/2) ,
    borderRadius: 5,
    marginTop: 10,
    height: 58,
    width:220,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row'
    
    // width:500,
  },
  buttonText: {
    marginHorizontal:-10,
    color: 'white',
    fontSize: 30,
  },
});

export default Header;
