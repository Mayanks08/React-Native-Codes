import { useFormik } from "formik"
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import * as Yup from "yup"
import * as Contacts from "expo-contacts"


const Contactes = () => {

  const validationSchema = Yup.object({
    name: Yup.string()
    .min(4 , "Name must be at least 4 characters")
    .required("Name is required")
    .max(50,"Not more than 50 characters"),
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    phone: Yup.number()
    .required("Phone number is required")
    .min(6,"Atleast 6 characters"), 
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) =>
       {
        const contact = {
          [Contacts.Fields.FirstName]:values.name,
          // [Contacts.Fields.Emails]:[{
          //   email:values.email
          // }],
          // [Contacts.Fields.PhoneNumbers]:[{
          //   number: values.phone,
          // }]
          [Contacts.Fields.Emails]:values.email,
          [Contacts.Fields.PhoneNumbers]:values.phone

        }
        console.log(contact)
        await Contacts.addContactAsync(contact)
        console.log(contact)
       },
  
    validationSchema,
  });
  return (
    <View style ={styles.container}>
    <TextInput
    style={styles.input}
    placeholder="Enter contact name..."
    onChangeText={formik.handleChange("name")}
    value={formik.values.name}
    onBlur={formik.handleBlur("name")}
    
    />
    {formik.touched.name && formik.errors.name && (
      <Text style={styles.error}>{formik.errors.name}</Text>
    )}
    <TextInput
    style={styles.input}
    placeholder="Enter contact email..."
    onChangeText={formik.handleChange("email")}
    value={formik.values.email}
    onBlur={formik.handleBlur("email")} 
    />
    {formik.touched.email && formik.errors.email && (
      <Text style={styles.error}>{formik.errors.email}</Text>
      )}
    <TextInput 
    style={styles.input}
    placeholder="Enter contact Number..."
    onChangeText={formik.handleChange("phone")}
    value={formik.values.phone}
    onBlur={formik.handleBlur("phone")}
    KeyboardType="numeric"
    
    />
    {formik.touched.phone && formik.errors.phone && (
      <Text style={styles.error}>{formik.errors.phone}</Text>
    )}
    <View style={styles.saveB}>
    <Button title="Save Contact" onPress={formik.handleSubmit} />
    </View>
  
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:40,
    
  },
  input:{
    padding:15,
    marginBottom:15,
    borderWidth:2,
    borderColor:"#284877",
    marginVertical:5,
    borderRadius:15,
    fontSize:20,
    fontWeight:"bold"
  },
  error:{
    color:"red",
    fontSize:18,
  },
  saveB:{
    marginTop:20,
    
  }
})
export default Contactes;


