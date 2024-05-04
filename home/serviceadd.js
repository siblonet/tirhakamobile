import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ServiceAdd = ({ navigation, route }) => {
    //const {  } = route.params;
    const [servicetype, setServicetype] = useState();
    const [servicename, setServicename] = useState();

    const [sending, setSending] = useState(false);
    const [added, setAdded] = useState(false);
    const [senderro, setSenderro] = useState(false);
    const [selectedser, setSelectedser] = useState("false");
    const [service, setService] = useState([]);



    useFocusEffect(
        useCallback(() => {


        }, [])
    );



    const CreateService = () => {
        if (servicetype && service.length > 0) {

            setSending(true);
            setSenderro(false)
            setAdded(false);
            const service_data = {
                services: service,
                servicetype: servicetype,
                availability: true,
            };


            axios.post(`${routx.Baseurl}tirhakaservicecreation`, service_data).then((ddd) => {
                setSending(false);
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                }, 4000);
            }).catch((error) => {
                setSending(false);
                setSenderro(true);
                console.log(error);
            });
        }
    };


    const AjouterService = () => {
        if (service.length > 0) {
            setSending(true);
            setSenderro(false)
            setAdded(false);
            const service_data = service;
            axios.put(`${routx.Baseurl}tirhakaserviceadd/tirhakaservicespdate/${servicetype}`, service_data).then((ddd) => {
                setSending(false);
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                }, 4000);
            }).catch((error) => {
                setSending(false);
                setSenderro(true);
                console.log(error);
            });
        }

    };


    const removeItem = (serviceNameToRemove) => {
        // Filter out the item with the specified serviceNameToRemove
        const updatedService = service.filter(serv => serv.service !== serviceNameToRemove);

        // Update the state with the filtered array
        setService(updatedService);
    };



    return (
        <View style={hilai.container}>
            <StatusBar animated={true} style="dark" backgroundColor="transparent" />

            <TouchableOpacity style={{
                alignItems: 'center',
                height: 30,
                width: 45,
                justifyContent: "center",
                position: "absolute",
                marginHorizontal: 10,
                marginVertical: 30,
                zIndex: 9999,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 1,
                shadowColor: '#aaa',
            }} onPress={() => navigation.goBack()}>
                <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "#fff", opacity: 1, borderRadius: 10, elevation: 3 }}>

                </View>
                <MaterialCommunityIcons name="arrow-left" size={25} style={{ color: '#007fbb', elevation: 4 }} />

            </TouchableOpacity>

            {added &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 40,
                        zIndex: 9999,
                        alignSelf: "center"

                    }
                }>
                    <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "green", opacity: 0.3, borderRadius: 10 }}>

                    </View>
                    <Text style={{ fontSize: 15, color: "green", fontWeight: "bold" }}>Service ajouté</Text>

                </View>
            }

            {senderro &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 40,
                        zIndex: 9999,
                        alignSelf: "center"

                    }
                }>
                    <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "red", opacity: 0.3, borderRadius: 10 }}>

                    </View>
                    <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>Service non ajouté</Text>

                </View>
            }

            <View style={{ height: 70 }}></View>


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    paddingHorizontal: 27,

                }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    height: 700,
                }}>

                    <View style={{ height: 10 }}></View>

                    <View style={
                        {
                            alignItems: 'center',
                            width: "100%",
                            height: 150,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            overflow: "hidden",
                            justifyContent: "center",

                        }
                    }>

                        <LinearGradient
                            style={
                                {
                                    width: "100%",
                                    borderTopEndRadius: 10,
                                    borderBottomEndRadius: 10,
                                    overflow: "hidden"
                                }
                            }
                            colors={["green", "#6fcaea"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0.5, y: 1.3 }}
                        >

                            <View style={{
                                width: "100%",
                                height: "100%",
                                alignSelf: 'center',
                                padding: 15
                            }}>
                                < MaterialCommunityIcons name="image-edit-outline" size={50} color={"#99e6ae"} />
                            </View>

                        </LinearGradient>

                    </View>

                    <View style={{ height: 10 }}></View>
                    <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Détails du service</Text>
                    <View style={{ height: 10 }}></View>


                    <View style={{ height: 70, width: "100%" }}>

                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Selectionnez le type de Service: </Text>
                        <View style={{ backgroundColor: "transparent", padding: 5, borderRadius: 10, flexDirection: "row" }}>
                            <TouchableOpacity style={{
                                height: 30,
                                elevation: 2,
                                paddingHorizontal: 10,
                                backgroundColor: selectedser === "SALON" ? '#009de0' : "#eee",
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: "center"
                            }} onPress={() => { setServicetype("SALON"); setSelectedser('SALON') }}>
                                <Text style={
                                    {
                                        fontSize: 10,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: selectedser === "SALON" ? '#fff' : "#333",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>Au Salon</Text>
                            </TouchableOpacity>

                            <View style={{ width: 20 }}></View>

                            <TouchableOpacity style={{
                                height: 30,
                                elevation: 2,
                                paddingHorizontal: 10,
                                backgroundColor: selectedser === "DOMICILE" ? '#009de0' : "#eee",
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: "center"
                            }} onPress={() => { setServicetype("DOMICILE"); setSelectedser('DOMICILE') }}>
                                <Text style={
                                    {
                                        fontSize: 10,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: selectedser === "DOMICILE" ? '#fff' : "#333",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>à Domicile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 10 }}></View>

                    <View style={{ height: 110, width: "100%" }}>
                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Nom du Service: </Text>
                        <View

                            style={{
                                backgroundColor: "transparent",
                                padding: 5,
                                borderRadius: 10,
                                flexDirection: "row"
                            }}
                        >
                            {service.length > 0 && service.map((serv, index) => {
                                return (

                                    <TouchableOpacity key={index} style={{
                                        height: 30,
                                        elevation: 2,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#009de0',
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }} onPress={() => removeItem(serv.service)}>
                                        <Text style={
                                            {
                                                fontSize: 10,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#fff",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>{serv.service}</Text>
                                    </TouchableOpacity>

                                );
                            })}
                        </View>

                        <View style={{ backgroundColor: "#eee", padding: 5, borderRadius: 10, height: 40 }}>
                            <TextInput style={{
                                fontSize: 15,
                                width: "100%",
                                color: '#333'
                            }}

                                placeholderTextColor={'#aaa'}
                                placeholder={"Entrez ici le nom du service"}
                                value={servicename}
                                onChangeText={text => setServicename(text)}
                            />
                        </View>
                    </View>


                    <LinearGradient
                        style={
                            {
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                borderRadius: 8,
                                width: "20%",
                                height: 30
                            }
                        }
                        colors={["#6fcaea", "#99e6ae"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5

                            }}
                            onPress={() => {
                                setService([...service, {
                                    service: servicename,
                                    availability: true,
                                    price: 100,
                                }]); setServicename()
                            }}
                        >
                            <Text style={{ fontSize: 14, color: "#000" }}>
                                Plus +
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>


                    <View style={{ height: 10 }}></View>

                    {service.length > 0 &&

                        <View style={{
                            justifyContent: "space-between",
                            backgroundColor: "#fff",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%",
                            paddingHorizontal: 2,
                            height: 40

                        }}>
                            <LinearGradient
                                style={
                                    {
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 1,
                                        shadowColor: '#ccc',
                                        elevation: 5,
                                        borderRadius: 8,
                                    }
                                }
                                colors={["#6fcaea", "#99e6ae"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1.5, y: 1 }}
                            >
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5

                                    }}
                                    onPress={() => CreateService()}
                                >
                                    {sending &&
                                        <ActivityIndicator
                                            visible={sending}
                                            color="#000"
                                        />
                                    }

                                    {!sending && !senderro &&
                                        <Text style={{ fontSize: 14, color: "#000" }}>
                                            Créer un type
                                        </Text>
                                    }

                                    {senderro &&
                                        <Ionicons name="refresh-outline" size={20} color={"#333"} />

                                    }
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient
                                style={
                                    {
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 1,
                                        shadowColor: '#ccc',
                                        elevation: 5,
                                        borderRadius: 8,
                                    }
                                }
                                colors={["#6fcaea", "#99e6ae"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1.5, y: 1 }}
                            >
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5

                                    }}
                                    onPress={() => AjouterService()}
                                >
                                    {sending &&
                                        <ActivityIndicator
                                            visible={sending}
                                            color="#000"
                                        />
                                    }

                                    {!sending && !senderro &&
                                        <Text style={{ fontSize: 14, color: "#000" }}>
                                            Ajouter Service
                                        </Text>
                                    }

                                    {senderro &&
                                        <Ionicons name="refresh-outline" size={20} color={"#333"} />

                                    }
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    }

                    <View style={{ height: 200 }}></View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    )
}

