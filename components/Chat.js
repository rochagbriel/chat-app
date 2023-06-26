import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello Screen 2!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
