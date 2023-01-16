import { Button, View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState('');  
  const [inputPass, setInputPass] = useState('');
  const [tipo, setTipo] = React.useState([]);



  // Para escolher o tipo
  function tipoUser(documentSnapshot) {
    return documentSnapshot.get('tipo')
  }

  const inAccount = () => {
    firestore()
    .collection('colecaoFinal')
    .doc(inputEmail)
    .get()
    .then(documentSnapshot => tipoUser(documentSnapshot))
    .then(ok => {
        const tp = []
        tp.push(ok)
        setTipo(tp)
        if(tp[0] === '2') {
            //alert("Entraste meu!")
            navigation.replace("Admin");
        }   
        else
            navigation.replace("Trabalhador")
        })
    }



  // SplashScreen
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [time, setTime] = useState(true);

  const splashScreen = async () => {
    await delay(5000);
    //console.log("Aguarde...");
    setTime(false)
  };

  useEffect(() => {
    splashScreen()
  }, []);

  if(time) {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Shifter App</Text>
        <Text style={styles.subtitulo}>Aguarde um momento...</Text>
    </View>
    )
  }

  // Testar o login
  const testeLogin = () => {
        auth()
        .signInWithEmailAndPassword(inputEmail, inputPass)
        .then(userCredentials => {
        const user = userCredentials.user;
        console.log('O utilizador', user.email, 'logou!');
        inAccount()
        });
  }

  return (
    <View style={styles.container}>
        <Text style={[styles.settingsButtonContainer, styles.title2]}>Shifter App</Text>
        <Text style={[styles.title, styles.mg]}> Login</Text>
        <TextInput style={styles.input} placeholder="Email" onChangeText={text=> setInputEmail(text)} keyboardType="email-address" placeholderTextColor={'#EAE7B1'}/>
        <TextInput style={styles.input} placeholder="Password" value={inputPass} onChangeText={text=> setInputPass(text)} placeholderTextColor={'#EAE7B1'}/>
        <TouchableOpacity style={styles.button} onPress={testeLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.replace("Register")}>
            <Text style={styles.buttonText}>Se não tiver conta</Text>
        </TouchableOpacity>
    </View>
    );

}

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

    settingsButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        alignSelf: 'flex-end'
    },

    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
    },

    subtitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#EAE7B1',
        marginBottom: 40,
        fontFamily: 'serif'
    },

    mg: {
        marginTop: 20
    }

});

export default LoginScreen;