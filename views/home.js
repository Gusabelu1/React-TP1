import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert, FlatList } from 'react-native-web';
import Busqueda from './busqueda.js'
import axios from 'axios';
import Plato from './plato';
import { HStack } from 'native-base';

export default function platos({props}) {
  const renderItem = ({ item }) => (
    <Plato data={item} added={true} menu={props.menu} setMenu={props.setMenu} />
  )
  let flatLists = [[], []];

  for(let i=0; i < props.menu.length; i++) {
    if (props.menu[i]) {
      if (i%2 == 0) {
        flatLists[0].push(props.menu[i])
      } else {
        flatLists[1].push(props.menu[i])
      }
    }
  }

  return (
    <View style={styles.container}>
      <HStack space={2}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '0',
    marginLeft: '1rem'
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
  }
});