import { Text, StyleSheet ,View  } from "react-native";

const FormDisplay = ({route}) => {

    const {values} = route.params
   
    return (
      <View style={styles.container}>
        <Text style={styles.Textd}>{values.name} </Text>
        <Text style={styles.Textd}>{values.age} </Text>
        <Text style={styles.Textd}>{values.email} </Text>
        <Text style={styles.Textd}>{values.gender} </Text>
      </View>
    );
}
    
    const styles = StyleSheet.create({
        Textd: {
            fontSize: 20,
            color: 'blue',
            textAlign: 'center',
            marginTop:35,
            
        },
    })

export default FormDisplay;