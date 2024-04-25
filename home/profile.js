import React, { useState, useCallback } from 'react';
import {
    Text, TouchableOpacity, View, Image, TextInput, StyleSheet, Switch, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions, Alert
} from 'react-native';
import {
    Ionicons, MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { thisiswhat, whatisthis } from "./convertisseur";
import { picts, routx } from "../utilitis";
import { Tirhaka } from '../database/database';

const tirhaka = Tirhaka.getTirhaka();


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Profile({ navigation }) {
    const [token, setToken] = useState();

    const [address, setAddress] = useState();
    const [nom, setNom] = useState();
    const [phone, setPhone] = useState();
    const [id, setId] = useState();

    const [addressa, setAddressa] = useState();
    const [name, setName] = useState();
    const [call, setCall] = useState();
    const [touched, setTouched] = useState(false);


    const [foca, setFoca] = useState(false);
    const [focb, setFocb] = useState(false);
    const [focdv, setFocdv] = useState(false);
    const [focdq, setFocdq] = useState(false);



    const [ShowComment, setModelComment] = useState(false);
    const [animateModal, setanimateModal] = useState(false);

    const [focpo, setFocpo] = useState(false);
    const [focp, setFocp] = useState(false);
    const [focpn, setFocpn] = useState(false);
    const [secure, setSecure] = useState(true)

    const [passwordo, setPasswordo] = useState();
    const [password, setPassword] = useState(); // the respone from the backenn on success should be No
    const [passwordn, setPasswordn] = useState();

    const [isloading, setIsloading] = useState(false);
    const [isloadingp, setIsloadingp] = useState(false);
    const [autoryzed, setautoryzed] = useState();



    useFocusEffect(
        useCallback(() => {
            setIsloading(true);
            setTouched(true);
            tirhaka.transaction(function (txn) {
                txn.executeSql(
                    "SELECT * FROM institut_tirhaka WHERE id ='1'",
                    [],
                    (tx, results) => {
                        if (results.rows.length == 1) {
                            setToken(results.rows._array[0].token);
                            Converta(results.rows._array[0].token);
                        } else {
                            navigation.navigate("Connexion");
                        }
                    }
                );

            });

        }, [])
    );

    async function Log_Me_Out() {
        Alert.alert(
            "Deconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter?",
            [
                {
                    text: 'Non',
                    onPress: () => console.log('Non pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Oui',
                    onPress: async () => {
                        try {
                            // Check if oneci is properly initialized
                            if (!tirhaka) {
                                console.error("oneci database is not initialized.");
                                return;
                            }

                            await tirhaka.transaction(async (txn) => {
                                console.log("in transaction");
                                await txn.executeSql(
                                    'DROP TABLE IF EXISTS institut_tirhaka',
                                    [],
                                    () => {
                                        console.log("in droped");
                                    },
                                    (_, error) => {
                                        console.error("Error dropping table:", error);
                                    }
                                );

                                await txn.executeSql(
                                    "CREATE TABLE IF NOT EXISTS institut_tirhaka(id INTEGER PRIMARY KEY AUTOINCREMENT, token VARCHAR(1000))",
                                    [],
                                    () => {
                                        console.log("Deleted table 'institut_tirhaka' and created a new one.");
                                        setToken(""); // Assuming setToken is a function to update token state
                                        navigation.navigate("Connexion");
                                    },
                                    (_, error) => {
                                        console.error("Error creating table:", error);
                                    }
                                );
                            });
                        } catch (error) {
                            console.error("Error executing transaction:", error);
                        }
                    },
                },
            ]
        );
    };










    function Converta(toka) {
        const user = thisiswhat(`${toka}`).split("°");
        //console.log(user);
        setId(user[0]);
        setAddress(user[6]);
        setNom(user[1]);
        setPhone(user[3]);

        setAddressa(user[6]);
        setName(user[1]);
        setCall(user[3]);
        setautoryzed(user[4] == "true" ? true : false);
        setIsloading(false);
        setTouched(false);
    };

    function Update_Pass() {
        setIsloadingp(true);

        if (passwordn === password && password != undefined && password !== passwordo) {
            const passwors = {
                oldpassword: passwordo,
                motdepass: password
            };

            axios.put(`${routx.Baseurl}/people/passwordupdate/${id}`, passwors).then((ddd) => {
                if (ddd.data.wrong === "ok") {
                    setPassword();
                    setPasswordn();
                    setPasswordo();
                    setIsloadingp(false);
                    setModelComment(false);
                    Log_Me_Out();
                } else {
                    Alert.alert("Actuel Réjété!", "Veillez saisir votre mot de passe Actuel");
                    setIsloadingp(false);

                }
            }).catch((rr) => {
                setIsloadingp(false);
                Alert.alert("Échec d'operation", "Désolé ! j'ai pas pu effectuer la modification, Veillez reessayer");

                console.log("errorinfor", rr)
            })

        } else if (password === passwordo) {
            setPassword();
            setPasswordn();
            setIsloadingp(false);
            setIsloading(false);
            Alert.alert("Même passe", "Le nouveau mot de passe est pareil que l'ancien");

        } else {
            setPassword();
            setPasswordn();
            setIsloadingp(false);
            setIsloading(false);
            Alert.alert("Non Correspondance", "Veillez repeter le même mot de passe dans le chemp de REPEPTEZ");
        }
    }

    function Update_user() {
        setIsloading(true);
        const toUpdate = {
            address: addressa,
            nom: name,
            phone: call,
        };

        const token = `${id}°${addressa}°${name}°${call}°${autoryzed}`;

        axios.put(`${routx.Baseurl}/people/personupdate/${id}`, toUpdate)
            .then(() => {
                tirhaka.transaction((txn) => {
                    txn.executeSql(
                        'UPDATE institut_tirhaka SET token=? WHERE id=?',
                        [token, "1"],
                        (tx, results) => {
                            if (results.rowsAffected > 0) {
                                setAddress(addressa);
                                setNom(name);
                                setPhone(call);
                            } else {
                                Log_Me_Out();
                                console.log("An error occurred while updating token.");
                            }
                        },
                        (_, error) => {
                            console.error("Error executing SQL:", error);
                            Log_Me_Out();
                        }
                    );
                });
                setIsloading(false);
                setTouched(false);
            })
            .catch((error) => {
                setIsloading(false);
                console.error("Error updating user:", error);
            });
    }




    return (
        <LinearGradient style={hilai.container}
            colors={["#007fbb", "#00b395", "#28094d", "#28094d", "#f0687c"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 1, y: 0.2 }}
        >
            <StatusBar animated={true} style="light" backgroundColor="transparent" />
            <View style={{ height: HEIGHT, width: WIDTH, position: 'absolute', backgroundColor: '#2a2d31', opacity: 0.5 }}>
            </View>
            <View style={{ height: Platform.OS === 'ios' ? "5%" : "7%" }}></View>

            <LinearGradient
                style={
                    {
                        alignItems: 'center',
                        width: 45,
                        top: "7%",
                        left: 10,
                        justifyContent: "center",
                        position: "absolute",
                        elevation: 8,
                        zIndex: 5,
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
                        width: "100%",
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: "center"
                    }}
                    onPress={() => navigation.goBack()}>

                    <MaterialCommunityIcons name="arrow-left" size={25} style={{ color: '#fff', elevation: 9 }} />
                </TouchableOpacity>
            </LinearGradient>


            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>

                    <LinearGradient
                        style={{
                            alignSelf: "center",
                            justifyContent: 'center',
                            height: 70,
                            width: 70,
                            padding: 2,
                            overflow: "hidden",
                            borderRadius: 50
                        }}
                        colors={["#00b395", "#28094d", "#f0687c"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Image
                            source={picts.avatar}
                            style={{
                                width: "100%",
                                height: "100%",
                            }} />
                    </LinearGradient>



                    <Text style={{ height: 50 }}>{ }</Text>
                    <Text style={{ color: "#007fbb", fontSize: 15, letterSpacing: 5 }}>Mes informations</Text>
                    <Text style={{ height: 30 }}>{ }</Text>

                    <View style={{
                        height: "auto",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 11,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: "5%",


                    }}>


                        <View style={hilai.inpuCon}>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 3, borderRadius: 10, backgroundColor: "#ccc", alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
                                <Ionicons style={{}} name="person-outline" size={20} color={'#800080'} />
                            </View>

                            <View style={{
                                width: "87%",
                                height: 50,
                                borderBottomWidth: 1,

                                borderBottomColor: foca ? '#3526AF' : '#aaa',
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end"
                            }}>
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        color: '#aaa',
                                        width: "90%",
                                        paddingBottom: 5
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFoca(true)}
                                    placeholder={"Nom"}
                                    value={name}
                                    onEndEditing={() => {
                                        setFoca(false);
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }}
                                    onChangeText={text => {
                                        setName(text);
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }
                                    }
                                />
                                <MaterialIcons name="edit" size={20} color={foca ? '#3526AF' : '#aaa'} style={{ paddingBottom: 8 }} />
                            </View>
                        </View>



                        <View style={hilai.inpuCon}>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 3, borderRadius: 10, backgroundColor: "#ccc", alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
                            <Ionicons style={{}} name="call-outline" size={20} color={'#3526AF'} />
                            </View>

                            <View style={{
                                width: "87%",
                                height: 50,
                                borderBottomWidth: 1,

                                borderBottomColor: foca ? '#3526AF' : '#aaa',
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end"
                            }}>
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        color: '#aaa',
                                        width: "90%",
                                        paddingBottom: 5
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFoca(true)}
                                    placeholder={"0554000000"}
                                    value={call}
                                    onEndEditing={() => {
                                        setFoca(false);
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }} onChangeText={text => {
                                        setCall(text)
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }
                                    }
                                />
                                <MaterialIcons name="edit" size={20} color={foca ? '#3526AF' : '#aaa'} style={{ paddingBottom: 8 }} />
                            </View>
                        </View>



                        <View style={hilai.inpuCon}>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 3, borderRadius: 10, backgroundColor: "#ccc", alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
                            <Ionicons style={{}} name="home-outline" size={20} color={'#800080'} />
                            </View>

                            <View style={{
                                width: "87%",
                                height: 50,
                                borderBottomWidth: 1,
                                borderBottomColor: focdv ? '#3526AF' : '#aaa',
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end"
                            }}>
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        color: '#aaa',
                                        width: "90%",
                                        paddingBottom: 5
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFocdq(true)}
                                    placeholder={"Votre address"}
                                    value={addressa}
                                    onEndEditing={() => {
                                        setFocdq(false);
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }}
                                    onChangeText={text => {
                                        setAddressa(text)
                                        if (nom !== name | address !== addressa | phone !== call) {
                                            setTouched(true);
                                        } else {
                                            setTouched(false);
                                        }
                                    }}
                                />
                                <MaterialIcons name="edit" size={20} color={focdq ? '#800080' : '#aaa'} style={{ paddingBottom: 8 }} />

                            </View>
                        </View>

                        <View style={{ height: 17 }}></View>

                    </View>

                    <View style={{ height: 10 }}></View>

                    {touched &&
                        <TouchableOpacity style={{
                            borderRadius: 5,
                            backgroundColor: '#007fbb',
                            width: "90%",
                            height: "8%",
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }} onPress={() => Update_user()}>
                            {isloading ?
                                <View style={{ height: 70, width: 70, overflow: "hidden", borderRadius: 20 }}>
                                    <Image
                                        source={picts.loadingd}
                                        resizeMode="contain"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            alignSelf: 'center'
                                        }}
                                    />
                                </View>

                                :
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Modifier</Text>
                            }
                        </TouchableOpacity>
                    }
                </KeyboardAvoidingView>


                <View style={{ height: 30 }}></View>
                <Text style={{ color: "#007fbb", fontSize: 15, letterSpacing: 5 }}>Statuts {"&"} Confidentialité</Text>
                <View style={{ height: 20 }}></View>

                <TouchableOpacity style={{
                    height: 50,
                    width: "100%",
                    backgroundColor: "#eee",
                    borderRadius: 11,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: "2%",
                    justifyContent: "space-between"
                }} onPress={() => setModelComment(true)}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ padding: 3, borderRadius: 10, backgroundColor: "#ccc" }}>
                            <Ionicons name="key-outline" size={25} color={'#104E9E'} />
                        </View>
                        <View style={{ width: "2%" }}>
                        </View>


                        <Text style={{ fontSize: 18, color: "#aaa" }}>Changer de mot de passe</Text>
                    </View>

                    {ShowComment ?
                        <Ionicons name="chevron-up" size={20} style={{ color: "#104E9E" }} />
                        :
                        <Ionicons name="chevron-down" size={20} style={{ color: "#104E9E" }} />
                    }

                </TouchableOpacity>
                {autoryzed !== undefined &&
                    <>
                        <View style={{ height: 10 }}></View>

                        <View style={{
                            height: 50,
                            width: "100%",
                            backgroundColor: "#eee",
                            borderRadius: 11,
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: "2%",
                            justifyContent: "space-between"
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                {autoryzed ? <View style={{ padding: 5, borderRadius: 10, backgroundColor: "green" }}>
                                    <MaterialIcons name="security" size={20} style={{ color: "#fff" }} />
                                </View>
                                    :
                                    <View style={{ padding: 5, borderRadius: 10, backgroundColor: "#000150" }}>
                                        <MaterialIcons name="security" size={20} style={{ color: "#fff" }} />
                                    </View>
                                }

                                <Text style={{ width: 10 }}>{" "}</Text>

                                <Text style={{ fontSize: 18, color: "#aaa" }}>{autoryzed ? "Autorisé" : "Désactivé"}</Text>
                            </View>

                            <Switch
                                trackColor={{ false: 'red', true: 'green' }}
                                ios_backgroundColor='#000150'
                                disabled
                                value={autoryzed}
                            />
                        </View>
                    </>

                }



                <View style={{ height: 50 }}></View>

                <TouchableOpacity style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "#eee",
                    borderRadius: 11,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: "2%",
                    justifyContent: "space-between"
                }} onPress={() => Log_Me_Out()}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ padding: 3, borderRadius: 10, backgroundColor: "#ccc" }}>
                            <Ionicons name="power-outline" size={25} color={'#104E9E'} />
                        </View>
                        <Text style={{ width: 10 }}>{" "}</Text>
                        <Text style={{ fontSize: 18, color: "#aaa" }}>Fermer la session</Text>
                    </View>
                    <Ionicons name="log-out-outline" size={20} style={{ color: "red" }} />
                </TouchableOpacity>
                <View style={{ height: 120 }}></View>
            </ScrollView>







            <SwipeUpDownModal
                modalVisible={ShowComment}
                PressToanimate={animateModal}
                ContentModal={
                    <View style={hilai.innamodal}>

                        <View style={{
                            height: "auto",
                            width: "100%",
                            paddingVertical: "3%",
                            backgroundColor: "#fff",
                            borderRadius: 11,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 5
                        }}>

                            <View style={hilai.inpuConr}>
                                <Ionicons style={hilai.iconslr} name="key-outline" size={20} color={focpo ? '#3526AF' : '#aaa'} />
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        width: "100%",
                                        height: 60,
                                        borderBottomWidth: 1,
                                        alignSelf: 'flex-start',
                                        paddingLeft: 30,
                                        paddingRight: 25,
                                        color: '#aaa',
                                        borderBottomColor: focpo ? '#3526AF' : '#aaa'
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFocpo(true)}
                                    placeholder={"Entrer l'ancien mot de passe"}
                                    value={passwordo}
                                    secureTextEntry={secure}
                                    onEndEditing={() => setFocpo(false)}
                                    onChangeText={text => setPasswordo(text)}
                                />
                                {<Ionicons name={secure ? "eye-off" : "eye"} size={20} color={focpo ? '#3526AF' : '#aaa'} style={hilai.iconsr} onPress={() => setSecure(s => !s)} />}

                            </View>
                            <Text style={{ color: "#104E9E", alignSelf: "flex-start" }}>Ancien mot de passe</Text>


                            <View style={hilai.inpuConr}>
                                <Ionicons style={hilai.iconslr} name="key-outline" size={20} color={focp ? '#3526AF' : '#aaa'} />
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        width: "100%",
                                        height: 60,
                                        borderBottomWidth: 1,
                                        alignSelf: 'flex-start',
                                        paddingLeft: 30,
                                        paddingRight: 25,
                                        color: '#aaa',
                                        borderBottomColor: focp ? '#3526AF' : '#aaa'
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFocp(false)}
                                    placeholder={"mot de passe"}
                                    value={password}
                                    secureTextEntry={secure}
                                    onEndEditing={() => setFocp(false)}
                                    onChangeText={text => setPassword(text)}
                                />
                                {<Ionicons name={secure ? "eye-off" : "eye"} size={20} color={focp ? '#3526AF' : '#aaa'} style={hilai.iconsr} onPress={() => setSecure(s => !s)} />}
                            </View>
                            <Text style={{ color: "#104E9E", alignSelf: "flex-start" }}>Entrer nouveau mot de passe</Text>


                            <View style={hilai.inpuConr}>
                                <Ionicons style={hilai.iconslr} name="key-outline" size={20} color={focpn ? '#3526AF' : '#aaa'} />
                                <TextInput
                                    style={{
                                        fontSize: 18,
                                        width: "100%",
                                        height: 60,
                                        borderBottomWidth: 1,
                                        alignSelf: 'flex-start',
                                        paddingLeft: 30,
                                        paddingRight: 25,
                                        color: '#aaa',
                                        borderBottomColor: focpn ? '#3526AF' : '#aaa'
                                    }}
                                    placeholderTextColor={'#aaa'}
                                    onResponderStart={() => setFocpn(true)}
                                    placeholder={"Répétez"}
                                    value={passwordn}
                                    secureTextEntry={secure}
                                    onEndEditing={() => setFocpn(false)}
                                    onChangeText={text => setPasswordn(text)}
                                />
                                {<Ionicons name={secure ? "eye-off" : "eye"} size={20} color={focpn ? '#3526AF' : '#aaa'} style={hilai.iconsr} onPress={() => setSecure(s => !s)} />}
                            </View>
                            <Text style={{ color: "#104E9E", alignSelf: "flex-start" }}>Répétez le mot de passe</Text>

                        </View>


                        <TouchableOpacity style={[hilai.createxr, { borderRadius: 5 }]} onPress={() => Update_Pass()}>
                            {isloadingp ? <ActivityIndicator
                                visible={isloadingp}
                                color="#fff"
                            />
                                :
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Valider</Text>
                            }
                        </TouchableOpacity>

                    </View>
                }
                HeaderStyle={hilai.headerContent}
                ContentModalStyle={{
                    backgroundColor: "#fff",
                    marginTop: "25%",
                    borderTopEndRadius: 30,
                    borderTopStartRadius: 30
                }}
                HeaderContent={
                    <TouchableOpacity style={hilai.containerHeader} onPress={() => setanimateModal(true)}>
                        <TouchableOpacity style={hilai.motionScrol}>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
                onClose={() => {
                    setModelComment(false);
                    setanimateModal(false);

                }}
            />
        </LinearGradient>

    )

};


const hilai = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
        paddingHorizontal: "5%"
    },
    inpuConr: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: "flex-start",
        width: "100%"
    },

    inpuCon: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: "flex-start",
        width: "100%"
    },

    iconsl: {
        position: "absolute",
    },
    icons: {
        right: 20,

    },

    createx: {
        backgroundColor: '#3526AF',
        width: "30%",
        height: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },


    iconslr: {
        position: "absolute",
    },
    iconsr: {
        right: 20,

    },

    innamodal: {
        flex: 1,
        marginTop: 15,
        paddingHorizontal: 10,
        overflow: 'scroll',
        alignItems: 'center'
    },
    containerHeader: {
        flex: 1,
        height: 50,
        width: "100%",
        alignSelf: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerContent: {
    },
    motionScrol: {
        backgroundColor: '#AAA',
        height: 5,
        borderRadius: 5,
        width: 70,
    },

    createxr: {
        backgroundColor: '#3526AF',
        width: "30%",
        height: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
})
