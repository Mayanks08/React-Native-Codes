import {StyleSheet, TouchableOpacity, View} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";


const TodoAction = ({onPress, iconName, actionBgColor}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.actionContainer,{backgroundColor:actionBgColor}]}>
          <Icon name={iconName}size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
}
 
const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    borderRadius: 10,
  },
});
export default TodoAction;