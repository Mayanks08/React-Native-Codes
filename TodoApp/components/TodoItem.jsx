import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {GestureHandlerRootView,Swipeable} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import TodoAction from './TodoActions'


const Todoitem = ({ label, isComplete , handleDelete, markAsComplete }) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <View style={styles.actions}>
            {!isComplete && (
              <TodoAction
                onPress={markAsComplete}
                iconName="check"
                actionBgColor={"green"}
              />
            )}
          </View>
        )}
        renderLeftActions={() => (
          <View style={styles.actions}>
            <TodoAction
              onPress={handleDelete}
              iconName="trash"
              actionBgColor={"red"}
            />
          </View>
        )}
      >
        <View style={styles.item}>
          <Text style={[styles.label, isComplete && styles.isCompleted]}>
            {label}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
 
export default Todoitem;
 const styles = StyleSheet.create({
   item: {
     padding: 20,
     margin: 10,
     backgroundColor: "#f4f4f4",
     shadowColor: "#7AB2D3",
     shadowOpacity: 0.5,
     shadowRadius: 2,
     elevation: 2,
     borderRadius: 15,
   },
   label: {
     FontSize: 20,
     fontWeight: "bold",
   },
   actions: {
     flexDirection: "row",
     justifyContent: "space-between",
   },
   isCompleted: {
     textDecorationLine: "line-through",
   },
  
 });