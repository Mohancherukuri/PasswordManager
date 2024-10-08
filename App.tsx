import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, AppState} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screen/HomeScreen';
import AddPasswordScreen from './src/screen/AddPasswordScreen';
import {PasswordContext, PasswordProvider} from './src/context/PasswordContext';
import PasswordDisplayScreen from './src/screen/PasswordDisplayScreen';
import ReactNativeBiometrics from 'react-native-biometrics';
import SetSecurityScreen from './src/screen/SetSecurityScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import NameScreen from './src/screen/NameScreen';
import {getName} from './src/scripts/encryptedStorage';
import Config from 'react-native-config';
function App(): React.JSX.Element {
  
  const Stack = createNativeStackNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [handleClose, setHandleClose] = useState('active');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bioFound,setBioFound] = useState(false);
  console.log(Config.SECRET_KEY);
  useEffect(() => {
    const handleAppStateChange = (newState: any) => {
      if (newState === 'active') {
        setHandleClose('active');
      } else {
        setIsAuthenticated(false);
        setHandleClose('close');
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, [isAuthenticated]);

  //Ask user to Authenticate
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

    const userExists = async () => {
      const userName = await getName();
      setIsLoading(false);
      if (userName !== '') {
        setUserName(userName);
        authenticate();
      }
    };
    userExists();
  }, [handleClose, userName]);

  const Navigator = () => {
    const {getPasswords} = useContext(PasswordContext);
    //Retireve data only if the user authenticates.
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
              name="Warning"
              component={SetSecurityScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    );
  };

  if (isLoading || bioFound) {
    return <></>;
  }

  return (
    <>
      {userName === '' ? (
        <>
          <NameScreen setUserName={setUserName} />
        </>
      ) : (
        <NavigationContainer>
          <PasswordProvider>
            <ToastProvider
              placement="top"
              duration={5000}
              animationType="slide-in"
              animationDuration={250}
              successColor="green"
              dangerColor="red"
              warningColor="orange"
              normalColor="gray"
              textStyle={{fontSize: 20}}
              offset={50}>
              <Navigator />
            </ToastProvider>
          </PasswordProvider>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
