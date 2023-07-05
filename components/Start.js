// Purpose: to render the start screen of the chat app
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
// Firebase
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth(); // get auth from firebase

  const signInUser = () => { // sign in user anonymously
    signInAnonymously(auth)
        .then(result => {
            navigation.navigate('Chat', { userID: result.user.uid , name: name ,  color: color });
            Alert.alert('Signed in Successfully!');
        })
        .catch(error => {
            Alert.alert('Unable to sign in. Please try later.');
        });
};
  // navigation prop is passed in from App.js
  const [name, setName] = useState(''); // set name state
  const [color, setColor] = useState(''); // set color state

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode='cover'
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.chatConfig}>
          <TextInput
            accessible={true} // accessible for screen readers
            accessibilityLabel='Enter your name' // label for screen readers
            accessibilityHint='Lets you type in your name' // hint for screen readers
            style={styles.textInput}
            onChangeText={setName}
            value={name}
            placeholder='Your name'
          />
          <View style={styles.containerColor}>
            <Text style={styles.backgroundText}>Choose Background Color:</Text>
            <View style={styles.colorButtonDisplay}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Black background'
                accessibilityHint='Lets you choose a black background color for the chat screen'
                accessibilityRole='button'
                onPress={() => setColor('#090C08')}
                style={[
                  color === '#090C08'
                    ? styles.colorButtonSelected
                    : color === '#090C08'
                    ? styles.colorButtonSelected
                    : styles.colorButton,
                  { backgroundColor: '#090C08' },
                ]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Purple background'
                accessibilityHint='Lets you choose a purple background color for the chat screen'
                accessibilityRole='button' // role for screen readers
                onPress={() => setColor('#474056')}
                style={[
                  color === '#474056' 
                    ? styles.colorButtonSelected
                    : styles.colorButton,
                  { backgroundColor: '#474056' },
                ]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Grey background'
                accessibilityHint='Lets you choose a grey background color for the chat screen'
                accessibilityRole='button'
                onPress={() => setColor('#8A95A5')}
                style={[
                  color === '#8A95A5'
                    ? styles.colorButtonSelected
                    : styles.colorButton,
                  { backgroundColor: '#8A95A5' },
                ]}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Green background'
                accessibilityHint='Lets you choose a green background color for the chat screen'
                accessibilityRole='button'
                onPress={() => setColor('#B9C6AE')}
                style={[
                  color === '#B9C6AE'
                    ? styles.colorButtonSelected
                    : styles.colorButton,
                  { backgroundColor: '#B9C6AE' },
                ]}
              />
            </View>
          </View>
          <View style={styles.containerStart}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel='Start Chatting'
              accessibilityHint='Lets you start chatting with your friends'
              accessibilityRole='button'
              style={styles.startButton}
              title='Start Chatting'
              onPress={signInUser}
            >
              <Text style={styles.startText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior='padding' /> // add KeyboardAvoidingView for ios
        ) : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // styles for the Start component
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerColor: {
    flex: 1,
    width: '88%',
    height: '20%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  containerStart: {
    width: '88%',
    alignItems: 'center',
    marginTop: 15,
  },
  chatConfig: {
    width: '88%',
    height: '44%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    width: '88%',
    height: '20%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#757083',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },
  background: {
    flex: 1,
  },
  backgroundText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },
  title: {
    marginTop: '15%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    height: '44%',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 40,
  },
  colorButtonSelected: {
    width: 50,
    height: 50,
    marginTop: 40,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#757083',
  },
  colorButtonDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '88%',
    height: '20%',
  },
  startButton: {
    width: '100%',
    height: 60,
    marginBottom: 20,
    backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start; // export the Start component
