
import { StyleSheet, Text, View } from 'react-native';

const WeatherInfo = ({ location, temperature, condition }) => {
  return (
    <View style={styles.Weatherbox}>
      <Text style={styles.weatherText}>Location: {location}</Text>
      <Text style={styles.weatherText}>Temperature: {temperature}°C</Text>
      <Text style={styles.weatherText}>Condition: {condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Weatherbox: {
    backgroundColor: 'rgb(225, 220, 220)',
    marginBottom: 40,
    padding: 20,
    height: 180,
    width: 220,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherText: {
    fontSize: 20,
    margin: 2,
    fontWeight: 'bold'
  }
});

export default WeatherInfo;

