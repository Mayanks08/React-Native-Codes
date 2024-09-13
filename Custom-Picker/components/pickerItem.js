import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PickerItem = ({label , onPress}) => {
    return (  
    <View style={styles.PickerItem}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text1}>{label}</Text>
        </TouchableOpacity>
    </View>
     );
}
const styles = StyleSheet.create({
    PickerItem:{
    width:300,   
    padding:10,
    backgroundColor:"#4B70F5",
    marginTop:10,
    borderRadius:5

    },
    text1:{
    fontSize:20,
    color:"#fff",
    },
  })
export default PickerItem;