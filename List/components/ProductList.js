import {FlatList, View,StyleSheet} from "react-native"
import ProductCard from"./ProductCard"
import SearchBar from "./searchBar"
import { useState } from "react"

const ProductList = ({products, onDelete}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProducts = products.filter(product => 
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( 
        <View style={styles.searchb}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <FlatList 
        data={filteredProducts} 
        renderItem={({item}) => (
            <ProductCard 
            id={item.id}
            name={item.name} 
            price={item.price} 
            descriptions={item.descriptions}
            onDelete={onDelete} />
        )}
        keyExtractor={(item) => item.id.toString()}

        />
        </View>
     );
     
}
export default ProductList;
const styles = StyleSheet.create({
    searchb: {
       
    }
    
})