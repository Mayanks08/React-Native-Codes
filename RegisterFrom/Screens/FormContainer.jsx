import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import {useFormik} from "formik"
import * as yup from "yup"
import ErrorText from "../components/ErrorText"
import {useNavigation} from "@react-navigation/native"

const FormContainer = () => {
      const navigation = useNavigation()
    const validationSchema = yup.object({
      name: yup.string()
      .min(4,"Name must have 4 charcter")
      .max(50,"Name should not have more than 50 character")
      .required("Name is required"),
      age: yup.string()
      
      .required("Age is required"),
      gender:yup.string()
      .required("Gender is required"),
  
      email: yup.string()
      .email("Must be valid email")
      .required("Email is required"),
      password: yup.string()
      .min(8,"Password must have 8 character")
      .max(50,"Password should not have more than 50 character")
      .required("Password is required"),
      
    })

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        gender: "",
        password: "",
        age:""
      },
      onSubmit: (values) => {
        navigation.navigate(
          "FormData",{values}
        )
      },
      validationSchema: validationSchema,
    });

    return (
      <View style={styles.Container}>
        <Text style={styles.Header}>  Registration form</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <ErrorText errorMsg={formik.errors.name} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Your age"
          value={formik.values.age}
          onChangeText={formik.handleChange("age")}
          onBlur={formik.handleBlur("age")}
          keyboardType="numeric"
        />

        {formik.touched.age && formik.errors.age && (
          <ErrorText errorMsg={formik.errors.age} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />

        {formik.touched.email && formik.errors.email && (
          <ErrorText errorMsg={formik.errors.email} />          
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          secureTextEntry
        />

        {formik.touched.password && formik.errors.password && (
          <ErrorText errorMsg={formik.errors.password} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Your gender"
          value={formik.values.gender}
          onChangeText={formik.handleChange("gender")}
          onBlur={formik.handleBlur("gender")}
          keyboardType="picker"
        />

        {formik.touched.gender && formik.errors.gender && (
          <ErrorText errorMsg={formik.errors.gender} />
        )}

        <View>
          <Button title="Submit" onPress={formik.handleSubmit}/>
        </View>

      </View>
    );
}
 
const styles = StyleSheet.create({
    Container:{
        flex:1,
        padding:20
    },
    Header:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20
    },
    input:{
      height:60,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius:5,
      padding:10,
      width:300,
      alignItems:"center",
      marginVertical:20,
    },
})


export default FormContainer;