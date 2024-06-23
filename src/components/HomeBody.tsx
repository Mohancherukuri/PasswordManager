import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PasswordContext} from '../context/PasswordContext';
import PasswordCard from './PasswordCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InputBar from './InputBar';
import { PasswordDataType, PasswordDataTypeWithId } from '../@types/PasswordDataType';
import { searchAppPassword } from '../scripts/search';

const HomeBody = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any, any>;
}) => {
  const {passwordList} = useContext(PasswordContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [list,setList] = useState<PasswordDataTypeWithId[]>(passwordList);
  //Handle the Search Bar.

  useEffect(()=>{
    setList(passwordList);
  },[passwordList])

  const handleSearch = (text: string) => {
    if (text === '') {
      setList(passwordList);
    } else {
      setList(searchAppPassword(text,list));
    }
    setSearchTerm(text);
  };

  return (
    <>
      <InputBar
        icon="search"
        placeholder="Search..."
        onChangeText={text => handleSearch(text)}
        value={searchTerm}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.heading}>Your Passwords</Text>
          {list.map(passwordData => (
            <PasswordCard
              passwordData={passwordData}
              navigation={navigation}
              key={String(passwordData.id)}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 40, // Add padding bottom to ensure space for scrolling
  },
  heading: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeBody;
