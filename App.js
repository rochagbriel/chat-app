import Start from './components/Start'; // import Screen Start Component
import Chat from './components/Chat'; // import Screen Chat Component
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo'; // import useNetInfo hook
import { Alert, LogBox } from 'react-native';
import { useEffect } from 'react';

// React Native Navigation
const Stack = createNativeStackNavigator();

// Firebase
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

const App = () => {
  // App Component
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: 'AIzaSyDfVwMd-aej_BobQ6rrT83MnsZJtnNF0Fo',
    authDomain: 'chat-app-26f4a.firebaseapp.com',
    projectId: 'chat-app-26f4a',
    storageBucket: 'chat-app-26f4a.appspot.com',
    messagingSenderId: '899139208835',
    appId: '1:899139208835:web:7b2fbde50d8720d189fdb6',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get a reference to the database service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
