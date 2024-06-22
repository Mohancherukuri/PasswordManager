import React, {useContext} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PasswordContext} from '../context/PasswordContext';
import PasswordCard from './PasswordCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const HomeBody = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any, any>;
}) => {
  const {passwordList} = useContext(PasswordContext);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Passwords</Text>
        {passwordList.map(passwordData => (
          <PasswordCard
            passwordData={passwordData}
            navigation={navigation}
            key={String(passwordData.id)}
          />
        ))}
      </View>
    </ScrollView>
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
