import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"
import PickerItem from "./pickerItem.js"


const AddPicker = ({categories}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name)
    return ( 
   <View >
    <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
        <View style={styles.labelCon}>
        <Text style={styles.text1}>{selectedCategory} </Text>
        <Icon name="caret-down" color={"white"} />
        </View>
    </TouchableOpacity>
    <Modal visible={isModalVisible} animationType="fade">
        <View style={styles.modalView}>
            <FlatList 
            data={categories}
            renderItem={({item})=> <PickerItem  
            label={item.name} 
            onPress={()=>{setSelectedCategory(item.name)
            setIsModalVisible(false)
            }}/>
        }
            />
        </View>
    </Modal>
   </View>
    );
}
const styles = StyleSheet.create({
    labelCon:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
        backgroundColor:"#4C3BCF",
        marginTop:10,
        borderRadius:5
    },
    modalView:{
        flex:1,
        margin: 20,
        justifyContent:"center",
        alignItems:"center"

    },
    text1:{
        fontSize:20,
        color:"#fff",
        },
      })
export default AddPicker;