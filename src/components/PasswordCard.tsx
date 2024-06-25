import React, { useContext } from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PasswordDataTypeWithId} from '../@types/PasswordDataType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { PasswordContext } from '../context/PasswordContext';

type PasswordCardProps = {
  passwordData: PasswordDataTypeWithId;
  navigation: NativeStackNavigationProp<any, any>;
};

const PasswordCard = ({passwordData, navigation}: PasswordCardProps) => {
  const {deletePasswordData} = useContext(PasswordContext)
  const goToPasswordDataScreen = () => {
    navigation.navigate('PasswordScreen', {passwordData});
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Password',
      'Do you want to delete data related to this APP/Website',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePasswordData(String(passwordData.id))
            Alert.alert(
              'Data deleted Successfully',
            )
          },
          style: 'destructive',
        }
      ],
      {
        cancelable: true,
        onDismiss: () => {}
      }
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToPasswordDataScreen} onLongPress={handleLongPress}>
      <Image source={require('../resources/lock.png')} style={styles.image} />
      <View>
        <Text style={{fontSize: 20,color : "#000"}}>{passwordData.appName.toUpperCase()}</Text>
        <Text style={{fontSize: 16,color : "#000"}}>{passwordData.userName || passwordData.email}</Text>
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
