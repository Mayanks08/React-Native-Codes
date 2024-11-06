import { FlatList, StyleSheet, Text, View } from "react-native";
import Todoitem from "./TodoItem"

export default function TodoLists({ todos, handleDelete, markAsComplete, isComplete }) {
  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todoitem
            label={item.name}
            isComplete={item.isComplete}
            handleDelete={() => handleDelete(item.id)}
            markAsComplete={() => markAsComplete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
 
});
