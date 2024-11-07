import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'

const Signup = () => {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [mobile,setmobile]=useState('')
    const [password,setpassword]=useState('')
    const [confirmpassword,setconfirmpassword]=useState('')
    const navigation=useNavigation()
    const registeruser=()=>{
      const userid=uuid.v4()
firestore().collection('users').doc(userid).set({
  name:name, 
  email:email,
    password:password,
    mobile:mobile,
    userid:userid
}).then(res=>{
  console.log("user created")
  navigation.navigate('Login')
}).catch(err=>{
  console.log(err)
})
    }
    const validate=()=>{
      let isvalid=true;
      if(name== ''){
        isvalid=false
      }
      if(email== ''){
        isvalid=false
      }
      if(mobile== ''){
        isvalid=false
      }
      if(password== ''){
        isvalid=false
      }
      if(confirmpassword== ''){
        isvalid=false
      }
      if(confirmpassword != password){
        isvalid=false
      }
      return isvalid
    
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder='Enter Name' style={[styles.input,{marginTop:50}]}
      value={name}
      onChangeText={txt=>setname(txt)}/>
      <TextInput placeholder='Enter Email' style={styles.input}
      value={email}
      onChangeText={txt=>setemail(txt)}/>
      <TextInput placeholder='Enter Mobile' style={styles.input} keyboardType={'number-pad'}
      value={mobile}
      onChangeText={txt=>setmobile(txt)}/>
      <TextInput placeholder='Enter Password' style={styles.input}
      value={password}
      onChangeText={txt=>setpassword(txt)}/>
      <TextInput placeholder='Confirm Password' style={styles.input}
      value={confirmpassword}
      onChangeText={txt=>setconfirmpassword(txt)}/>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btntext} onPress={()=>{
          if(validate()){
          registeruser()
        }
        else{
          alert('Enter valid details')
        }
        }} >Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.orLogin} onPress={()=>{navigation.goBack()}}>Or Login</Text>
    </View>
  )
}

export default Signup
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
        marginTop:50,
        backgroundColor:'purple',
    
    },
    btntext:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        
    },
    orLogin:{
        alignSelf: 'center',
        marginTop: 30,
        fontSize:25,
        fontWeight:'400',
        textDecorationLine:'underline',
        color:'black'
    }
})

