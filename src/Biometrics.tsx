
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

export const biometrics = async() => {

    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
    const { biometryType } = await rnBiometrics.isSensorAvailable()
    let isAuth = false
    if (biometryType === BiometryTypes.Biometrics) {
        rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to access your account' })
        .then((result) => {
            const { success } = result;
            if (success) {
              // Authentication successful
              console.log("Success")
              isAuth = true;
              // Proceed with whatever action you want to permit after authentication
            } else {
              // Authentication failed
              console.log('Authentication failed here');
            }
          })
          .catch((error) => {
            // Handle errors
            console.log('Error:', error);
          });
    }
    return isAuth;
}