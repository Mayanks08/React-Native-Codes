import { TouchableOpacity, View,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.deleteContainer}>
        <Icon name="trash" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    backgroundColor: "green",
    flex: 1,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
