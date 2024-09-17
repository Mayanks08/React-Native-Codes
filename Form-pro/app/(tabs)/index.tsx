import React, { useState } from 'react'
import { Text, View ,StyleSheet,TextInput, Button} from 'react-native'
import {useFormik} from 'formik'
import * as Yup from 'yup'

export default function App() {

  const validationSchema = Yup.object({
    username: Yup.string()
              .min(4,' At least 4 letters required')
              .max(20, "Not more than 20 letters")
              .required('Username is required'),
    password: Yup.string()
              .min(8,'At least 4 letters required')
              .required("Password Required "),
    email: Yup.string()
          .email("Please enter valid Email")
          .required("Email is Required"),
    age:Yup.number()
        .min(18, "Must be 18 year old age ")
        .required("Age is required"),
    address: Yup.string().required("Address is Required")
            .matches(/^[#.0-9a-zA-Z \-\/]+$/, 'Invalid address format'),
  })

  const formik = useFormik({
    initialValues: {
      username:'',
      password:'',
      email: '',
      address:'',
      age:18
    },
    onSubmit: (values) =>{
      console.log(values);
    },
      validationSchema
  });

  return (
    <View style={Styles.Container}>
      <TextInput style={Styles.input} 
      placeholder='Username' 
      value={formik.values.username}
      onBlur={formik.handleBlur("username")}
      onChangeText={formik.handleChange("username")}
       />
       {formik.touched.username && formik.errors.username && (
        <Text style={Styles.errors}>{formik.errors.username}</Text>
       )}
      <TextInput style={Styles.input} 
      placeholder='Password'
      value={formik.values.password}
      onBlur={formik.handleBlur("password")}
      onChangeText={formik.handleChange("password")}
      secureTextEntry
      />
      {formik.touched.password && formik.errors.password &&(
        <Text style={Styles.errors}>{formik.errors.password}</Text>
      )}
      <TextInput style={Styles.input} 
      placeholder='Email'
      value={formik.values.email}
      onBlur={formik.handleBlur("email")}
      onChangeText={formik.handleChange("email")}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={Styles.errors}>{formik.errors.email}</Text>
      )}
      <TextInput style={Styles.input} 
      placeholder='Address'
      value={formik.values.address}
      onBlur={formik.handleBlur("address")}
      onChangeText={formik.handleChange("address")}
      />
      {formik.touched.address && formik.errors.address && (
        <Text style={Styles.errors}>{formik.errors.address}</Text>
      )}
      <TextInput 
      style={Styles.input} 
      placeholder='Age'
      keyboardType='numeric'
      onBlur={formik.handleBlur("age")}
      onChangeText={formik.handleChange("age")}
      />
       {formik.touched.age && formik.errors.age && (
        <Text style={Styles.errors}>{formik.errors.age}</Text>
      )}
      <Button  title='Submit' onPress={formik.handleSubmit} />
    </View>
  )
}
const Styles = StyleSheet.create({
  Container:{
    padding:20, 
    marginTop:10,
    justifyContent:'center',
  },
  input:{
    height:40,
    borderColor:'gray',
    borderWidth:2,
    marginVertical:10,
    padding:10
    },
    errors:{
      color:'red',
      fontSize:15,
      fontWeight:"bold"
    }
   
})

