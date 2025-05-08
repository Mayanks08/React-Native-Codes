import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from './ProductList';
import Cart from './Cart';
import { Provider } from 'react-redux';
import store from './Redux/store';
import  Icon  from 'react-native-vector-icons/FontAwesome6';

const Stack = createStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={({navigation}) =>({
      headerRight:() =>(
      <View style={styles.cartIcon}>
        <TouchableOpacity onPress={() =>navigation.navigate("Cart")}>
          <Icon name="cart-shopping" size={25} color="white" />
        </TouchableOpacity>
      </View>
      ),
      headerStyle: {
        backgroundColor: 'rgb(216, 96, 96)',
      }

    })}>
      <Stack.Screen name="ProductList" component={ ProductList} />
      <Stack.Screen name="Cart" component={Cart}/>
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon:{
    marginRight:10
  },
});
