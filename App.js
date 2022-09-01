import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, VStack } from "native-base";
import Login from './views/login.js';
import Busqueda from './views/busqueda.js';
import Home from './views/home.js';
import authContext from './contexts/authContext.js';

export default function App() {
  const [token, setToken] = useState(false)
  const [menu, setMenu] = useState([])
  const [precioTotal, setPrecioTotal] = useState(0)
  const [promTiempo, setPromTiempo] = useState(0)

  return (
    <NativeBaseProvider>
      <authContext.Provider value={{ token, setToken }}>
        { token ?
          <View style={[styles.container, {flexDirection: 'column'}]}>
            <View style={{flex: 2}}>
              <Busqueda props={{menu, setMenu}}/>
            </View>
            <View style={{flex: 2}}>
              <Home props={{menu, setMenu, precioTotal, setPrecioTotal, promTiempo, setPromTiempo}} style={{flex: 2}}/>
            </View>
          </View>
        :
          <Login/>
        }
      </authContext.Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
    justifyContent: '',
  }
});
