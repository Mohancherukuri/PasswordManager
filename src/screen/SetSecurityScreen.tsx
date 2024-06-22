// Import necessary components from React Native
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
// Define your component
const SetSecurityScreen = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(true);
  const biometrics = async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const {biometryType} = await rnBiometrics.isSensorAvailable();
    if (biometryType !== BiometryTypes.Biometrics) {
      setIsPasswordSet(false);
    }
  };
  return (
    <View style={styles.container}>
      
      {isPasswordSet ? (
        <>
        <Text style={styles.title}>Welcome</Text>
          <Text style={styles.description}>
            Please let us know that it is you
          </Text>
        </>
      ) : (
        <>
        <Text style={styles.title}>Secure Your Account</Text>
          <Text style={styles.description}>
            To access app features, please set a password or enable biometric lock.
          </Text>
        </>
      )}
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },

});

export default SetSecurityScreen;
