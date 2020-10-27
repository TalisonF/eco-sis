import React, { useEffect, useState } from "react";
import { StyleSheet, PermissionsAndroid, Platform, Text, Linking, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, CalloutSubview } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from "../services/api"
import { useSelector } from "react-redux";
import { AppStyles } from '../../AppStyles'
import { Icon } from "react-native-elements";
import Loader from '../services/loader'


export default Main = ({ navigation }) => {

    const [currentRegion, setCurrenteRegion] = useState(null)
    const [points, setPoints] = useState([])
    const [addPoint, setAddPoint] = useState(false)
    const [pointSelecionado, setPointSelecionado] = useState()
    const [loading, setLoading] = useState(false)

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

    async function loadDevs(carregar = false) {
        if (user.token === undefined) {
            return 0;
        }
        const { latitude, longitude } = currentRegion;
        setLoading(carregar)
        const { data } = await api.get('/buscaponto', {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            params: {
                lat: latitude,
                long: longitude
            }
        });
        setLoading(false);
        setPoints(data)
    }

    async function handleDelete(idColeta) {
        setLoading(true)
        const { data } = await api.delete(`/coleta/${idColeta}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        loadDevs(true);
    }

    function handleRegionChanged(region) {
        setCurrenteRegion(region)
    }

    const handleAddPoint = () => {
        navigation.navigate("CadastrarPonto", {
            addCoordinate: addCoordinate,
            atualizar: () => {
                setAddPoint(false);
                setPointSelecionado(undefined)
                loadDevs();
            }
        })
    }

    if (!currentRegion) {
        return <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: AppStyles.color.roxo
        }}>
            <Icon
                name="exclamation-triangle"
                size={130}
                type='font-awesome-5'
                color={"#fff"}
            />
            <Text style={{
                color: "#fff",
                fontSize: 30,
                marginTop: 30
            }}>
                Sem localização do usuario!
            </Text>
        </View>;
    }
    return (
        <>
            <Loader loading={loading} />
            {!addPoint ? (
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
            ) : (
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => setAddPoint(!addPoint)}
                    >
                        <Icon
                            name="times"
                            type='font-awesome-5'
                            color={"#FFF"}
                        />
                    </TouchableOpacity>
                )}

            <TouchableOpacity
                style={[styles.btnAdd, { top: 20 }]}
                onPress={() => navigation.navigate("Drawer")}
            >
                <Icon
                    name="cog"
                    type='font-awesome-5'
                    color={"#FFF"}
                />
            </TouchableOpacity>
            {addPoint && (
                <View style={styles.barIcons}>
                    <TouchableOpacity
                        style={styles.btnCaixa}
                        onPress={handleAddPoint}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Continuar
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCaixa}
                        onPress={() => {
                            setAddPoint(false)
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Cancelar
                    </Text>
                    </TouchableOpacity>
                </View>
            )}
            {addPoint && (
                <View
                    style={styles.textTopo}
                >
                    <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
                        Adicionando novo ponto de coleta
                    </Text>
                    <Text style={{ color: "#000", fontSize: 13, fontWeight: "bold" }}>
                        Mova o pin no mapa para o local desejado!
                    </Text>

                </View>
            )}
            {(pointSelecionado !== undefined && !addPoint) && (
                <View style={[styles.barIcons, { height: 100, flexDirection: "column" }]}>
                    <Text style={{ color: "#fff", fontWeight: "bold", alignSelf: "center" }}>
                        {pointSelecionado.nome}
                    </Text>
                    {user.idUser === pointSelecionado.user_id && (
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity
                                style={styles.btnCaixa}
                                onPress={() => {
                                    navigation.navigate("EditarPonto", {
                                        point: pointSelecionado,
                                        atualizar: () => {
                                            setAddPoint(false);
                                            setPointSelecionado(undefined)
                                            setPoints([]);
                                            loadDevs();
                                        }
                                    })
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Editar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnCaixa}
                                onPress={() => {
                                    handleDelete(pointSelecionado.id)
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            )}
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                showsUserLocation={true}
                style={{ flex: 1 }}
            >
                {points.map(point => {
                    const m = JSON.parse(point.materiais)
                    if (addPoint) {
                        return <></>
                    }
                    return (
                        <Marker
                            key={point.id}
                            coordinate={{
                                latitude: parseFloat(point.lat),
                                longitude: parseFloat(point.long)
                            }}
                            pinColor={user.idUser === point.user_id ? "#90F" : AppStyles.color.verdeClaro}
                            onPress={() => setPointSelecionado(point)}
                        >
                            <Callout
                                tooltip={true}
                                onPress={() => {
                                    const url = `google.navigation:q=${point.lat}+${point.long}`
                                    Linking.canOpenURL(url).then(supported => {
                                        if (supported) {
                                            Linking.openURL(url);
                                        }
                                    });
                                }}>
                                <View style={{
                                    padding: 16,
                                    backgroundColor: "#FFF",
                                    borderRadius: 16
                                }}>
                                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
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
                            setAddCoordinate(e.nativeEvent.coordinate)
                        }}
                    />
                )}
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    btnCaixa: {
        zIndex: 1,
        backgroundColor: AppStyles.color.verdeClaro,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 10,
    },
    barIcons: {
        backgroundColor: AppStyles.color.roxo,
        width: 300,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 1,
        paddingVertical: 7,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textTopo: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        left: 20,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16
    },
    callout: {
        width: 360,
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginBottom: 10
    },
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
