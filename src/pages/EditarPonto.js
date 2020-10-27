
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { AppStyles } from "../../AppStyles"
import api from '../services/api';
import Loader from '../services/loader'
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function EditarPonto({ navigation, route }) {

    const { point } = route.params;
    const { user } = useSelector(state => state)

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState(point.nome);

    const editar = async () => {
        if (nome.length < 3) {
            alert("Preencha o nome");
            return 0;
        }
        try {
            setLoading(true)
            const { data } = await api.put(`/coleta/${point.id}`, {
                nome: nome,
                lat: point.lat,
                long: point.long
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setLoading(false)
            route.params.atualizar();
            navigation.pop();
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }

    return (
        <View style={styles.containerPage}>
            <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.roxo} />
            <Loader loading={loading} />
            <Text style={{
                marginTop: 20,
                fontWeight: "bold",
                fontSize: 30,
                alignSelf: "flex-start",
                marginLeft: 20,
                color: AppStyles.color.roxo
            }}>
                Cadastra ponto de Coleta
            </Text>
            <View style={styles.formContainer}>
                <Text style={styles.inputText}>
                    Nome
                </Text>
                <TextInput
                    placeholder="Nome"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={[styles.inputText, {marginTop: 20}]}>
                    Materiais recicláveis 
                </Text>
                <Text style={[styles.inputText, {marginTop: 20, fontWeight: "bold", fontSize: 18}]}>
                    {JSON.parse(point.materiais).map(m => (
                        <>{" " + m} </>
                    ))}
                </Text>
            </View>
            <View style={{
                alignSelf: "flex-end",
                paddingHorizontal: 20,
                marginBottom: 35,
                justifyContent: "center"
            }}>
                <Text style={styles.termoAceiteText}>
                    Ao entrar você concorda com nossos termos de uso e política de privacidade
                </Text>

                <TouchableOpacity
                    onPress={editar}
                    style={styles.btnContainerCadastro}
                >
                    <Text style={styles.btnTextCadastro}>
                        Editar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPage: {
        alignItems: "center",
        width: width,
        height: height * 0.95,
        backgroundColor: "#FFF"
    },
    termoAceiteText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 15
    },
    btnLoginContainer: {
        backgroundColor: AppStyles.color.roxo,
        alignItems: "center",
        borderRadius: 8
    },
    btnLoginText: {
        padding: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    btnContainerCadastro: {
        borderColor: AppStyles.color.roxo,
        borderWidth: 1,
        marginTop: 8,
        alignItems: "center",
        borderRadius: 8
    },
    btnTextCadastro: {
        padding: 18,
        fontWeight: "bold",
        color: AppStyles.color.roxo
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#eee",
    },
    inputText: {
        color: AppStyles.color.verdeClaro,
        alignSelf: "flex-start",
        marginBottom: -10,
        fontSize: 12,
        marginLeft: 3,
        color: AppStyles.color.azul
    },
    logo: {
        height: height * 0.15,
        width: width * 0.7,
        resizeMode: "contain",
        marginTop: height * 0.1
    },
    formContainer: {
        flex: 1,
        alignItems: "center",
        width: "90%",
        marginTop: height * 0.05,
        backgroundColor: "#fff"
    },
    input: {
        width: "100%",
        height: 45,
        fontWeight: "bold",
        borderColor: AppStyles.color.roxo,
        borderBottomWidth: 1,
        paddingRight: 20,
    },

});