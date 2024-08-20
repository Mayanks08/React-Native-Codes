import {FlatList, View,StyleSheet} from "react-native"
import ProductCard from"./ProductCard"

const ProductList = ({products}) => {
    return ( 
        <FlatList 
        data={products} 
        renderItem={({item}) => (
            <ProductCard name={item.name} price={item.price} descriptions={item.descriptions} />
        )}
        keyExtractor={(item) => item.id}

        />
     );
     
}
export default ProductList;
const styles = StyleSheet.create({
    
})