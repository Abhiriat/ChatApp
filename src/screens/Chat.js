import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble, Send, Composer } from 'react-native-gifted-chat';
import React, { useEffect, useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('USERID');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.error('USERID not found in AsyncStorage');
          // Handle the case where USERID is not found (e.g., navigate to login)
        }
      } catch (error) {
        console.error('Error fetching USERID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId || !route.params?.userId) return;

    const chatId = [userId, route.params.userId].sort().join('');

    const subscriber = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allmessages = querySnapshot.docs.map((item) => {
          const data = item.data();
          return {
            ...data,
            createdAt: data.createdAt && data.createdAt.toDate instanceof Function
              ? data.createdAt.toDate()
              : null,
          };
        });
        setMessages(allmessages);
      });

    return () => subscriber();
  }, [route.params, userId]);

  const onSend = useCallback(
    (messages = []) => {
      if (!userId || !route.params?.userId) return;

      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: userId,
        sendTo: route.params.userId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, myMsg)
      );

      const chatId = [userId, route.params.userId].sort().join('');

      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(myMsg);
    },
    [route.params, userId]
  );

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
        renderBubble={(props) => <Bubble {...props} />}
        renderSend={(props) => <Send {...props} />}
        renderComposer={(props) => <Composer {...props} />}
        placeholder="Type your message here..."
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
