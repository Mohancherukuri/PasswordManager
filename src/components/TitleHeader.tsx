import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TitleHeader = {
  navigation: NativeStackNavigationProp<any, any>;
  title: string;
  navigateTo?: string;
};

const TitleHeader = ({navigation, title, navigateTo="Home"}: TitleHeader) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigateTo);
        }}
        testID='header-title'
      >
        <AntDesign name="leftcircleo" size={40} color={'#000'} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 60,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#000',
  },
});

export default TitleHeader;
