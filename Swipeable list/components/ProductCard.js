import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler'
import {DeleteButton} from './DeleteButton.js'


const ProductCard = ({id,name,price,descriptions,onDelete}) => {

    const renderRightAction =()=> 
        <DeleteButton onPress={()=>onDelete(id)}/>

    
    return (
    <GestureHandlerRootView >
        <Swipeable renderRightActions={renderRightAction}>
        <View style={styles.card}>
        <Text style={styles.f1} >{name}</Text>
        <Text style={styles.f2} >{descriptions}</Text>
        <Text style={styles.f3} >{price}</Text>
        </View>
        </Swipeable>
    </GestureHandlerRootView>
      );
}
const styles = StyleSheet.create({
    card:{
        backgroundColor: '#FCF9F4',
        padding: 10,
        margin:10,
        borderRadius:12,
        borderColor:"#D0A2F7",
        borderWidth:5
    },
    f1:{
        fontSize: 18,
        marginBottom:5,
        fontWeight:"bold"
    },
    f2:{
      color:"#FF6D60"
    },
    f3:{
        color:"#E27802",
        fontWeight:"bold"
    }
    
})
export default ProductCard;
