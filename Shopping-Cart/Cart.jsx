import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import { removeFromCart, updateQuantity } from "./Redux/action";
import Icon  from "react-native-vector-icons/AntDesign";


const Cart = () => {

  const cartItems = useSelector((state) =>
    state.cart
    );
    const dispatch =useDispatch();
    const handleRemoveFromCart = (productId) => {
      dispatch(removeFromCart(productId))
      
    };

    const handleQuantityChange = (productId, quantity) => {
      if (quantity === 0) {
        return handleRemoveFromCart(productId);
      }
      dispatch(updateQuantity(productId, quantity));
    };

    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

  const renderCartItem= ({item}) => 
  <View style={styles.cartItem}>
    {item.imageUrl && <Image source={{uri:item.imageUrl}} 
        style={styles.image}/>}
        <View style={styles.itemDetails}>
        <Text style={styles.textname}>{item.name}</Text>
        <Text style={styles.priceText}>
          ${item.price.toFixed(2)}    ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
        
       <View  style={styles.quantityContainer}>
      <TouchableOpacity
      style={styles.quantityBtnContainer} 
      onPress={()=> handleQuantityChange(item.id, item.quantity -1)}>
         <Icon name="minus" style={styles.quantityBtn}/>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <TouchableOpacity style={styles.quantityBtnContainer}  onPress={()=> handleQuantityChange(item.id, item.quantity +1)}>
       <Icon name="plus" style={styles.quantityBtn}/>
      </TouchableOpacity>
   
    <TouchableOpacity 
    style={styles.removeBtnContainer}
     onPress={() => handleRemoveFromCart(item.id)}>
      <Text style={styles.RemoveText}>Remove </Text>
    </TouchableOpacity>
  </View>
  </View>

  return (
   <View>
   <FlatList 
   data={cartItems} 
   renderItem={renderCartItem} 
   keyExtractor={item => item.id.toString()} />
   {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${calculateTotalPrice().toFixed(2)}
          </Text>
        </View>
      )}
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "rgb(234, 216, 150)",
    borderRadius: 5,
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  textname: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 16,
    color: "rgb(99, 4, 4)",
    marginTop: 2,
    fontWeight:"600"
  },
  image: {
    width: 75,
    height: 75,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBtnContainer: {
    margin: 10,
    backgroundColor: " #f0c14b",
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
  },
  quantityBtn: {
    fontSize: 15,
   
  },
  removeBtnContainer: {
    margin: 10,
    borderColor: " red",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginLeft: 0,
  },
  RemoveText: {
    fontSize: 16,
    color: "red",
    marginLeft: 0,
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    backgroundColor:  "rgba(230, 91, 91, 0.87)",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color:"white"
  },
});
export default Cart