import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {biometrics} from './src/Biometrics';
import HomeScreen from './src/screen/HomeScreen';
import AddPasswordScreen from './src/screen/AddPasswordScreen';
import {PasswordContext, PasswordProvider} from './src/context/PasswordContext';
import PasswordDisplayScreen from './src/screen/PasswordDisplayScreen';
import ReactNativeBiometrics from 'react-native-biometrics';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  useEffect(() => {
    const authenticate = async () => {
      try {
        const rnBiometrics = new ReactNativeBiometrics({
          allowDeviceCredentials: true,
        });
        const {success, error} = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to continue',
        });
        if (success) {
          setIsAuthenticated(true);
          return true;
        }
      } catch (error) {
        Alert.alert('Error', 'Biometric authentication failed from device');
        return false;
      }
    };

    authenticate();
  }, []);

  const Navigator = () => {
    const {getPasswords} = useContext(PasswordContext);
    useEffect(() => {
      if (isAuthenticated) {
        getPasswords();
      }
    }, [isAuthenticated]);

    return (
      <Stack.Navigator initialRouteName="Home">
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPassword"
              component={AddPasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PasswordScreen"
              component={PasswordDisplayScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <PasswordProvider>
        <Navigator />
      </PasswordProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
