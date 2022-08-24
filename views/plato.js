import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View, Image, Modal } from 'react-native-web';
import glutenFree from '../assets/gluten_free.png'
import axios from 'axios';
import { Center, HStack, Stack } from 'native-base';

async function agregarPlato(id) {
    const apikey = '109d7d37f51f4bd7a32584d8f55ad71a';
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

function detalles(data) {
    return (
        <View style={styles.modalContainer}>
            <Modal>
                <Text>prueba</Text>
            </Modal>
        </View>
    )
}

export default function plato({ data, added, menu, setMenu}) {
    return (
        <View style={styles.container}>
            { added ?
                <>
                    <Text style={{color: '#fff'}}>{data.title}</Text>
                    <Image
                        style={styles.platoImage}
                        source={{
                            uri: data.image,
                        }}
                    />
                { data.glutenFree ?
                    <Center>
                    <Image
                        style={styles.glutenFree}
                        source={{
                            uri: glutenFree,
                        }}
                    />
                    </Center>
                :
                    <Text style={{height: '48px'}}></Text>
                }
                <Text style={{color: '#fff', marginTop: '.5rem'}}>Precio: ${data.pricePerServing} c/u</Text>
                <Text style={{color: '#fff', marginBottom: '.5rem'}}>Coccion: {data.readyInMinutes} minutos</Text>
                <Button
                    onPress={() => {
                        menu = menu.filter(item => item.id != data.id);
                        setMenu(menu);
                    }}
                    title="Eliminar"
                ></Button>
                <Text style={{marginVertical: '.25rem'}}></Text>
                <Button
                    onPress={() => {
                        detalles(data)
                    }}
                    title="Detalles"
                ></Button>
                { data.vegan ?
                    <Text style={{color: '#00cc00'}}>Vegano</Text>
                    :
                    <Text style={{height: '19px'}}></Text>
                }
                <Text style={{marginBottom: '2rem'}}></Text>
                </>
            :
                <>
                <Text style={{color: '#fff'}}>{data.title}</Text>
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
                        console.log(menu)
                    }}

                    disabled={menu.some(plato => {
                        return (plato.id === data.id || menu.length == 4)
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
      marginTop: '.15rem',
    },

    platos: {
      color: '#fff',
    },

    platoImage: {
        height: '10rem',
        width: '10rem',
        borderRadius: '.25rem',
        placeSelf: 'center',
        marginTop: '1rem'
    },

    caracteristicas: {
        color: '#fff',
    },

    glutenFree: {
        height: '3rem',
        width: '3rem',
        // position: 'absolute'
    },

    modal: {
        height: '300px',
        width: '300px',
        backgroundColor: '#fff',
    },

    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    }
  });