import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './views/Login.js';
import Busqueda from './views/busqueda.js';
import Home from './views/home.js';
import authContext from './contexts/authContext.js';

export default function App() {
  const [token, setToken] = useState(false)
  const [menu, setMenu] = useState([])

  return (
    <authContext.Provider value={{ token, setToken }}>
      { token ?
        <View style={styles.container}>
          <Busqueda props={{menu, setMenu}}/>
          <Home props={{menu, setMenu}}/>
        </View>
      :
        <Login/>
      }
    </authContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
    alignItems: 'center',
    justifyContent: '',
  },
});
