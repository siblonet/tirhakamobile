import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, Text, View, Image, TouchableOpacity, Animated, TextInput, SafeAreaView, Alert, AppState } from 'react-native';
import {
    Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default function Services({ navigation, route }) {
    const { worker, type } = route.params;

    const [data, Data] = useState([]);
    const [datao, Datao] = useState([]);
    const [loading, setLoadding] = useState(true);
    const [loaderro, setLoadderro] = useState(false);


    const [typin, setTypin] = useState(type);
    const [isEmpty, setIsEmpty] = useState(false);



    useFocusEffect(
        useCallback(() => {
            axios.get(`${routx.Baseurl}tirhakaservicegetting`).then((dat) => {
                const servo = dat.data.filter(s => s.servicetype.startsWith(type, 0))
                if (servo.length !== 0) {
                    setIsEmpty(false);
                    Data(servo);
                }
                else {
                    setIsEmpty(true);
                    Data([]);
                }
                Datao(dat.data);
                setLoadding(false);
            }).catch((error) => {
                console.log(error);
                setLoadderro(true);
                setLoadding(false);
            });

        }, [])
    );




    function Chertcha(typ) {
        if (datao) {
            let a1 = datao.filter(s => s.servicetype.startsWith(typ, 0))
            if (a1.length !== 0) {
                setIsEmpty(false);
                Data(a1);
            }
            else {
                setIsEmpty(true);
                Data([]);
            }
        }

    }



    const Reloader = () => {
        setLoadderro(false);
        setLoadding(true);
        Data([]);
        Datao([]);



        axios.get(`${routx.Baseurl}tirhakaservicegetting`).then((dat) => {
            const servo = dat.data.filter(s => s.servicetype.startsWith(type, 0))
            if (servo.length !== 0) {
                setIsEmpty(false);
                Data(servo);
            }
            else {
                setIsEmpty(true);
                Data([]);
            }
            Datao(dat.data);
            setLoadding(false);
        }).catch((error) => {
            console.log(error);
            setLoadderro(true);
            setLoadding(false);
        });

    }


    return (

        <SafeAreaView style={hilai.containe}>
            <StatusBar style={"light"} />
            <View style={
                {
                    height: 150,
                    width: "100%",
                    backgroundColor: "#000",
                    overflow: "hidden",
                    opacity: 1,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25
                }
            }>

                <LinearGradient
                    //colors={["#411d49", "#48379f", "#99e6ae", "#b41578", "#ffbb28", "#ffbb28"]}
                    colors={["#411d49", "#ffbb28", "#b41578", "#99e6ae", "#009de0", "#009de0"]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.5 }}
                    style={{ height: "100%", width: "100%" }}

                >
                    <View style={{ height: 35 }}></View>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>

                        <View style={
                            {
                                height: 35,
                                width: 35,
                                backgroundColor: "#000",
                                borderRadius: 20,
                                padding: 2
                            }
                        }>
                            <Image
                                source={picts.logo}
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </View>


                        <Text style={{
                            fontSize: 28,
                            fontWeight: 400,
                            textTransform: "capitalize",
                            color: "#fff",
                            fontFamily: "Great_Vibes"
                        }}>Institut Tirhaka</Text>
                    </View>


                    <View style={
                        {
                            width: "100%",
                            paddingVertical: 7,
                            paddingHorizontal: "4%"
                        }
                    }>
                        <LinearGradient
                            style={
                                {
                                    borderRadius: 12,
                                    elevation: 5,
                                    width: "20%",
                                    zIndex: 1
                                }
                            }
                            colors={["#99e6ae", "#009de0"]}
                            start={{ x: 0.1, y: 0.2 }}
                            end={{ x: 1, y: 1.1 }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    borderRadius: 7,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    position: "relative",

                                }}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="chevron-back" size={20} style={{ color: "#fff", left: -3 }} />

                                <Text style={
                                    {
                                        fontSize: 14,
                                        color: "#fff",
                                        fontWeight: "100",
                                        fontFamily: "Great_Vibes",
                                        right: 3
                                    }
                                }>
                                    Retour
                                </Text>

                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    <View style={
                        {
                            height: 200,
                            width: "100%",
                            position: "absolute",
                            top: 48,
                            zIndex: 0
                        }
                    }>

                        <Image
                            source={picts.decora}
                            resizeMode="stretch"
                            style={{
                                width: "100%",
                                height: "100%",
                                tintColor: "yellow"
                            }}
                        />
                    </View>
                </LinearGradient>
            </View>


            <View style={
                {
                    height: 200,
                    width: "100%",
                    position: "absolute",
                    top: 48,
                    zIndex: -1
                }
            }>

                <Image
                    source={picts.decora}
                    resizeMode="stretch"
                    style={{
                        width: "100%",
                        height: "100%",
                        tintColor: "#009de0"
                    }}
                />
            </View>

            <View
                style={{
                    width: "100%",
                    paddingHorizontal: "3%"
                }}
            >

                <View style={{ height: 15 }}></View>

                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: "100%",
                    alignItems: 'center',
                    borderRadius: 10,
                    height: 40,
                    backgroundColor: '#fff',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 1,
                    shadowColor: '#201d1d',
                    alignSelf: 'center'
                }}>
                    <Ionicons
                        name='search'
                        size={25}
                        color={"#aaa"}
                        style={{
                            alignSelf: 'center',
                            zIndex: 3,
                            paddingLeft: 5,
                        }}
                    />
                    <TextInput style={{
                        paddingLeft: 12,
                        backgroundColor: 'transparent',
                        borderRadius: 10,
                        fontSize: 17,
                        height: 30,
                        width: "77%",
                        color: '#009de0',
                    }}
                        onEndEditing={() => {
                            if (typin.length < 1) {
                                setIsEmpty(false)
                                Data(datao)
                            }
                        }}
                        placeholderTextColor={'#aaa'}

                        placeholder={'Cherchez par nom ou type'}
                        value={typin} onChangeText={text => { setTypin(text), Chertcha(text) }}
                    />

                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={
                        {
                            height: 400,
                            backgroundColor: "transparent",
                            width: "100%",
                            paddingVertical: 7,
                            paddingHorizontal: "4%",
                            overflow: "scroll"
                        }
                    }>

                    <Text style={{ fontSize: 20, color: "#333", fontFamily: "Great_Vibes" }}>
                        Liste de vos différents services
                    </Text>

                    <View style={{ height: 10 }}></View>

                    {data.length < 1 &&
                        <TouchableOpacity style={{
                            height: 200,
                            width: 300,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "tranparent",
                            borderRadius: 20,
                        }} onPress={() => Reloader()}>
                            <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "#99e6ae", opacity: 0.6, borderRadius: 20 }}>

                            </View>
                            {loading ?
                                <ActivityIndicator
                                    visible={loading}
                                    color="#000"
                                    size={"large"}
                                />

                                :
                                <Ionicons
                                    name="refresh-outline"
                                    size={50}
                                    resizeMode="contain"
                                    style={{
                                        color: "#000",

                                    }}
                                />
                            }

                            {loaderro &&
                                <Text style={{ fontSize: 20, color: '#ff0000', alignSelf: "center", fontFamily: "Great_Vibes", fontWeight: "400" }}>Échec de chargement</Text>
                            }


                            {!loading && !loaderro &&
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: "400", alignSelf: "center", fontFamily: "Great_Vibes" }}>Vide (actualiser)</Text>

                            }

                        </TouchableOpacity>

                    }

                    {data.length > 0 &&

                        data.map(((service, index) => {
                            return (
                                <View key={service._id} style={
                                    {
                                        borderRadius: 12,
                                        elevation: 3,
                                        width: "97%",
                                        padding: 15,
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#fff",
                                        marginBottom: index + 1 == data.length ? 50 : 15
                                    }
                                }>
                                    <View
                                        style={{
                                            width: "100%",
                                            backgroundColor: "transparent",
                                            alignItems: "center",
                                            position: "relative",

                                        }}
                                    >


                                        <View style={
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",

                                            }
                                        }>


                                            <View style={{ alignItems: "center", justifyContent: "center", width: 35 }}>
                                                <View style={
                                                    {
                                                        width: "75%",
                                                        backgroundColor: "#bd177d",
                                                        height: 15,
                                                        bottom: -3,
                                                        opacity: 0.7,
                                                        borderRadius: 7,
                                                        alignSelf: "flex-start"
                                                    }
                                                }
                                                ></View>

                                                <Text style={{ fontSize: 18, color: "#99e6ae", fontWeight: "bold", position: "absolute", top: 0 }}>
                                                    {index + 1}
                                                </Text>
                                                <View style={
                                                    {
                                                        width: "75%",
                                                        backgroundColor: "#bd177d",
                                                        height: 15,
                                                        top: -3,
                                                        borderRadius: 7,
                                                        opacity: 0.4,
                                                        elevation: 5,
                                                        alignSelf: "flex-end"

                                                    }
                                                }
                                                ></View>

                                            </View>
                                            <View style={{ width: 20 }}></View>

                                            <Text style={{ fontSize: 15, color: "#009de0" }}>
                                                {service.servicetype === "SALON" ? "Service en presentiel" : "Service à domicile"}
                                            </Text>
                                        </View>


                                        <View style={{ height: 10 }}></View>


                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                            style={{
                                                backgroundColor: "#fff",
                                                width: '100%',
                                                height: 40,
                                            }}>
                                            {service.services.map((servic, index) => {
                                                return (
                                                    <TouchableOpacity key={servic._id} style={{
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 1,
                                                        },
                                                        height: 30,
                                                        shadowOpacity: 1,
                                                        shadowColor: '#ccc',
                                                        elevation: 2,
                                                        paddingHorizontal: 10,
                                                        backgroundColor: '#009de0',
                                                        borderRadius: 8,
                                                        marginLeft: 2,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        alignSelf: "center"
                                                    }} onPress={() => navigation.navigate("ServiceDetail", { service: servic, worker: worker, serviceid: service._id, type: type })}>

                                                        <Text style={
                                                            {
                                                                fontSize: 10,
                                                                fontWeight: "bold",
                                                                textAlign: "center",
                                                                color: "#fff",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}>{servic.service}</Text>

                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>

                                    </View>
                                </View>
                            )
                        }))}

                </ScrollView>
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
                        borderRadius: 15,
                        position: "absolute",
                        zIndex: 20,
                        bottom: 25,
                        right: 7
                    }
                }
                colors={["#6fcaea", "#99e6ae"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1.5, y: 1 }}
            >
                <TouchableOpacity
                    style={{
                        padding: 8,

                    }}
                    onPress={() => navigation.navigate("ServiceAdd")}
                >
                    <MaterialCommunityIcons name="note-edit" size={25} style={{ color: '#fff', elevation: 4 }} />
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>

    )
}

const hilai = StyleSheet.create({
    containe: {
        alignItems: "center",
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: "#eee"
    },
});