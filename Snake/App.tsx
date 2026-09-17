import Game from "./Src/componets/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
 import 'react-native-gesture-handler';
const App = () => (
 <SafeAreaProvider>
   <GestureHandlerRootView style={{ flex: 1 }}>
    <Game />
    </GestureHandlerRootView>
  </SafeAreaProvider>
)



export default App 