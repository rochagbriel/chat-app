// Purpose: Chat component for the Chat screen
import { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
// Firebase
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Custom Actions
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { name, color, userID } = route.params; // get name and color from route.params
  const [messages, setMessages] = useState([]); // set messages state

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: color, // set the background color of the header
      },
      headerTitleStyle: {
        color: color === '' ? '#000' : '#fff', // if color is empty, use black, else use white
      },
    });

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()), // convert createdAt to Date object })
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up function
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    // renderInputToolbar function
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderBubble = (props) => {
    // renderBubble function
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000', // change the background color of the right side chat bubble
          },
          left: {
            backgroundColor: '#fff', // change the background color of the left side chat bubble
          },
        }}
      />
    );
  };

  const renderCustomActions = (props) => {
    // renderCustomActions function
    return <CustomActions onSend={onSend} userID={userID} storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name }}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' /> // add KeyboardAvoidingView for android
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  // styles for the Chat component
  container: {
    flex: 1,
    marginBottom: 25,
  },
});

export default Chat;
