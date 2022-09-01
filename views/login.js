import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-web';
import axios from 'axios';
import authContext from '../contexts/authContext.js';
import Alert from "react-native-awesome-alerts";

async function authenticate (email, password, setLoggingIn, setAlerta) {
    setLoggingIn(true)
    return axios.post('http://challenge-react.alkemy.org/', {
        email: email,
        password: password
    })
    .then(() => {
        setLoggingIn(false)
        return true;
    })
    .catch(() => {
        setLoggingIn(false)
        setAlerta(true)
        return false;
    })
}

export default function login() {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const { setToken } = useContext(authContext);

  return (
    <View style={styles.container}>
        <Alert
            show={alerta}
            message="Los datos ingresados son incorrectos o los campos estan vacíos."
            closeOnTouchOutside={true}
            onDismiss={() => {
                setAlerta(false)
            }}
        />
      { alerta ? 
        null
      :
        <View style={styles.card}>
            <Text>Ingresar Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail"
            />
            <Text style={{marginTop: '1.5rem'}}>Ingresar Contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPasswd}
                value={passwd}
                placeholder="Contraseña"
                secureTextEntry={true}
                />
            <Text style={{marginVertical: 10}}></Text>
            <Button
                title="Enviar"
                onPress={async () => {
                    if (!email || !passwd) {
                        setAlerta(true)
                    } else {
                        const res = await authenticate(email, passwd, setLoggingIn, setAlerta);
                        setToken(res)
                    }
                }}
                disabled={loggingIn}
                ></Button>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1d1d27',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: 10,
    },

    input: {
        borderRadius: 2,
        borderBottomWidth: '.1rem',
        borderBottomColor: '#000',
        paddingVertical: '.5rem',
        paddingRight: '5rem',
        paddingLeft: '.5rem'
    }
  });