import React, { useState, useEffect } from 'react';
import { View, Text ,Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import Login from './pages/Login';
import HomeScreen from './pages/HomeScreen';
export default function App(props) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const Stack = createNativeStackNavigator();


  if (initializing) return null;

  if (!user) {
    return (
      // <View>
   

       <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Login" component={Login} />
       </Stack.Navigator>
     </NavigationContainer>
     
    );
  }

  return (
    // <HomeScreen user={user.email}/>

    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({

            headerRight: props => <Button title="signout" onPress={() => auth().signOut()}/>

        })}/>
    </Stack.Navigator>
</NavigationContainer>
  );
}



{/*

import React, {useState, useEffect} from 'react';
import {Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Chat';
import Login from './Login';

export default function App() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const Stack = createStackNavigator();


    if (initializing) return null;

    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Login}/>
                </Stack.Navigator>
            </NavigationContainer>
        );

    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Chat} options={({navigation, route}) => ({

                    headerRight: props => <Button title="signout" onPress={() => auth().signOut()}/>

                })}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

}






*/}