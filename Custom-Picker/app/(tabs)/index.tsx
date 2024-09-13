import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddPicker from "@/components/AddPicker.js"

const categories = [{
    id:1,
    name: 'Electronics',
},{
    id:2,
    name: 'Fashion',
},
{
    id:3,
    name: 'School',
}
]
function CustomPicker() {
  return (
    
    <View >
      <AddPicker categories={categories} />
    </View>
    
  )
} 

const styles = StyleSheet.create({
  Container:{
    backgroundColor:'#5F6F65'
  },
})
export default CustomPicker