import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl} from 'react-native';
import ProductList from "@/components/ProductList"

const initialProducts=[
  {
    id: 1,
    name: "Earphones",
    price: 10.99,
    descriptions:"Top Notice sound quality"
  },
  {
    id: 2,
    name:"Tv",
    price:10,
    descriptions:"Good quality"
  },
  {
    id:3,
    name:"Moblies",
    price: 100,
    descriptions:"Smart Devices  with GPS"
  }
]


export default function App() {
 
  
  return (
  <View style={styles.container}>
    <ProductList products={initialProducts}/>
  
  </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor:'#B9B4C7',
    
  },
  itemContainer:{

  },
  det:{
   
  },
  detext:{
    
  }
});