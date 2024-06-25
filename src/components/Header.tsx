import React,{useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
          <Image source={require("../resources/logo.png")} style={{width : 70,height : 70, borderRadius : 40}}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 18, color: '#000'}}>Hello, {userName.toLocaleUpperCase()}</Text>
          <Text style={{fontSize: 18,  color: '#000'}}>Good Morning</Text>
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
    borderBottomColor : "#000",
    borderBottomWidth : 1,
    paddingBottom : 20,
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
    paddingHorizontal: 30,
  },
});

export default Header;
