import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import * as Contacts from 'expo-contacts';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(()=>{
    (async (params) => {
      console.log('Requesting contact permissions...');
      const {status} = await Contacts.requestPermissionsAsync();
      console.log('Contact permissions status:', status);

      if(status !== 'granted'){
        console.log('Contact permissions denied');
        Alert.alert("Allow contact to be accessed");
        return;
      }
      console.log('Fetching contacts...');
      const {data} = await Contacts.getContactsAsync();
      console.log('Contacts fetched:', data);
      setContacts(data);
    })().catch((error) => {
      console.error('Error fetching contacts:', error);
    });
  },[]);
const renderContact = ({item}) => (
  <View style={Styles.row }>
    <Text style={Styles.name }>{item.firstName}</Text>
    <Text style={Styles.last }>{item.lastName}</Text>
    <Text style={Styles.num }>{item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
  </View>
)
  return (
   <View>
    <FlatList data={contacts} renderItem={renderContact}/>
   </View>
  )
}
export default ContactList;

const Styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    padding:10
  },
  name:{
    fontSize:20,
    width:"25%",
    alignItems:"center"
  },
  last:{
    fontSize:20,
    width:"25%"
  },
  num:{
    fontSize:20,
    width:"65%",
  }
})