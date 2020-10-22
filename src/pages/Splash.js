import React, {useEffect} from "react";
import { View , Image, Dimensions} from "react-native";
import { useSelector } from "react-redux";


const { width, height } = Dimensions.get('window');
const logo = require("../../assets/img/logo.png")

export default Splash = ({ route,navigation}) =>{
    const { user } = useSelector(state => state)
    
    useEffect(()=>{
        if(user.loged){
            navigation.replace("Main")
        }else{
            navigation.replace("Login")
        }
    }, [])
    return (
    <View style={{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Image 
            source={logo}
            style={{
                width: width * 0.70,
                resizeMode: "contain"
            }}
        />
    </View>
)}