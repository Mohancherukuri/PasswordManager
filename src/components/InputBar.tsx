import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Text} from 'react-native-animatable';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TextInputProps} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

type InputBarProps = {
  icon: string;
  label?: string;
  secureTextEntry?: boolean; // Added prop for secure text entry
  isEditForm?: boolean;
} & TextInputProps;

const InputBar = ({
  icon,
  label,
  secureTextEntry = false,
  isEditForm = false,
  ...props
}: InputBarProps) => {
  const [text, setText] = useState('');
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);

  const toggleSecureTextEntry = () => {
   if(!isSecureText){
    setIsSecureText(!isSecureText);
    return;
  }
    if(isEditForm){
      const authenticate = async () => {
        try {
          const rnBiometrics = new ReactNativeBiometrics({
            allowDeviceCredentials: true,
          });
          const {success, error} = await rnBiometrics.simplePrompt({
            promptMessage: 'Authenticate to check your password',
          });
          if (success) {
            setIsSecureText(!isSecureText);
          }
        } catch (error) {
          Alert.alert('Error', 'Biometric authentication failed from device');
        }
      };
  
      authenticate();
      return;
    }
    setIsSecureText(!isSecureText);
  };

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.container}>
        <FeatherIcon name={icon} size={20} style={styles.icon} color="#000" />
        <TextInput
          placeholderTextColor={'#808080'}
          style={styles.input}
          secureTextEntry={isSecureText}
          onChangeText={text => setText(text)}
          value={text}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <FeatherIcon
              name={isSecureText ? 'eye-off' : 'eye'}
              size={20}
              style={styles.icon}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    borderRadius: 30,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
    marginLeft: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 4,
    color: '#000',
  },
  label: {
    marginLeft: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
});

export default InputBar;