const hilai = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: HEIGHT,
        overflow: 'scroll'
    },


    containerSc: {
        paddingHorizontal: "0%",
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: "#FFF",
        paddingTop: 15,
        flex: 1,

    }
});


export default ServiceAdd;

/**
 * 
 *   <View style={{ height: 40, width: "100%" }}>
                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Selectionnez le type de Service: </Text>

                        <View style={{ backgroundColor: "transparent", padding: 5, borderRadius: 10, flexDirection: "row" }}>
                            <TouchableOpacity style={{
                                height: 30,
                                elevation: 2,
                                paddingHorizontal: 10,
                                backgroundColor: selectedser === "SALON" ? '#009de0' : "#eee",
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: "center"
                            }} onPress={() => { setServicetype("SALON"); setSelectedser('SALON') }}>
                                <Text style={
                                    {
                                        fontSize: 10,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: selectedser === "SALON" ? '#fff' : "#333",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>Au Salon</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>

                            <TouchableOpacity style={{
                                height: 30,
                                elevation: 2,
                                paddingHorizontal: 10,
                                backgroundColor: selectedser === "DOMICILE" ? '#009de0' : "#eee",
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: "center"
                            }} onPress={() => { setServicetype("DOMICILE"); setSelectedser('DOMICILE') }}>
                                <Text style={
                                    {
                                        fontSize: 10,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: selectedser === "DOMICILE" ? '#fff' : "#333",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>à Domicile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 30 }}></View>


                    <View style={{ height: 40, width: "100%" }}>
                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Nom du Service: </Text>
                        <View

                            style={{
                                backgroundColor: "transparent",
                                padding: 5,
                                borderRadius: 10,
                                flexDirection: "row"
                            }}
                        >
                            {service.length > 0 && service.map((serv, index) => {
                                return (

                                    <TouchableOpacity key={index} style={{
                                        height: 30,
                                        elevation: 2,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#009de0',
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }} onPress={() => console.log("")}>
                                        <Text style={
                                            {
                                                fontSize: 10,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#fff",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>{serv.service}</Text>
                                    </TouchableOpacity>

                                );
                            })}
                        </View>

                        <View style={{ backgroundColor: "#eee", padding: 5, borderRadius: 10 }}>
                            <TextInput style={{
                                fontSize: 15,
                                width: "100%",
                                color: '#333'
                            }}

                                placeholderTextColor={'#aaa'}
                                placeholder={"Entrez ici le nom du service"}
                                value={servicename}
                                onChangeText={text => setServicename(text)}
                            />
                        </View>
                    </View>




 * 
 * 
 * 
 * <LinearGradient
                        style={
                            {
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                borderRadius: 8,
                                width: "20%"
                            }
                        }
                        colors={["#6fcaea", "#99e6ae"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5

                            }}
                            onPress={() => setService([...service, {
                                service: servicename,
                                availability: true,
                                price: 100,
                            }])}
                        >
                            <Text style={{ fontSize: 14, color: "#000" }}>
                                Plus
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 55 }}></View>

                    {service.length > 0 &&

                        <View style={{
                            justifyContent: "space-between",
                            backgroundColor: "#fff",
                            width: '100%',
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%",
                            paddingHorizontal: 2

                        }}>
                            <LinearGradient
                                style={
                                    {
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 1,
                                        shadowColor: '#ccc',
                                        elevation: 5,
                                        borderRadius: 8,
                                    }
                                }
                                colors={["#6fcaea", "#99e6ae"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1.5, y: 1 }}
                            >
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5

                                    }}
                                    onPress={() => CreateService()}
                                >
                                    {sending &&
                                        <ActivityIndicator
                                            visible={sending}
                                            color="#000"
                                        />
                                    }

                                    {!sending && !senderro &&
                                        <Text style={{ fontSize: 14, color: "#000" }}>
                                            Créer un type
                                        </Text>
                                    }

                                    {senderro &&
                                        <Ionicons name="refresh-outline" size={20} color={"#333"} />

                                    }
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient
                                style={
                                    {
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 1,
                                        shadowColor: '#ccc',
                                        elevation: 5,
                                        borderRadius: 8,
                                    }
                                }
                                colors={["#6fcaea", "#99e6ae"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1.5, y: 1 }}
                            >
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5

                                    }}
                                    onPress={() => AjouterService()}
                                >
                                    {sending &&
                                        <ActivityIndicator
                                            visible={sending}
                                            color="#000"
                                        />
                                    }

                                    {!sending && !senderro &&
                                        <Text style={{ fontSize: 14, color: "#000" }}>
                                            Ajouter Service
                                        </Text>
                                    }

                                    {senderro &&
                                        <Ionicons name="refresh-outline" size={20} color={"#333"} />

                                    }
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    }
 */