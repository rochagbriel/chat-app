import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
        headerStyle: {
            backgroundColor: color,
        },
        headerTitleStyle: {
            color: color === '' ? '#000' : '#fff',
        },
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color } ]}>
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
