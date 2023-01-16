import { Button, View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Card, Divider } from '@rneui/themed';
import { color } from '@rneui/themed/dist/config';


const SessaoTrabalhador = ({ navigation }) => {
  
  const Item = auth().currentUser.email

  function finalTime(documentSnapshot){return documentSnapshot.get('horaFim');}
  function startTime(documentSnapshot){return documentSnapshot.get('horaInicio');}
  function readName(documentSnapshot){return documentSnapshot.get('username');}

  const [horaInicio, setHoraInicio] = React.useState([]);
  const [horaFim, setHoraFim] = React.useState([]);
  const [lerNome, setLerNome] = React.useState([]);

  const readNome = () => {
    firestore()
    .collection('colecaoFinal')
    .doc(Item)
    .get()
    .then(documentSnapshot => readName(documentSnapshot))
    .then(ok => {
        const time = [];
        time.push(ok);
        setLerNome(time)
    })
}


  const final = () => {
    firestore()
    .collection('colecaoFinal')
    .doc(Item)
    .get()
    .then(documentSnapshot => finalTime(documentSnapshot))
    .then(ok => {
      const time = []
      time.push(ok);
      setHoraFim(time);
    })
  };

  const inicial = () => {
    firestore()
    .collection('colecaoFinal')
    .doc(Item)
    .get()
    .then(documentSnapshot => startTime(documentSnapshot))
    .then(ok => {
      const time = []
      time.push(ok);
      setHoraInicio(time);
    })
  };

  useEffect(() => {
    readNome()
    final()
    inicial()
  }, []);

  const logOut = () => {
    auth()
    .signOut()
    .then(() => navigation.replace("Login"));
  }

  return (
    <View style={styles.container}>
        <Text style={[styles.settingsButtonContainer, styles.title]}>Shifter App</Text>
        <Text style={styles.titulo}>Trabalhador</Text>
        <Text style={[styles.subtitulo, styles.bold]}>{lerNome}</Text>
        <Card containerStyle={{ marginTop:10, marginBottom:12, borderRadius:20, backgroundColor:'#61876E', borderWidth:3, color: '#A6BB8D', borderColor: '#A6BB8D',}}>
            <Text style={styles.input}>Inicio de turno:  {horaInicio}</Text>
            <Text style={styles.input}>Fim de turno:  {horaFim}</Text>
        </Card>
        <TouchableOpacity style={styles.button} onPress={()=>logOut()}>
            <Text style={styles.buttonText}>Voltar</Text>
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

    settingsButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        alignSelf: 'flex-end'
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
      },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
      },

    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#EAE7B1',
        marginBottom: 40,
        fontFamily: 'serif'
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

});

export default SessaoTrabalhador;