// Purpose: Chat component for the Chat screen
import { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// Firebase
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ db, route, navigation }) => {
  const { name, color, userID } = route.params; // get name and color from route.params
  const [messages, setMessages] = useState([]); // set messages state

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
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()), // convert createdAt to Date object })
        });
      });
      setMessages(newMessages);
    });

    // Clean up function
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{_id: userID, name }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' /> // add KeyboardAvoidingView for android
      ) : null}
    </View>
  );
};

const renderBubble = (props) => {
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

const styles = StyleSheet.create({
  // styles for the Chat component
  container: {
    flex: 1,
  },
});

export default Chat;
