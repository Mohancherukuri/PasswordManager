import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import InputBar from '../components/InputBar';
import HomeBody from '../components/HomeBody';
import Footer from '../components/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProp = {
  navigation : NativeStackNavigationProp<any,any>;
}

const HomeScreen = ({navigation} : HomeScreenProp) => {

  const handleNavigate = () => {
    navigation.navigate("AddPassword")
  }
  
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <HomeBody navigation={navigation}/>
      </View>
      <Footer onPress={handleNavigate}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 30,
  },
});

export default HomeScreen;
