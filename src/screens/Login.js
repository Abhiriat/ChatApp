import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Loader from '../Components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Main from './Main'

const Login = () => {
    const [visible,setvisible]=useState(false)
    const [email,setemail]=useState('')
    
    const [password,setpassword]=useState('')
    const navigation=useNavigation()
    const loginuser=()=>{
      setvisible(true)
firestore().collection('users').where('email','==',email).get().then(res=>{
  setvisible(false)
  if(res.docs !=[]){
    console.log(JSON.stringify(res.docs[0].data()))
    gotonext(res.docs[0].data().name,res.docs[0].data().email,res.docs[0].data().userid)

  }else{
    alert('user not found')
  }
}).catch(error=>{
  setvisible(false)
  console.log(error)
  alert('user not found')
})
    }
    const gotonext=async(name,email,userid)=>{
await AsyncStorage.setItem('NAME',name);
await AsyncStorage.setItem('EMAIL',email);
await AsyncStorage.setItem('USERID',userid);
navigation.navigate(Main)

    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput placeholder='Enter Email'style={[styles.input,{marginTop:50}]}
      value={email}
      onChangeText={txt=>setemail(txt)}/>
     
      <TextInput placeholder='Enter Password' style={styles.input}
      value={password}
      onChangeText={txt=>setpassword(txt)}/>

      <TouchableOpacity style={styles.btn} onPress={()=>{
        loginuser();
      }}>
        <Text style={styles.btntext} >Login</Text>
      </TouchableOpacity>
      <Text style={styles.orLogin} onPress={()=>{navigation.navigate('Signup')}}>Or Signup</Text>
   <Loader visible={visible}/>
    </View>
  )
}

export default Login
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:'black',
        marginTop:60
    },
    input:{
        width:'90%',
        height:50,
        borderWidth:0.5,
        borderRadius:10,
        marginTop:20,
        alignSelf:'center',
        paddingleft:20,

    },
    btn:{
        width:'90%',
        height:50,
        borderRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        backgroundColor:'purple',
    
    },
    btntext:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        
    },
    orLogin:{
        alignSelf: 'center',
        marginTop: 20,
        fontSize:25,
        fontWeight:'400',
        textDecorationLine:'underline',
        color:'black'
    }
})

