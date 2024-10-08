import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import InputBar from './InputBar';
import AppList from './AppList';
import {PasswordContext} from '../context/PasswordContext';
import {PasswordDataTypeWithId} from '../@types/PasswordDataType';
import Button from './Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { validateForm } from '../scripts/validateForm';

type PasswordFormProps = {
  isEditable: false;
};

interface EditableFormProps {
  isEditable: true;
  data: PasswordDataTypeWithId;
}

type Props = PasswordFormProps | EditableFormProps;

const PasswordForm: React.FC<EditableFormProps | PasswordFormProps> = (
  props: Props,
) => {
  const navigation = useNavigation() as NativeStackNavigationProp<any>;
  
  const {deletePasswordData, updatePasswordData} = useContext(PasswordContext);
  const {isEditable} = props;

  const {addPasswordData} = useContext(PasswordContext);
  const [userName, setUserName] = useState(isEditable ? props.data.userName : '',);
  const [email, setEmail] = useState(isEditable ? props.data.email : '');
  const [password, setPassword] = useState(isEditable ? props.data.password : '',);
  const toast = useToast();
  const [selectedApp, setSelectedApp] = useState(isEditable ? props.data.appName : '',);
  const [showNewApp, setNewApp] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true); // State for password visibility

  const handleSubmit = () => {
    const updatedData = {userName, email, password, appName: selectedApp};
    const isValidData = validateForm(updatedData) as string | null;
    if(isValidData === null){
      addPasswordData(updatedData);
      setUserName('');
      setEmail('');
      setPassword('');
      setSelectedApp('');
      toast.show("Data added Successfully.",{
        type : "success",

      })
    }
    else{
      toast.show(isValidData,{
        type:"warning"
      })
    }
    
  };

  const handleDelete = (id: string) => {
    deletePasswordData(id);
    toast.show("Data Deleted Successfully",{
      type : "success"
    })
    if (props.isEditable) {
      navigation.popToTop();
    }
  };

  const handleUpdate = (id: string) => {
    const updatedData = {id, userName, email, password, appName: selectedApp};
    const isValidData = validateForm(updatedData) as string | null;
    if(isValidData === null){
      updatePasswordData(id, updatedData);
      toast.show('Data has been Updated Successfully',{
          type : 'success'
      })
      if (props.isEditable) {
        navigation.popToTop();
      }
    }
    else{
      toast.show(isValidData,{
        type: "warning"
      })
    }
  };

  return (
    <>
      {isEditable ? (
        <>
          <View style={styles.appNameContainer}>
            <Text style={styles.appNameText}>{props.data.appName}</Text>
          </View>
        </>
      ) : (
        <AppList setSelectedApp={setSelectedApp} setNewApp={setNewApp} />
      )}
      <View style={styles.container}>
        {showNewApp && (
          <InputBar
            icon="plus-circle"
            label="New App/Website"
            value={selectedApp}
            onChangeText={text => setSelectedApp(text)}
            placeholder="Enter App/Website Name ...."
          />
        )}

        <InputBar
          icon="user"
          label="User Name : "
          placeholder="User Name ..."
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <InputBar
          icon="mail"
          label="Email : "
          placeholder="abc@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <InputBar
          icon="lock"
          label="Password : "
          placeholder="******"
          secureTextEntry={isSecurePassword} // Pass the secureTextEntry prop
          value={password}
          onChangeText={text => setPassword(text)}
          isEditForm={isEditable}
        />

        {isEditable ? (
          <>
            <Button
              title="Delete Data"
              onPress={() => handleDelete(String(props.data.id))}
            />
            <Button
              title="Update Data"
              onPress={() => handleUpdate(String(props.data.id))}
            />
          </>
        ) : (
          <Button title="Add Data" onPress={handleSubmit} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  appNameContainer: {
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
  },
  appNameText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default PasswordForm;
