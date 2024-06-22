import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {biometrics} from './src/Biometrics';
import HomeScreen from './src/screen/HomeScreen';
import AddPasswordScreen from './src/screen/AddPasswordScreen';
import { PasswordContext, PasswordProvider } from './src/context/PasswordContext';
import PasswordDisplayScreen from './src/screen/PasswordDisplayScreen';
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  // useEffect(()=>{
  //   console.log("Here")
  //   biometrics();
  // },[])

  const Navigator = () => {
    const {getPasswords} = useContext(PasswordContext);
    useEffect(()=>{
      console.log("___",process.env)
      getPasswords();
    },[])


    return(
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
          <Stack.Screen name='AddPassword' component={AddPasswordScreen} options={{headerShown:false}}/>
          <Stack.Screen name='PasswordScreen' component={PasswordDisplayScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )

  }

  return (
    <NavigationContainer>
      <PasswordProvider>
        <Navigator/>
      </PasswordProvider>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({});

export default App;
