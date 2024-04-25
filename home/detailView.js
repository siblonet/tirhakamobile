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

const ViewOrder = ({ navigation, route }) => {
    const { all, user_id } = route.params;
    const [order, setOrder] = useState(all); // readonly
    const [scrip, setScript] = useState(); // readonly
    const deliveryStatus = all.statut === "done" ? "Livré" : all.statut == "waiting" ? "En attente" : all.statut === "En cours" ? "En cours" : "Échoué";

    const [done, setDone] = useState(false);
    const [onway, setOnway] = useState(false);
    const [review, setReview] = useState(false);
    const [fail, setFail] = useState(false);
    const [chanerro, setChanerro] = useState(false);
    const [sending, setSending] = useState(false);
    const [retiro, setRetiro] = useState(false);
    const [chanerroa, setChanerroa] = useState(false);
    const [changerroa, setChangerro] = useState(false);

    useEffect(() => {
        //console.log(all);
        setScript();

    }, []);

    const ChangeStatos = (what, orid) => {
        setChangerro(false);
        switch (what) {
            case "done":
                setDone(true);
                break;

            case "waiting":
                setReview(true);
                break;

            case "fail":
                setFail(true);
                break;

            default:
                setOnway(true);
                break;
        };

        axios.put(`${routx.Baseurl}tirhakaappointmentstatusupdate/${orid}`, { statut: what, worker: user_id }).then(() => {

            switch (what) {
                case "done":
                    setDone(false);
                    break;

                case "waiting":
                    setReview(false);
                    break;

                case "fail":
                    setFail(false);
                    break;

                default:
                    setOnway(false);
                    break;
            }

            navigation.goBack();
        }).catch((error) => {
            console.log(error);
            switch (what) {
                case "done":
                    setDone(false);
                    break;

                case "waiting":
                    setReview(false);
                    break;

                case "fail":
                    setFail(false);
                    break;

                default:
                    setOnway(false);
                    break;
            }
            setChangerro(true);
        });
    };




    const canceleOrder = (oid) => {
        if (deliveryStatus !== "Livré") {
            Alert.alert(
                "Annullé Commande",
                "Êtes-vous sûr de vouloir annuller?",
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
                            axios.delete(`${routx.Baseurl}tirhakacancelingappointment/${oid}`).then(() => {
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
        }
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

                                    <Text style={{ position: "absolute", alignSelf: "center", fontSize: 18, color: "#28094d", fontFamily: "Great_Vibes" }}>{all.services.service}</Text>
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

                            <View style={{ height: 20 }}></View>

                            <Text style={{ fontSize: 15, color: "#28094d" }}>Type de service:       {all.services.servicetype}</Text>
                            <View style={{ height: 5 }}></View>

                            <Text style={{ fontSize: 15, color: "#28094d" }}>Service:   {all.services.service}</Text>
                            <View style={{ height: 5 }}></View>

                            <Text style={{ fontSize: 15, color: "#28094d" }}>Message:      {all.message}</Text>


                        </View>

                    </View>

                    <View style={{ height: 10 }}></View>

                    <View style={{ width: "100%", height: 10, borderTopWidth: 1, borderTopColor: "#eee" }}>
                    </View>

                    <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Détails sur ces collis</Text>


                    <View style={{ height: 20 }}></View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <View style={{ borderRadius: 10, height: 40, width: "20%", alignItems: "center", justifyContent: "center", marginRight: 5 }}>
                            <View style={{ padding: 5, borderRadius: 10, height: "100%", width: "100%", position: "absolute", backgroundColor: "#eee", borderWidth: 1, borderColor: deliveryStatus === 'Livré' ? '#006b21' : deliveryStatus === 'En attente' ? '#ebc474' : deliveryStatus === 'En cours' ? '#6fcaea' : 'rgb(255, 0, 149)' }}>
                            </View>
                            <Text style={{ fontSize: 10, fontWeight: "bold", textAlign: "center" }}>{deliveryStatus}</Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#fff",
                            padding: 5,
                            borderRadius: 7,
                            elevation: 2,
                            width: '70%',
                            shadowOffset: {
                                width: 2,
                                height: 3,
                            },
                            shadowOpacity: 1,
                            shadowColor: '#ccc'
                        }}>
                            <TouchableOpacity style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                padding: 8,
                                backgroundColor: '#ebc474',
                                borderRadius: 8,
                            }} disabled={deliveryStatus == "Livré" ? true : false} onPress={() => ChangeStatos("waiting", order._id)}>
                                {review ?
                                    <ActivityIndicator
                                        visible={review}
                                        color="#fff"
                                        size={"small"}
                                    />

                                    :
                                    <Text style={{ fontSize: 10, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Atten</Text>

                                }

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                padding: 8,
                                backgroundColor: '#6fcaea',
                                borderRadius: 8,
                            }} disabled={deliveryStatus == "Livré" ? true : false} onPress={() => ChangeStatos("En cours", order._id)}>
                                {onway ?
                                    <ActivityIndicator
                                        visible={onway}
                                        color="#fff"
                                        size={"small"}
                                    />

                                    :
                                    <Text style={{ fontSize: 10, fontWeight: "bold", textAlign: "center", color: "#fff" }}>En cou</Text>

                                }

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                padding: 8,
                                backgroundColor: 'rgb(255, 0, 149)',
                                borderRadius: 8,
                            }} disabled={deliveryStatus == "Livré" ? true : false} onPress={() => ChangeStatos("fail", order._id)}>
                                {fail ?
                                    <ActivityIndicator
                                        visible={fail}
                                        color="#fff"
                                        size={"small"}
                                    />

                                    :

                                    <Text style={{ fontSize: 10, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Échèc</Text>

                                }

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 1,
                                shadowColor: '#ccc',
                                elevation: 5,
                                padding: 8,
                                backgroundColor: '#006b21',
                                borderRadius: 8,
                            }} disabled={deliveryStatus == "Livré" ? true : false} onPress={() => ChangeStatos("done", order._id)}>

                                {done ?
                                    <ActivityIndicator
                                        visible={done}
                                        color="#fff"
                                        size={"small"}
                                    />

                                    :

                                    <Text style={{ fontSize: 10, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Effectuée</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 30 }}></View>




                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Info du Client</Text>
                        <Text style={{ fontSize: 15, color: "#C0C0C0" }}>Téléphone {"&"} WS</Text>
                    </View>

                    <View style={{ height: 10 }}></View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', width: "70%", flexDirection: "row" }}>
                            <View style={{ borderRadius: 25, height: 55, width: 55, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ padding: 10, borderRadius: 25, height: "100%", width: "100%", position: "absolute", backgroundColor: "rgb(255, 0, 149)" }}>
                                </View>

                                <View style={{ height: 53, borderRadius: 25, width: 53, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>

                                    <Image
                                        source={picts.avatar}
                                        resizeMode="contain"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            alignSelf: 'center',

                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: 7 }}></View>

                            <View style={{}}>
                                <Text style={{ fontSize: 14 }}>{order.client.name}</Text>
                                <Text style={{ fontSize: 14 }}> Le {order.dete} à {order.heure}:00</Text>
                                <Text style={{ fontSize: 12, color: "red", opacity: 0.3 }}>{order.client.address} </Text>
                            </View>
                        </View>


                        <View style={{ alignItems: 'center', alignSelf: 'flex-start', width: "35%" }}>
                            <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
                                <LinearGradient
                                    style={
                                        {
                                            height: 35,
                                            width: 35,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            elevation: 8,
                                            alignSelf: "center",
                                            borderRadius: 14,
                                            shadowOffset: {
                                                width: 2,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.7,
                                            shadowColor: '#28094d',
                                            zIndex: 99

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
                                        onPress={() => Linking.openURL(`tel:${order.client.phone}`)}>

                                        <Ionicons name="call" size={20} style={{ color: '#28094d' }} />
                                    </TouchableOpacity>
                                </LinearGradient>


                                <View style={{ width: 10 }}></View>


                                <TouchableOpacity style={{
                                    height: 35,
                                    width: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    elevation: 8,
                                    alignSelf: "center",
                                    borderRadius: 14,
                                    shadowOffset: {
                                        width: 2,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.7,
                                    shadowColor: '#28094d',
                                    zIndex: 99
                                }} onPress={() => Linking.openURL(`whatsapp://send?phone=225${order.client.phone}&text=Bonjour Très Cher client,n\ Votre rendez-vous est en cours, ...`)}>
                                    <View style={{ padding: 7, borderRadius: 14, height: "100%", width: "100%", position: "absolute", backgroundColor: "green", elevation: 5 }}>
                                    </View>


                                    <Ionicons name="logo-whatsapp" size={25} style={{ color: '#fff', elevation: 7 }} />

                                </TouchableOpacity>
                            </View>




                        </View>

                    </View>
                </View >

                <View style={{
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    padding: 10,
                    width: '100%',
                    alignItems: "center"

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
                        colors={["#bd177d", "red"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 18,
                                paddingVertical: 5

                            }}
                            onPress={() => canceleOrder(all._id)}
                        >
                            {sending &&
                                <ActivityIndicator
                                    visible={sending}
                                    color="#fff"
                                />
                            }

                            {!sending && !chanerro &&
                                <Text style={{ fontSize: 18, color: "#fff" }}>
                                    Annuller
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


export default ViewOrder;