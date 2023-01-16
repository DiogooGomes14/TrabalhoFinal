import { Button, View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useState, FC } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';

const RegisterScreen = ({ navigation }) => {

  const [inputEmail, setInputEmail] = useState(''); 
  const [inputPass, setInputPass] = useState('');
  const [inputUser, setInputUser] = useState('');


  // Para registar na base de dados
  const registerSystem = () =>
  {
    auth()
    .createUserWithEmailAndPassword(inputEmail, inputPass)
    .then(() => {
      alert("Conta criada com sucesso!");
      firestore()
      .collection("colecaoFinal")
      .doc(inputEmail)
      .set({
        username: inputUser,
        email: inputEmail,
        tipo: inputTipo, 
      })
      .then(() => {
        navigation.replace("Login")
      });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert("Email repetido fazer favor de usar diferente!");
      }
      if (error.code === 'auth/invalid-email') {
        alert("Email encontra-se inválido, fazer favor de usar diferente!");
      }
    });
  }


  // Dropdown
  const [inputTipo, setInputTipo] = useState('');

  const data = [
    {key: '1', value: '-------------', },
    {key: '2', value: 'Admin'},
    {key: '3', value: 'Trabalhador'},
    {key: '4', value: '-------------'}
  ]
  

  return (
    
    <View style={styles.container}>
        <Text style={[styles.settingsButtonContainer, styles.title2]}>Shifter App</Text>
        <Text style={[styles.title, styles.mg]}>Register</Text>
        <TextInput style={styles.input} placeholder='Username' value={inputUser} onChangeText={text=> setInputUser(text)} placeholderTextColor={'#EAE7B1'}/>
        <TextInput style={styles.input} placeholder="Email" value={inputEmail} onChangeText={text=> setInputEmail(text)} keyboardType="email-address" placeholderTextColor={'#EAE7B1'}/>
        <TextInput style={styles.input} placeholder="Password" value={inputPass} onChangeText={text=> setInputPass(text)} placeholderTextColor={'#EAE7B1'}/>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.replace('Login')}>
            <Text style={styles.buttonText}>Se já tiver conta</Text>
        </TouchableOpacity>
        <SelectList data={data} setSelected={(val) => setInputTipo(val)} inputStyles={{color: '#EAE7B1'}} dropdownStyles={{backgroundColor:'#A6BB8D'}} boxStyles={{backgroundColor: '#A6BB8D', borderColor: '#A6BB8D'}} dropdownTextStyles={{color: '#EAE7B1', fontSize: 18}} placeholder='Escolha o tipo de user'/>
        <TouchableOpacity style={styles.button} onPress={registerSystem}>
            <Text style={styles.buttonText}>Registar</Text>
        </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3C6255',
    },
    
    input: {
        height: 40,
        width: 300,
        margin: 10,
        padding: 10,
        borderColor: '#61876E',
        borderWidth: 1,
        borderRadius: 5,
        color: '#EAE7B1'
    },

    button: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#A6BB8D',
    },

    buttonText: {
        fontSize: 18,
        color: '#EAE7B1',
        alignSelf: 'center',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
    },

    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
    },

    settingsButtonContainer: {
      position: 'absolute',
      top: 5,
      right: 5,
      alignSelf: 'flex-end'
    },

    mg: {
      marginTop: 60
    }

});

export default RegisterScreen;