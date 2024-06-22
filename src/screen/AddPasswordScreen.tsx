import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity,Text,View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PasswordForm from '../components/PasswordForm';
import Toast from 'react-native-toast-message';
import TitleHeader from '../components/TitleHeader';

type AddPasswordScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const AddPasswordScreen = ({navigation}: AddPasswordScreenProps) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Data added',
      visibilityTime: 4000,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: 1}}>
        <Toast position="top" />
      </View>
      <TitleHeader navigation={navigation} title="Add Password" navigateTo = "Home"/>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PasswordForm showToast={showToast} isEditable={false}/>
        </ScrollView>
      </View>
    </View>
  );
};

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

export default AddPasswordScreen;
