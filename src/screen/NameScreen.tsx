// NameScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { addName } from '../scripts/encryptedStorage';

const NameScreen = ({setUserName} : {setUserName : any}) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    addName(name);
    setUserName(name)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What should we call you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color : "#000"
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color : "#000"
  },
  submitButton: {
    width: 100,
  },
});

export default NameScreen;
