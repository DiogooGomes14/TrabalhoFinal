import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import { Card, Divider } from '@rneui/themed';


const SessaoAdmin = ({navigation}) => {

    const [date, setDate] = useState(new Date())

    const [date2, setDate2] = useState(new Date())

    const [open, setOpen] = useState(false)

    const [open2, setOpen2] = useState(false)

    const [user, setUser] = useState('');

   

    const Enviar = () => {

        //console.log(Number(date.getHours()) - Number(date.getHours()))
        if(Number(date2.getHours()) - Number(date.getHours()) <= 8) {
            firestore()
            .collection('colecaoFinal')
            .doc(user)
            .update({
                horaInicio: date.toString(),
                horaFim: date2.toString()
            })
            .then(() => {
                console.log({date})
                alert("O turno foi criado com sucesso!");
            });
        }
        else{
            alert('O turno diurno não pode ter mais de 8 horas!')
        }
        
    };


    const [data] = React.useState([]);

    useEffect(() => {
        const collectionRef = firestore()
        .collection('colecaoFinal');
        collectionRef
        .get()
        .then((querySnapshot) => {
            querySnapshot
        .forEach((doc) => {
            data.push(doc.id);
        });
    });
    }, []);


    return (
      <View>
        <Text style={[styles.settingsButtonContainer, styles.title2]}>Shifter App</Text>
        <Text style={[styles.title,styles.mb]}>Admin</Text>
        <TextInput style={styles.input} placeholder='Insira o email do utilizador' onChangeText={text=> setUser(text)} placeholderTextColor={'#EAE7B1'}/>

        <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
            <Text style={styles.buttonText} keyboardType="email-address">Escolha as horas do turno</Text>
        </TouchableOpacity>

        <DatePicker 
            modal
            open={open} 
            date={date} 
            onConfirm={(date) => { 
                setOpen(false)
                setDate(date)
                setOpen2(true)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />

        <DatePicker             
            modal
            open={open2}
            date={date2}
            onConfirm={(date) => {
                setOpen2(false)
                setDate2(date)
            }}
            onCancel={() => {
                setOpen2(false)
            }}
        />

        <TouchableOpacity style={styles.button} onPress={Enviar}>
            <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
            <Text style={styles.buttonText}>Sair</Text>
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

    settingsButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        alignSelf: 'flex-end',
    },

    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif"
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#EAE7B1',
        marginBottom: 20,
        fontFamily:"serif",
        alignSelf: 'center'
    },

    mb: {
        marginTop: 100
    }

})

export default SessaoAdmin;