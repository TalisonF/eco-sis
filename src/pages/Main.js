import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, PermissionsAndroid, Platform, Text, Linking, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from "../services/api"
import { useSelector } from "react-redux";
import { AppStyles } from '../../AppStyles'
import { Icon } from "react-native-elements";


export default Main = ({ navigation }) => {

    const [currentRegion, setCurrenteRegion] = useState(null)
    const [points, setPoints] = useState([])
    const [addPoint, setAddPoint] = useState(false)

    const [addCoordinate, setAddCoordinate] = useState([])

    const { user } = useSelector(state => state);

    useEffect(() => {
        async function loadInitialPosition() {
            requestLocationPermission();
            Geolocation.getCurrentPosition(({ coords }) => {
                setCurrenteRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
                if (addCoordinate !== undefined) {
                    setAddCoordinate({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    })
                }
            }
            )
        }
        loadInitialPosition();
    }, [])

    useEffect(() => {
        loadDevs();
    }, [currentRegion])

    async function requestLocationPermission() {
        if (Platform.OS === 'ios') return;
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {

        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Permitir o acesso a localização atual.',
                        'message': 'Para encontrarmos os parceiros próximos a você é necessário ativar a localização.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                } else {
                    alert("Para esta função e necessário ativar a localização");
                }
            } catch (err) {
                alert(err)
            }
        }
    };

    async function loadDevs() {
        if (user.token === undefined) {
            return 0;
        }
        const { latitude, longitude } = currentRegion;

        const { data } = await api.get('/buscaponto', {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            params: {
                lat: latitude,
                long: longitude
            }
        });
        setPoints(data)
    }

    function handleRegionChanged(region) {
        setCurrenteRegion(region)
    }

    const handleAddPoint = () => {
        navigation.navigate("CadastrarPonto", {
            addCoordinate: addCoordinate,
            atualizar: () => {
                setAddPoint(false);
                loadDevs();
            }
        })
    }

    if (!currentRegion) {
        return null;
    }
    return (
        <>
            <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => setAddPoint(!addPoint)}
            >
                <Icon
                    name="plus"
                    type='font-awesome-5'
                    color={"#FFF"}
                />
            </TouchableOpacity>
            {addPoint && (
                <TouchableOpacity
                    style={styles.btnCont}
                    onPress={handleAddPoint}
                >
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                        Continuar
                    </Text>
                </TouchableOpacity>
            )}

            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                showsUserLocation={true}
                style={{ flex: 1 }}
            >
                {points.map(point => {
                    const m = JSON.parse(point.materiais)
                    return (
                        <Marker
                            key={point.id}
                            coordinate={{
                                latitude: parseFloat(point.lat),
                                longitude: parseFloat(point.long)
                            }}
                            pinColor="blue"
                        >
                            <Callout
                                onPress={() => {
                                    const url = `google.navigation:q=${point.lat}+${point.long}`
                                    Linking.canOpenURL(url).then(supported => {
                                        if (supported) {
                                            Linking.openURL(url);
                                        } else {
                                            console.log('Don\'t know how to open URI: ' + url);
                                        }
                                    });
                                }}>
                                <View style={{ width: 260, padding: 16 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {point.nome}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontWeight: "bold" }}>Materias: </Text>
                                        {m.map(mat => (
                                            <Text key={mat}>
                                                {mat + " "}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </Callout>
                        </Marker>

                    )
                })}

                {addPoint && (
                    <Marker
                        draggable={true}
                        coordinate={addCoordinate}
                        pinColor={AppStyles.color.verdeClaro}
                        onDragEnd={e => {
                            console.log(e.nativeEvent.coordinate)
                            setAddCoordinate(e.nativeEvent.coordinate)
                        }}
                    />
                )}
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    btnAdd: {
        backgroundColor: AppStyles.color.roxo,
        width: 50,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnCont: {
        backgroundColor: AppStyles.color.roxo,
        width: 200,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
