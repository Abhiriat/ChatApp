import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Setting = ({ handleLogout }) => { // Receive handleLogout as a prop
  return (
    <View style={styles.container}> 
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the button vertically
    alignItems: 'center',     // Center the button horizontally
  },
  logoutButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
});
