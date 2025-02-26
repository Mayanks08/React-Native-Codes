import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import  contactList from './components/ContactList.jsx';

import Contactes from './components/CreateContact.jsx';


const Stack = createStackNavigator();
export default function App() {

   const handlePress=(navigation) =>{
      navigation.navigate("Create Contact")
   }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({navigation})=>({
        headerRight:() => <Text onPress={() =>
          handlePress(navigation )}>Create    </Text>
      })}>
        <Stack.Screen  
        name="contact list" 
        component={contactList} />
        <Stack.Screen 
        name="Create Contact"
         component={Contactes} />
      </Stack.Navigator>
   
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: 'white',
  },
  
});



