import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PasswordDataTypeWithId} from '../@types/PasswordDataType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PasswordCardProps = {
  passwordData: PasswordDataTypeWithId;
  navigation: NativeStackNavigationProp<any, any>;
};

const PasswordCard = ({passwordData, navigation}: PasswordCardProps) => {
  const goToPasswordDataScreen = () => {
    navigation.navigate('PasswordScreen', {passwordData});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToPasswordDataScreen}>
      <Image source={require('../resources/lock.png')} style={styles.image} />
      <View>
        <Text style={{fontSize: 22,color : "#000"}}>{passwordData.appName.toUpperCase()}</Text>
        <Text style={{fontSize: 18,color : "#000"}}>{passwordData.userName || passwordData.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 30,
  },
});

export default PasswordCard;
