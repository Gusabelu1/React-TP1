import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View, Image, Modal, Pressable } from 'react-native-web';
import glutenFree from '../assets/gluten_free.png';
import vegan from '../assets/vegan.png';
import axios from 'axios';
import { Center, HStack, Stack } from 'native-base';
import { flexbox } from 'styled-system';

async function detalles(id) {
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

export default function plato({ data, added, menu, setMenu }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data1, setData1] = useState([]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image
                        style={styles.platoImage}
                        source={{
                            uri: data.image,
                        }}
                    />
                    <Text style={{fontWeight: 600, marginBottom: 10}}>{data.title}</Text>
                    <Text>${data.pricePerServing ? data.pricePerServing : data1.pricePerServing} / {data.readyInMinutes ? data.readyInMinutes : data1.readyInMinutes} mins.</Text>
                    <Text style={{marginBottom: 20}}>Puntaje de Saludable: {data.healthScore ? data.healthScore : data1.healthScore}</Text>
                    { data.vegan ?
                        <Text>Vegano: Sí</Text>
                    :
                        data1.vegan ? 
                            <Text>Vegano: Sí</Text>
                        :
                            <Text>Vegano: No</Text>
                    }
                    { data.vegetarian ?
                        <Text>Vegetariano: Sí</Text>
                    :
                        data1.vegetarian ?
                            <Text>Vegano: Sí</Text>
                        :
                            <Text>Vegano: No</Text>
                    }
                    { data.glutenFree ?
                        <Text style={{marginBottom: 15}}>Libre de Gluten: Sí</Text>
                    :
                        data1.glutenFree ?
                            <Text style={{marginBottom: 15}}>Libre de Gluten: Sí</Text>
                        :
                            <Text style={{marginBottom: 15}}>Libre de Gluten: No</Text>
                    }
                    {/* <Text>{data.summary}</Text> */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            { added ?
                <>
                    <Text style={{color: '#fff', marginBottom: 5}}>{data.title}</Text>
                    <Image
                        style={styles.platoImage}
                        source={{
                            uri: data.image,
                        }}
                    />
                <View style={styles.imageContainer}>
                { data.glutenFree ?
                    <View style={styles.leftContainer}>
                        <Image
                            style={styles.glutenFree}
                            source={{
                                uri: glutenFree,
                            }}
                        />
                    </View>
                :
                    <Text style={{height: '48px'}}></Text>
                }
                { data.vegan ?
                    <View style={styles.rightContainer}>
                        <Image
                            style={styles.glutenFree}
                            source={{
                                uri: vegan,
                            }}
                        />
                    </View>
                :
                    <Text style={{height: '48px'}}></Text>
                }
                </View>
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
                        setModalVisible(!modalVisible)
                    }}
                    title="Detalles"
                ></Button>
                <Text style={{marginBottom: '2rem'}}></Text>
                </>
            :
                <>
                <Text style={{color: '#fff', marginBottom: 5}}>{data.title}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.leftContainer}>
                        <Button
                            onPress={ async () => {
                                let aux = menu
                                let nuevoPlato = await detalles(data.id)
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
                    </View>
                    <Text style={{marginHorizontal: 5}}></Text>
                    <View style={styles.rightContainer}>
                        <Button
                            onPress={async () => {
                                let nuevoPlato = []
                                nuevoPlato = await detalles(data.id)
                                setData1(nuevoPlato)
                                console.log(data1)

                                setModalVisible(!modalVisible)
                            }}
                            title="Detalles"
                        ></Button>
                    </View>
                </View>
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
        placeSelf: 'center'
    },

    caracteristicas: {
        color: '#fff',
    },

    glutenFree: {
        height: '3rem',
        width: '3rem',
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
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },

    buttonClose: {
        backgroundColor: "#2196F3",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    imageContainer:{
        flexDirection: 'row',
        height: 54
    },
    
    buttonContainer:{
        flexDirection: 'row',
        height: 35
    },

    leftContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
        
    rightContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
  });