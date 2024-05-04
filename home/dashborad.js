import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Platform, ActivityIndicator, Dimensions, ScrollView, Text, View, Image, TouchableOpacity, Animated, TextInput, SafeAreaView, Alert, AppState } from 'react-native';
import {
    Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { Tirhaka } from '../database/database';
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { thisiswhat, whatisthis } from "./convertisseur";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const tirhaka = Tirhaka.getTirhaka();
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function DashBoard({ navigation }) {
    const [isloaded, setIsLoaded] = useState(false);
    const [token, setToken] = useState();
    const [pincode, setPincode] = useState('');
    const [unlock, setUnlock] = useState(false);
    const [wrong, setWrong] = useState(new Animated.Value(0));
    const [colar, setColor] = useState("#00b395");
    const [appState, setAppState] = useState(AppState.currentState);
    const [user_id, setUser_id] = useState();





    const [data, Data] = useState([]);
    const [datao, Datao] = useState([]);
    const [loading, setLoadding] = useState(false);
    const [loaderro, setLoadderro] = useState(false);


    const [typin, setTypin] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);
    const [nofound, setNofound] = useState(false);

    /**
     * 
     * const splo = token.split("°");
        //const perset = `${_id}°${name}°${role}°${phone}°${allow}°${email}°${address}`;
    
            const userid_rendez = document.getElementById("userid_rendez");
            userid_rendez.value = thisiswhat(`${splo[0]}`);
    
            const full_name = document.getElementById("full_name");
            full_name.value = thisiswhat(`${splo[1]}`);
            full_name.disabled = true;
            const phonea = document.getElementById("phone");
            phonea.value = thisiswhat(`${splo[3]}`);
            phonea.disabled = true;
            const emaila = document.getElementById("email");
            emaila.value = thisiswhat(`${splo[5]}`);
            emaila.disabled = true;
            const addressa = document.getElementById("address");
            addressa.value = thisiswhat(`${splo[6]}`);
     */

    useFocusEffect(
        useCallback(() => {
            tirhaka.transaction((txn) => {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='institut_tirhaka'",
                    [],
                    (tx, res) => {
                        if (res.rows.length === 0) {
                            txn.executeSql('DROP TABLE IF EXISTS institut_tirhaka', []);
                            txn.executeSql(
                                "CREATE TABLE IF NOT EXISTS institut_tirhaka(id INTEGER PRIMARY KEY AUTOINCREMENT, token VARCHAR(1000))",
                                [],
                                () => {
                                    setIsLoaded(false);
                                    console.log("Deleted and created table.");
                                },
                                (_, error) => {
                                    console.error("Error creating table:", error);
                                    setIsLoaded(false);
                                }
                            );
                        } else {
                            txn.executeSql(
                                "SELECT * FROM institut_tirhaka WHERE id ='1'",
                                [],
                                (tx, results) => {
                                    if (results.rows.length === 1) {
                                        setToken(results.rows._array[0].token);
                                        const user = thisiswhat(`${results.rows._array[0].token}`).split("°");
                                        setUser_id(user[0]);
                                        Reloader();
                                    } else {
                                        navigation.navigate("Connexion");

                                        setIsLoaded(false);
                                    }

                                },
                                (_, error) => {
                                    console.error("Error selecting from table:", error);
                                    setIsLoaded(false);
                                }
                            );
                        }
                    },
                    (_, error) => {
                        console.error("Error executing SQL:", error);
                        setIsLoaded(false);
                    }
                );
            });

        }, [])
    );


    useEffect(() => {
        registerForPushNotificationsAsync();
        //schedulePushNotification();
    }, []);



    async function registerForPushNotificationsAsync() {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                if (Platform.OS === 'ios') {
                    Linking.openURL();
                } else {
                    Linking.openSettings();
                }
                return;
            }

        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C'
            });
        }

        return true;
    }


    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { owner: 'Nuance', admin: "", name: "John" },
            },
            trigger: { seconds: 5 },
        });
    }







    useEffect(() => {
        if (pincode.length > 4) {
            retrieveData()
        }
    }, [pincode]);


    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            setUnlock(false);
            setPincode("");
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);




    function Chertcha(typ) {
        if (datao) {
            let a1 = datao.filter(s => s.client.phone.startsWith(typ, 0))
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



    const wrongAffect = () => {
        Animated.parallel([
            Animated.timing(wrong, {
                toValue: -20,
                duration: 100,
                useNativeDriver: false
            })
        ]).start();

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(wrong, {
                    toValue: 20,
                    duration: 100,
                    useNativeDriver: false
                })
            ]).start();
        }, 120);

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(wrong, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false
                })
            ]).start();
            setTimeout(() => {
                setPincode("");
                setColor("#00b395");
            }, 200);
        }, 230);
    };


    const retrieveData = async () => {
        const date = new Date();
        const currentMonth = date.getMonth();
        //const currentyeay = date.getFullYear();
        const yeahpermi = await SecureStore.getItemAsync('yeah');
        if (yeahpermi && currentMonth <= parseInt(yeahpermi)) {

            if (pincode.length > 4) {
                try {
                    const retrievedValue = await SecureStore.getItemAsync('tirhaka');
                    if (retrievedValue && retrievedValue == pincode) {
                        setUnlock(true)
                    } else {
                        setColor("#ff0000");
                        wrongAffect();
                    }
                } catch (error) {
                    console.log('Error retrieving data:', error);
                }
            }
        } else {
            alert('Alert expired !')
        }
    };


    const Reloader = () => {
        setLoadderro(false);
        setLoadding(true);
        Data([]);
        Datao([]);



        axios.get(`${routx.Baseurl}tirhakaappointmentgettingall`).then((dat) => {
            Data(dat.data);
            Datao(dat.data);
            setLoadding(false);
        }).catch((error) => {
            console.log(error);
            setLoadderro(true);
            setLoadding(false);
        });

    }



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
                                console.error("tirhaka database is not initialized.");
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



    return (
        <>
            {unlock ?
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

                                <TouchableOpacity style={
                                    {
                                        height: 35,
                                        width: 35,
                                        backgroundColor: "#000",
                                        borderRadius: 20,
                                        padding: 2
                                    }
                                } onPress={() => navigation.navigate("Profile")}>
                                    <Image
                                        source={picts.logo}
                                        resizeMode="contain"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </TouchableOpacity>


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
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
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
                                            width: "30%",
                                            zIndex: 1
                                        }
                                    }
                                    colors={["#ffc024", "#bd177d"]}
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
                                        onPress={() => navigation.navigate("Servcies", { worker: user_id, type: "SALON" })}
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
                                            Service Salon
                                        </Text>

                                    </TouchableOpacity>
                                </LinearGradient>


                                <LinearGradient
                                    style={
                                        {
                                            borderRadius: 12,
                                            elevation: 5,
                                            width: "37%",
                                            zIndex: 1,
                                            opacity: 0.8
                                        }
                                    }
                                    colors={["#99e6ae", "#009de0"]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
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
                                        onPress={() => navigation.navigate("Servcies", { worker: user_id, type: "DOMICILE" })}
                                    >
                                        <Text style={
                                            {
                                                fontSize: 14,
                                                color: "#D51A65",
                                                fontWeight: "100",
                                                fontFamily: "Great_Vibes",
                                            }
                                        }>
                                            Service Domicile
                                        </Text>

                                        <Ionicons name="chevron-forward" size={20} style={{ color: "#D51A65" }} />
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
                                        tintColor: "#D51A65"
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
                                tintColor: "#D51A65"
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

                                placeholder={'Cherchez avec numéro de tél'}
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
                                Listes des rendez-vous
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

                                data.map(((appoint, index) => {
                                    return (
                                        <View key={appoint._id} style={
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
                                            <TouchableOpacity
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "transparent",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: "relative",

                                                }}
                                                onPress={() =>
                                                    navigation.navigate("ViewOrder",
                                                        {
                                                            all: appoint,
                                                            user_id: user_id
                                                        })
                                                }
                                            >
                                                <View style={{
                                                    width: "100%",
                                                    backgroundColor: "transparent",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}>

                                                    <View style={
                                                        {
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
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
                                                            {appoint.services.servicetype === "SALON" ? "Au salon" : "à Domicile"}
                                                        </Text>

                                                    </View>
                                                    <Text style={{ fontSize: 15, color: "#aaaaaa", fontWeight: "bold" }}>
                                                        {appoint.client.phone}
                                                    </Text>
                                                </View>
                                                <View style={{ alignItems: "flex-start", justifyContent: "flex-start", alignSelf: "flex-start" }}>
                                                    <Text style={{ fontSize: 14, color: "#ccc", fontWeight: "400" }}>
                                                        Le {appoint.dete} à {appoint.heure}:00, à {appoint.client.address}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }))}

                        </ScrollView>
                    </View>
                </SafeAreaView>
                :
                <View style={
                    {
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#eee",
                        paddingHorizontal: "7%",
                        paddingTop: "20%",
                    }
                }>
                    <StatusBar animated={true} style="dark" backgroundColor="transparent" />

                    <LinearGradient
                        style={
                            {
                                alignItems: 'center',
                                width: 45,
                                height: 30,
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
                        colors={["#28094d", "#ff0000"]}
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
                            onPress={() => Log_Me_Out()}>

                            <Ionicons name="power-outline" size={25} color={'#ff0000'} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>

                        <Text style={{ color: "#333", fontSize: 18, fontWeight: "bold" }}>Veuillez entrer votre code</Text>
                    </View>

                    <View style={{ height: 50 }}></View>


                    <Animated.View style={
                        {
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            left: wrong
                        }
                    }>
                        {pincode && [...pincode].map((digit, index) => (
                            <View key={index} style={{
                                backgroundColor: "#fff",
                                height: 45,
                                width: 45,
                                borderRadius: 10,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: index === pincode.length - 1 ? 0 : 17
                            }}>
                                <Text style={{
                                    color: "transparent",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    backgroundColor: colar,
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5
                                }}></Text>
                            </View>
                        ))}

                        {!pincode &&
                            <View style={{
                                backgroundColor: "transparent",
                                height: 45,
                                width: 45,
                                alignItems: 'center',
                                justifyContent: "center",
                            }}>
                                <Text style={{
                                    color: "transparent",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    backgroundColor: "transparent",
                                    height: 10,
                                    width: 10,
                                }}></Text>
                            </View>
                        }

                    </Animated.View>

                    <View style={{ height: "20%" }}></View>

                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>

                        <View style={
                            {
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row"
                            }
                        }>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}1` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}2` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}3` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>3</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 20 }}></View>

                        <View style={
                            {
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row"
                            }
                        }>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}4` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>4</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}5` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>5</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}6` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>6</Text>
                            </TouchableOpacity>

                        </View>


                        <View style={{ height: 20 }}></View>


                        <View style={
                            {
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row"
                            }
                        }>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}7` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>7</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}8` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>8</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}9` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>9</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ height: 20 }}></View>


                        <View style={
                            {
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row"
                            }
                        }>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.slice(0, -1))}>
                                <Text style={{
                                    color: "#ff0000",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>{"<x"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 65,
                                width: 65,
                                borderRadius: 33,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                                marginRight: 50
                            }} onPress={() => setPincode(pincode.length < 5 ? `${pincode}0` : pincode)}>
                                <Text style={{
                                    color: "#28094d",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: "center",
                            }} onPress={() => retrieveData()}>
                                <Text style={{
                                    color: "#00b395",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    borderRadius: 5
                                }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            }
        </>
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