// Purpose: Chat component for the Chat screen
import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params; // get name and color from route.params
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
  }, []);

  useEffect(() => {
    setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        { // example of a system message
            _id: 2,
            text: `${name} has entered the chat`,
            createdAt: new Date(),
            system: true,
        },
    ]);
    }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}> 
   
    <GiftedChat 
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)} 
        user={{
            _id: 1,
        }} 
    />
    {Platform.OS === 'android' ? ( 
        <KeyboardAvoidingView behavior="height" /> // add KeyboardAvoidingView for android
    ) : null}
     </View>
  );
};

const renderBubble = (props) => {
    return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000' // change the background color of the right side chat bubble
                },
                left: {
                    backgroundColor: '#fff' // change the background color of the left side chat bubble
                }
            }}
        />
}

const styles = StyleSheet.create({
  // styles for the Chat component
  container: {
    flex: 1,
  },
});

export default Chat;
