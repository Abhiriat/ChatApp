import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then((res) => {
        if (res.docs.length) {
          setUsers(res.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Ensure 'id' is included
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Only Friendly Chat</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => {
              navigation.navigate('Chat', { userId: item.id, name: item.name });
            }}
          >
            <Image source={require('../images/user.png')} style={styles.userIcon} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Users;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
  },
  name: {
    color: 'black',
    fontSize: 15,
    paddingLeft: 10,
  },
});
