import React,{useEffect} from 'react'
import { Text,View,StyleSheet, ScrollView } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { PasswordDataTypeWithId } from '../@types/PasswordDataType'
import TitleHeader from '../components/TitleHeader'
import Toast from 'react-native-toast-message'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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

  if(!data){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Something went wrong!!!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TitleHeader navigation={navigation} title="Add Password" navigateTo = "Home"/>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PasswordForm isEditable={true} data={data.passwordData}/>
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