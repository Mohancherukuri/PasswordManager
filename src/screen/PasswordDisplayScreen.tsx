import React,{useEffect} from 'react'
import { Text,View,StyleSheet, ScrollView } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { PasswordDataTypeWithId } from '../@types/PasswordDataType'
import TitleHeader from '../components/TitleHeader'
import Toast from 'react-native-toast-message'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { biometrics } from '../Biometrics'

import PasswordForm from '../components/PasswordForm'
type PasswordDisplayScreenProp = {
  route : RouteProp<any,any>
  navigation : NativeStackNavigationProp<any,any>
}

type PasswordData = {
  passwordData : PasswordDataTypeWithId
}

const PasswordDisplayScreen = ({route,navigation} : PasswordDisplayScreenProp) => {
  const data = route.params as PasswordData | undefined;
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Data added',
      visibilityTime: 4000,
    });
  };

  if(!data){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Something went wrong!!!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{zIndex: 1}}>
        <Toast position="top" />
      </View>
      <TitleHeader navigation={navigation} title="Add Password" navigateTo = "Home"/>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PasswordForm showToast={showToast} isEditable={true} data={data.passwordData}/>
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: 25,
    paddingTop: 50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
});


export default PasswordDisplayScreen