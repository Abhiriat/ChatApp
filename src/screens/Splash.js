import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './Main';
import Login from './Login';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      await checklogin(); // Wait for checklogin to complete
    }, 2000);
  }, );

  const checklogin = async () => {
    const id = await AsyncStorage.getItem('USERID'); // Await the result
    if (id !== null) {
      navigation.navigate(Main);
    } else {
      navigation.navigate(Login); // Navigate to Login only if not logged in
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Firebase Chat</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
