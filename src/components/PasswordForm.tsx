import React, { useContext, useState } from 'react';
import { StyleSheet, View, Button,Text } from 'react-native';
import InputBar from './InputBar';
import AppList from './AppList';
import { PasswordContext } from '../context/PasswordContext';
import { PasswordDataTypeWithId } from '../@types/PasswordDataType';

type PasswordFormProps =  {
  showToast: () => void;
  isEditable: false;
}

interface EditableFormProps {
  showToast: () => void;
  isEditable: true;
  data: PasswordDataTypeWithId;
}

type Props = PasswordFormProps | EditableFormProps

const PasswordForm: React.FC<EditableFormProps | PasswordFormProps> = (props : Props ) => {


  const {showToast,isEditable} = props;

  if(isEditable){
    console.log("Lastly",props.data.appName)
  }

  const { addPasswordData } = useContext(PasswordContext);
  const [userName, setUserName] = useState(isEditable ? props.data.userName :'');
  const [email, setEmail] = useState(isEditable ? props.data.email : '');
  const [password, setPassword] = useState(isEditable ? props.data.password : '');
  const [selectedApp, setSelectedApp] = useState(isEditable ? props.data.appName : '');
  const [showNewApp, setNewApp] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true); // State for password visibility

  const handleSubmit = () => {
    const updatedData = { userName, email, password, appName: selectedApp };
    addPasswordData(updatedData);
    setUserName('');
    setEmail('');
    setPassword('');
    setSelectedApp('');
    showToast();
  };


  return (
    <>
      {
        isEditable ?
        <>
          <View style={styles.appNameContainer}>
            <Text style={styles.appNameText}>{props.data.appName}</Text>
          </View>
        </>
        :
        <AppList setSelectedApp={setSelectedApp} setNewApp={setNewApp} />
      }
      <View style={styles.container}>
        {showNewApp && (
          <InputBar
            icon="plus-circle"
            label="New App/Website"
            value={selectedApp}
            onChangeText={(text) => setSelectedApp(text)}
            placeholder="Enter App/Website Name ...."
          />
        )}

        <InputBar
          icon="user"
          label="User Name : "
          placeholder="User Name ..."
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <InputBar
          icon="mail"
          label="Email : "
          placeholder="abc@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputBar
          icon="lock"
          label="Password : "
          placeholder="******"
          secureTextEntry={isSecurePassword} // Pass the secureTextEntry prop
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {
          isEditable ? 
          <>
            <Button title="Delete Data" onPress={handleSubmit} />
            <Button title="Update Data" onPress={handleSubmit} />
          </>
          :
          <Button title="Add Data" onPress={handleSubmit} />
        }

        
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
  appNameContainer : {
    borderWidth : 1,
    borderColor : "#000",
    marginHorizontal : 30,
    alignItems : "center",
    paddingVertical : 20,
    borderRadius : 20
  },
  appNameText : {
    color : "#000",
    fontSize : 24,
    fontWeight : "bold"
  }
});

export default PasswordForm;
