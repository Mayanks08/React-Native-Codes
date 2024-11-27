import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import FormContainer from "../Screens/FormContainer";
import FormDisplay from "../Screens/FormDisplay"


const Stack = createStackNavigator()

const AppNavigator = () => { 
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Form" component={FormContainer} />
          <Stack.Screen name="FormData" component={FormDisplay} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
 
export default AppNavigator;