import React,{useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { getName } from '../scripts/encryptedStorage';

const Header = () => {

  const [userName,setUserName] = useState("");

  useEffect(()=>{
    const getUserName = async()=>{
      const name = await getName();
      setUserName(name);
    }
    getUserName();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>

        <View style={styles.usrImage}>
            <FeatherIcon 
            name='user'
            size={60}
            color ="#000"
            />
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 18, color: '#000'}}>Hello, {userName.toLocaleUpperCase()}</Text>
          <Text style={{fontSize: 18}}>Good Morning</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 30,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  usrImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000',
    alignItems : 'center', 
  },
  textContainer: {
    paddingHorizontal: 20,
  },
});

export default Header;
