import AsyncStorage from '@react-native-async-storage/async-storage'

export  const storeData = async (key,value) =>{
    // if you using datatypw which is not string use JSON.stringfy
    try {
        await AsyncStorage.setItem(key,JSON.stringify(value))
    } catch (error) {
        console.log(error ," something went wrong in saving the data")
    }
}
export const  getData = async (key)=>{
    try {
        const stringifiedValue = await AsyncStorage.getItem(key);
        if(stringifiedValue !== null) {
            return JSON.parse(stringifiedValue)
        }
    } catch (error) {
        console.log(error, " something went wrong in getting data");
    }
}