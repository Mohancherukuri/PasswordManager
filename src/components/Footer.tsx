import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type FooterPropType = {
  onPress? : ()=>void
}

const Footer = ({onPress} : FooterPropType) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <MaterialIcons name='add' size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    height: 50, 
    position: 'relative',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10, 
    backgroundColor: '#4CAF50',
    borderRadius: 50, 
    padding: 20,
    zIndex: 1, 
  },
});

export default Footer;
