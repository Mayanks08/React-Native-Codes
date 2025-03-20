import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import WeatherInfo from './WeatherInfo';
import {API_KEY} from "./constants.js"
import { useState } from 'react';
import axios from 'axios'; 
import * as Location from "expo-location"

export default function App() {
  
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading , setIsLoading] = useState(false)
 

  const getWeather = async (query) => {
   
    const API =`https://api.weatherapi.com/v1/current.json?q=${query}&key=${API_KEY}`;

    try {
      const {data} = await axios.get(API);
     setIsLoading(true)
      setWeatherInfo(data);
    } catch (error) {
        Alert.alert("Error in calling weather API");
        console.log("Error fetching weather data:", error.response ? error.response.data : error.message);
      
    }
    finally {
      setIsLoading(false);
    }
   
  };

  const getWeatherForCurrentLocation = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();

      if(status !== "granted"){
        Alert.alert("Please grant location permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      const {latitude ,longitude} = currentLocation.coords;
      console.log(latitude,longitude)
      await getWeather(`${latitude},${longitude}`)
  }

  return (
    <View style={styles.container}>
    { isLoading ? (
       <ActivityIndicator/>) :
      ( 
        weatherInfo && (
           <WeatherInfo 
        location={weatherInfo.location.name}
        temperature={weatherInfo.current.temp_c} 
        condition={weatherInfo.current.condition.text}  />
      )
        )}
     <TextInput 
      placeholder='Enter your City Name'
      style={styles.input} 
      value={location} 
      onChangeText={(Text)=> setLocation(Text.toUpperCase())} />
     <TouchableOpacity>
      <Text style={styles.ButtonText} onPress={() =>getWeather(location)}>
        Search
      </Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={getWeatherForCurrentLocation}>
      <Text style={styles.ButtonText} >Get Weather For Current Loaction</Text>
     </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c64fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
 input: {
  height: 50,
  borderColor: '#578FCA',
  borderWidth: 2,
  padding: 10,
  width: '80%',
  margin:10,
  borderRadius: 10,
  fontSize:15,
  fontWeight:"bold",
  backgroundColor: 'rgb(225, 220, 220)'
 },
 ButtonText: {
  fontSize: 20,
  color: 'white', 
  backgroundColor:"rgb(81, 8, 136)",
  borderWidth:2,
  borderColor: 'rgb(23, 94, 187)',
  borderRadius:20,
  padding: 15,
  margin: 10,
  shadowColor: "white",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.70,
  shadowRadius: 4.65,
  elevation: 6,
  }
});
