import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return ( 
        <TextInput 
        style={styles.test}
         placeholder="Search Here for Products" 
         value={searchTerm} 
         onChangeText={(text) =>setSearchTerm(text)}/>
 );
}
 
const styles = StyleSheet.create({
   test:{
    height: 45,
    width:330,
    margin:'auto',
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius:20,
   }
});
export default SearchBar;