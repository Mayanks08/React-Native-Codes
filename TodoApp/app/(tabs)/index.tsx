import { Image, StyleSheet, Platform, Text, View} from 'react-native';
import TodoListApp from '@/Screens/TodoListApp'

export default function HomeScreen() {
  return (
    <View style={styles.Container}>
      <TodoListApp/>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
   flex:1,
   marginTop:40,
   justifyContent: 'center',
   alignItems:'center'
  },
  
});
