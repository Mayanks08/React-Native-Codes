import {StyleSheet, Text, TextInput, TouchableOpacity, View }from 'react-native'

export default function TodoForm({ todoName, setTodoName, onAdd }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={todoName}
        onChangeText={(text) => setTodoName(text)}
        placeholder="Enter a task..."
      />
      <TouchableOpacity onPress={onAdd}>
        <Text style={styles.Add}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "70%",
    borderColor: "#789DBC",
    borderWidth: 1,
    padding: 8,
    margin: 8,
    borderRadius: 6,
  },
  Add: {
    width: "120%",
    backgroundColor: "#586DBC",
    color: "#fff",
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 5,
  },
});
