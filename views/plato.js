import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-web';
import axios from 'axios';

async function agregarPlato(id) {
    const apikey = 'f6f6f4ca17c74fdb8051f432f9e7cc00';
    const url = `https://api.spoonacular.com/recipes/${id}/information`;

    return await axios.get(url, {
        params: {
        apiKey: apikey
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch(() => {
        return null;
    });
}

export default function plato({ data, added, menu, setMenu}) {
    return (
        <View style={styles.container}>
            <Text style={{color: '#fff'}}>Plato: {data.title}</Text>
            { added ?
                <>
                <Button
                    onPress={() => {
                        menu = menu.filter(item => item.id != item.id);
                        setMenu(menu);
                    }}
                    title="Eliminar"
                ></Button>
                <Button
                    onPress={() => {
                        detalles(data)
                    }}
                    title="Detalles"
                ></Button>
                { data.vegan ? 
                    <Text style={{color: '#00cc00'}}>Vegano</Text>
                :
                    null
                }
                </>
            :
                <>
                <Button
                    onPress={ async () => {
                        let aux = menu
                        let nuevoPlato = await agregarPlato(data.id)
                        let platosVeganos = 0
                        let platosNoVeganos = 0

                        aux.forEach(element => {
                            element.vegan ? platosVeganos++ : platosNoVeganos++
                        });

                        if (nuevoPlato.vegan && platosVeganos == 2) {
                            console.log("El menu ya tiene 2 platos veganos.")
                            return null
                        } else if (!nuevoPlato.vegan && platosNoVeganos == 2) {
                            console.log("El menu ya tiene 2 platos no veganos.")
                            return null
                        }

                        aux.push(nuevoPlato)
                        setMenu([...aux])
                    }}

                    disabled={menu.some(plato => {
                        return plato.id === data.id || menu.length == 4
                    })}
                    title="Agregar"
                ></Button>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: '.5rem',
      textAlign: 'center',
      flex: 1,
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