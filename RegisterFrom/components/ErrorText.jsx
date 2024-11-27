import {StyleSheet, Text} from "react-native"

const ErrorText = ({errorMsg}) => {
    return ( 
    <Text style={styles.ErrorBOX}>{errorMsg}</Text>
  );
}
 
const styles = StyleSheet.create({
  ErrorBOX: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default ErrorText;