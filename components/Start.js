import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text>Hello Screen 1!</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}
        placeholder='Enter your name'
      />
      <Button
        title='Go to Screen 2'
        onPress={() => navigation.navigate('Screen2', { name: name })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Start;
