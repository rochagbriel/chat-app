// Purpose: Chat component for the Chat screen
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

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

  return <View style={[styles.container, { backgroundColor: color }]}></View>;
};

const styles = StyleSheet.create({
  // styles for the Chat component
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
