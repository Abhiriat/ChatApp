import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Setting from '../tabs/Setting';
import Users from '../tabs/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Main() {
  const [selectedtab, setselecttab] = useState(0);
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('USERID');
              await AsyncStorage.removeItem('NAME');
              await AsyncStorage.removeItem('EMAIL');
              // Navigate to Login screen after logout
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {selectedtab === 0 ? <Users /> : <Setting handleLogout={handleLogout} />}
      <View style={styles.bottomtab}>
        <TouchableOpacity style={styles.tab} onPress={() => setselecttab(0)}>
          <Image
            source={require('../images/users.png')}
            style={[styles.tabicon, { tintColor: selectedtab === 0 ? 'white' : '#A0PF9F' }]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setselecttab(1)}>
          <Image
            source={require('../images/setting.png')}
            style={[styles.tabicon, { tintColor: selectedtab === 1 ? 'white' : '#A0PF9F' }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomtab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabicon: {
    width: 30,
    height: 30,
  },
});

