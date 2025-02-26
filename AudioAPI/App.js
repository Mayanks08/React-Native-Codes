
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  {Audio} from "expo-av"
import { useState } from 'react';

export default function App() {
  
  const [permissionResponse,requestPermission] = Audio.usePermissions()
  const [recording,setRecording] =useState( null)

  async function startRecording(){
    if(permissionResponse.status !== 'granted'){
      console.log("Requesting permission")
      await requestPermission()
  }
    console.log("audio recording")
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
     )
     setRecording(recording)
}
  async function stopRecording(){
    
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    console.log(`Recording saved to ${uri}`)
    setRecording(null)

    
  }

  return (
    <View style={styles.container}>
      <Button title={recording=== null ? "start Recoding" : "Stop Recording"} 
      onPress={recording=== null ? startRecording : stopRecording} />
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
