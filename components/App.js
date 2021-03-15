import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {

  const [securedText, setSecuredText] = useState(true);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  
  const onSubmit = () => {
    let ok = true;
    let submitErrors = {};

    if(!values.numeComplet) {
      ok = false;
      submitErrors.numeComplet = 'Introdu un nume';
    } else if (!(values.numeComplet.split(/\W+/).length === 2)){
      ok = false;
      submitErrors.numeComplet = 'Introdu un nume complet';
    }

    if(!values.email) {
      ok = false;
      submitErrors.email = 'Introdu un email';
    } else if(!validateEmail(values.email)) {
      ok = false;
      submitErrors.email = 'Introdu un email valid';
    }
    
    if(!values.password) {
      ok = false;
      submitErrors.password = 'Introdu o parola';
    } else if (values.password.length<6){
      ok = false;
      submitErrors.password = 'Introdu o parola de cel putin 6 caractere';
    }

    setErrors(submitErrors);

    if(ok)
      console.log('successfully submitted');
    
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>

      <View style={{marginBottom: 50}}></View>

      <Text style={{fontSize: 40, marginBottom: 50, color: 'gray'}}>Creare Cont</Text>

      <TouchableOpacity style={styles.registerWithGoogleButton}>
        <Image source={require('./assets/google-logo.png')} style={{width:30, height:30, marginRight:30}}/>
        <Text style={{fontSize: 22, color: 'gray'}}>Register with Google</Text>
      </TouchableOpacity>
  
      <Text style={{fontSize: 15, marginBottom: 30, color: 'gray'}}>________</Text>

      <View>
        <Text style={{fontSize: 13, color: 'gray'}}>NUME COMPLET</Text>
        <TextInput onChangeText={(numeComplet)=>{
          setValues({...values,numeComplet:numeComplet});
        }} placeholder="Nume Complet" style={styles.inputText}/>
        { errors && errors.numeComplet && <Text style={{color: 'red'}}>{errors.numeComplet}</Text>}
      </View>

      <View>
        <Text style={{fontSize: 13, color: 'gray', marginTop:30}}>ORAS,TARA</Text>
        <DropDownPicker placeholder="-" containerStyle={{width: 300, height: 30}}></DropDownPicker>
        <Text style={{fontSize: 10, width:308, marginBottom: 20, color: 'gray'}}>Aceasta informatie ne va ajuta sa iti sugeram cele mai apropiate centre de donare de sange</Text>
      </View>

      <View>
        <Text style={{fontSize: 13, color: 'gray'}}>GRUPA DE SANGE</Text>
        <DropDownPicker placeholder="-" containerStyle={{width: 300, height: 30}} ></DropDownPicker>
        <Text style={{fontSize: 10,textDecorationLine: 'underline', marginBottom: 20, color: 'gray'}} >Cum imi pot afla grupa de sange?</Text>
      </View>

      <View>
        <Text style={{fontSize: 13, color: 'gray'}}>EMAIL</Text>
        <TextInput onChangeText={(email)=>{
          setValues({...values,email:email});
        }} placeholder="your@email.ro" style={styles.inputText}/>
        { errors && errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
      </View>

      <View>
        <Text style={{fontSize: 13, color: 'gray', marginTop:30}}>PAROLA</Text>
        <TextInput onChangeText={(password)=>{
          setValues({...values,password:password});
        }} secureTextEntry={securedText} placeholder="*********" style={styles.passwordInput} />
        <TouchableOpacity style={{marginBottom:5, borderColor: 'gray',borderWidth:1, width: 30}} onPress={() => setSecuredText(!securedText)}><Text>hide</Text></TouchableOpacity>
        { errors && errors.password && <Text style={{color: 'red'}}>{errors.password}</Text>}
      </View>

      <View> 
        <BouncyCheckbox style={{width:300, marginTop:30}} text="Sunt de acord cu preluarea datelor mele cu caracter personal" fontSize="12" textDecoration="false"/>
        <BouncyCheckbox style={{width:300, marginBottom: 40}} text="Sunt de acord cu Termenii si conditiile" fontSize="12" textDecoration="false"/>
      </View>

      <TouchableOpacity style={styles.CreateAccountButton} onPress={onSubmit}>
        <Text style={{color:"white"}} >CREEAZA CONT</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 13, marginBottom: 10, color: 'gray'}}>Ai deja cont? <Text style={{fontSize: 13,textDecorationLine: 'underline',color: 'gray'}}>Log in</Text></Text>
      
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  registerWithGoogleButton: {
    borderWidth:1,
    borderRadius:50,
    borderColor: "gray",
    padding:10,
    height:50,
    width:300,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom:10,
    flexDirection: "row",
  },
  passwordInput: {
    borderWidth:1,
    width:300,
    height:30,
    marginBottom:0,
    borderColor: 'gray'
  },
  inputText: {
    borderWidth:1,
    width:300,
    height:30,
    borderColor: 'gray'
  },
  CreateAccountButton: {
    borderRadius:50,
    padding:10,
    height:50,
    width:300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    marginBottom: 30
  }
});