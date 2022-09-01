import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';
import Plato from './plato';
import { HStack, VStack } from 'native-base';

export default function platos({props}) {
  const renderItem = ({ item }) => (
    <Plato data={item} added={true} menu={props.menu} setMenu={props.setMenu} />
  )
  let flatLists = [[], []];
  let precioTotal = 0;
  let promTiempo = 0;

  for(let i=0; i < props.menu.length; i++) {
    if (props.menu[i]) {
      if (i%2 == 0) {
        flatLists[0].push(props.menu[i])
      } else {
        flatLists[1].push(props.menu[i])
      }
    }
  }

  props.menu.forEach(element => {
    precioTotal += element.pricePerServing;
  })
  props.setPrecioTotal(precioTotal.toFixed(2))

  props.menu.forEach(element => {
    promTiempo += element.readyInMinutes
  })
  promTiempo /= props.menu.length
  props.setPromTiempo(promTiempo.toFixed(0))

  return (
    <View style={styles.container}>
        <VStack space={1}>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#fff'}}>Precio Total: ${props.precioTotal}</Text>
            <Text style={{color: '#fff'}}>Tiempo de Preparacion promedio: {props.promTiempo} minutos</Text>
          </View>
          <View style={{marginHorizontal: 10}}>
          <HStack space={4}>
            <FlatList
              data={flatLists[0]}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.platos}
            />
            <FlatList
              data={flatLists[1]}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.platos}
            />
          </HStack>
          </View>
        </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d27',
    textAlign: 'center'
  },

  search: {
    color: '#fff',
    borderBottomWidth: '.1rem',
    borderBottomColor: '#fff',
    paddingVertical: '.5rem',
    paddingHorizontal: '5rem',
  },

  platos: {
    color: '#fff',
    maxWidth: 182
  },
});