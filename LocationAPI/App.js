import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from "expo-location"

export default function App() {
  
  const [permission,requestPermission] = Location.useForegroundPermissions() ;

  const showPharamices = async () =>{
    //if permission not give by user, request it
    if(permission && !permission.granted){
      const {granted} = await requestPermission();

      if(granted){
        //Make an Api call 
        await getCurrentLocation();
      }else{
        Alert.alert("Cannot show  pharmacies without permission")
      }
    }else{
      await getCurrentLocation();
    }
  }
   //get device location

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({})
    const {latitude,longitude} = location.coords;

    Alert.alert(`Latitude:${latitude},Longitude:${longitude}`)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showPharamices}>
      <Text>Texting Audio API !</Text>
      <Text>Show me  Pharmaices location!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
