import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './views/Login.js';
import Busqueda from './views/busqueda.js';
import Home from './views/home.js';
import authContext from './contexts/authContext.js';
import menuContext from './contexts/menuContext.js';

export default function App() {
  const [token, setToken] = useState(false)
  const [menu, setMenu] = useState([])

  return (
    <authContext.Provider value={{ token, setToken }}>
      { token ?
        <menuContext.Provider value={{ menu, setMenu }}>
          <Home/>
        </menuContext.Provider>
      :
        <Login/>
      }
    </authContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
