import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Linking, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";


const HEIGHT = Dimensions.get('window').height;
const ServiceDetail = ({ navigation, route }) => {
    const { service, worker, serviceid, type } = route.params;

    const [chanerro, setChanerro] = useState(false);
    const [sending, setSending] = useState(false);
    const [retiro, setRetiro] = useState(false);
    const [chanerroa, setChanerroa] = useState(false);
    const [changerroa, setChangerro] = useState(false);




    const DeleteType = (oid) => {
        Alert.alert(
            `Supprimer Service ${type}`,
            "Êtes-vous sûr de vouloir supprimer ce service?",
            [
                {
                    text: 'Non',
                    onPress: () => console.log('Non pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Oui',
                    onPress: () => {
                        setSending(true);
                        setChanerro(false);
                        axios.delete(`${routx.Baseurl}tirhakadeletingservice/${oid}`).then(() => {
                            setSending(false);
                            navigation.goBack();
                        }).catch((error) => {
                            console.log(error);
                            setSending(false);
                            setChanerro(true);
                        });
                    },
                },
            ]
        );

    };

    const DeleteService = () => {
        Alert.alert(
            `Supprimer Service ${service.service}`,
            "Êtes-vous sûr de vouloir supprimer ce service?",
            [
                {
                    text: 'Non',
                    onPress: () => console.log('Non pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Oui',
                    onPress: () => {
                        setSending(true);
                        setChanerro(false);
                        axios.delete(`${routx.Baseurl}removetirhakaserviceadd/${serviceid}/${service._id}`).then(() => {
                            setSending(false);
                            navigation.goBack();
                        }).catch((error) => {
                            console.log(error);
                            setSending(false);
                            setChanerro(true);
                        });
                    },
                },
            ]
        );

    };




    return (
        <View style={hilai.container}>
            <StatusBar animated={true} style="dark" backgroundColor="transparent" />

            <LinearGradient
                style={
                    {
                        alignItems: 'center',
                        width: 45,
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 40,
                        elevation: 8,
                        zIndex: 9999,
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 1,
                        shadowColor: '#aaa',
                        borderRadius: 10
                    }
                }
                colors={["#28094d", "#fff"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1.5, y: 1 }}
            >
                <TouchableOpacity
                    style={{

                    }}
                    onPress={() => navigation.goBack()}>

                    <MaterialCommunityIcons name="arrow-left" size={25} style={{ color: '#fff', elevation: 4 }} />
                </TouchableOpacity>
            </LinearGradient>

            {chanerro &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 45,
                        zIndex: 9999,
                        alignSelf: "center"

                    }
                }>
                    <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "red", opacity: 0.3, borderRadius: 10 }}>

                    </View>
                    <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>Échèc de l'operation</Text>

                </View>
            }

            {changerroa &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 45,
                        zIndex: 9999,
                        alignSelf: "center"

                    }
                }>
                    <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "red", opacity: 0.3, borderRadius: 10 }}>

                    </View>
                    <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>Échèc de l'operation</Text>

                </View>
            }
            {chanerroa &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 45,
                        zIndex: 9999,
                        alignSelf: "center"

                    }
                }>
                    <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "red", opacity: 0.3, borderRadius: 10 }}>

                    </View>
                    <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>Échèc de l'operation</Text>

                </View>
            }

            {retiro && !chanerro && !changerroa &&
                <View style={
                    {
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: "center",
                        position: "absolute",
                        marginHorizontal: 10,
                        marginVertical: 45,
                        zIndex: 9999,
                        alignSelf: "center",
                        backgroundColor: "#eee",
                        borderRadius: 14

                    }
                }>

                    <ActivityIndicator
                        visible={retiro}
                        color="#000"
                    />
                </View>
            }



            <ScrollView showsVerticalScrollIndicator={false} style={{
                height: 50,
                backgroundColor: "#FFF",
                paddingTop: 70,

            }}>


                <View style={
                    {
                        height: 600,
                        paddingHorizontal: "5%"
                    }
                }>
                    <View style={{ height: 15 }}></View>

                    <View style={{ width: "100%", height: 300 }}>
                        <View style={
                            {
                                alignItems: 'flex-start',
                                width: "100%",
                                backgroundColor: "#fff",
                                paddingLeft: 3
                            }
                        }>

                            <View style={
                                {
                                    alignItems: 'flex-start',
                                    width: "100%",
                                    height: 190,
                                    borderRadius: 10,
                                    overflow: "hidden"
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
                                    colors={["#99e6ae", "#6fcaea"]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 0.5, y: 1.3 }}
                                >

                                    <Text style={{ position: "absolute", alignSelf: "center", fontSize: 18, color: "#28094d", fontFamily: "Great_Vibes" }}>{service.service}</Text>
                                    <View style={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <Image
                                            source={picts.decora}
                                            resizeMode="contain"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                alignSelf: 'center',
                                                tintColor: "#D51A65"
                                            }}
                                        />
                                    </View>
                                </LinearGradient>


                            </View>

                            <View style={{ height: 30 }}></View>
                            <View style={
                                {
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: "5%"
                                }
                            }>
                                <View style={{}}>
                                    <Text style={{ fontSize: 15, color: "#28094d" }}>Type de service:</Text>
                                    <View style={{ height: 10 }}></View>

                                    <Text style={{ fontSize: 15, color: "#28094d" }}>Service:</Text>
                                    <View style={{ height: 10 }}></View>

                                    <Text style={{ fontSize: 15, color: "#28094d" }}>Disponiblité:</Text>
                                </View>

                                <View style={{}}>
                                    <Text style={{ fontSize: 15, color: "#28094d" }}>{type}</Text>
                                    <View style={{ height: 10 }}></View>

                                    <Text style={{ fontSize: 15, color: "#28094d" }}>{service.service}</Text>
                                    <View style={{ height: 10 }}></View>

                                    <Text style={{ fontSize: 15, color: "#28094d" }}>{service.availability ? "Disponible" : "Indisponible"}</Text>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>

                <View style={{
                    backgroundColor: "#fff",
                    width: '100%',
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: "5%",
                    paddingVertical: "5%"

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
                                elevation: 2,
                                borderRadius: 8,
                            }
                        }
                        colors={["red", "#bd177d"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 18,
                                paddingVertical: 5

                            }}
                            onPress={() => DeleteService(service._id)}
                        >
                            {sending &&
                                <ActivityIndicator
                                    visible={sending}
                                    color="#fff"
                                />
                            }

                            {!sending && !chanerro &&
                                <Text style={{ fontSize: 18, color: "#fff" }}>
                                    Supp Service
                                </Text>
                            }

                            {chanerro && !retiro &&
                                <Ionicons name="refresh-outline" size={20} color={"#fff"} />

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
                                elevation: 1,
                                borderRadius: 8,
                            }
                        }
                        colors={["#bd177d", "red"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 18,
                                paddingVertical: 5

                            }}
                            onPress={() => DeleteType(serviceid)}
                        >
                            {sending &&
                                <ActivityIndicator
                                    visible={sending}
                                    color="#fff"
                                />
                            }

                            {!sending && !chanerro &&
                                <Text style={{ fontSize: 18, color: "#fff" }}>
                                    Supp Type
                                </Text>
                            }

                            {chanerro && !retiro &&
                                <Ionicons name="refresh-outline" size={20} color={"#fff"} />

                            }
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </ScrollView >
        </View >

    )
}

const hilai = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: HEIGHT,
        overflow: 'scroll'
    },

});


export default ServiceDetail;