
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

export const biometrics = async() => {

    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
    const { biometryType } = await rnBiometrics.isSensorAvailable()
    
    if (biometryType === BiometryTypes.Biometrics) {
        rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to access your account' })
        .then((result) => {
            const { success } = result;
            if (success) {
              // Authentication successful
              console.log('Authentication successful');
              // Proceed with whatever action you want to permit after authentication
            } else {
              // Authentication failed
              console.log('Authentication failed');
            }
          })
          .catch((error) => {
            // Handle errors
            console.log('Error:', error);
          });
    }
}