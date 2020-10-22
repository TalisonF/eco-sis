
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { AppStyles, AppImages } from "../../AppStyles"
import api from '../services/api';
import Loader from '../services/loader'

const { width, height } = Dimensions.get('window');

export default function SingIn({ navigation }) {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");

    const cadastrar = async () => {
        if(nome.length < 3){
            alert("Preencha o nome");
            return 0;
        }
        if(email.length < 3){
            alert("Preencha o email");
            return 0;
        }
        if(senha.length < 3){
            alert("Preencha a senha");
            return 0;
        }
        try {
            setLoading(true)
            const { data } = await api.post("/users", {
                username: nome,
                email: email,
                password: senha
            })
            alert("Usuário cadastrado.")
            navigation.replace("Login");
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("Usuário já cadastrado na base.")
        }
    }

    return (
        <View style={styles.containerPage}>
            <Loader loading={loading} />
            <Text style={{
                marginTop: 50,
                fontWeight: "bold",
                fontSize: 30,
                alignSelf: "flex-start",
                marginLeft: 20,
                color: AppStyles.color.verdeClaro
            }}>Cadastre-se</Text>
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
                <Text style={[styles.inputText, { marginTop: 5 }]}>
                    E-mail
                </Text>
                <TextInput
                    placeholder="E-mail"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={[styles.inputText, { marginTop: 5 }]}>
                    Senha
                    </Text>
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    value={senha}
                    textContentType={"password"}
                    secureTextEntry={true}
                    onChangeText={setSenha}
                />

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
                    onPress={cadastrar}
                    style={styles.btnContainerCadastro}
                >
                    <Text style={styles.btnTextCadastro}>
                        CADASTRE-SE
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
        height: height,
        backgroundColor: "#FFF"
    },
    termoAceiteText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 15
    },
    btnLoginContainer: {
        backgroundColor: AppStyles.color.verdeClaro,
        alignItems: "center",
        borderRadius: 8
    },
    btnLoginText: {
        padding: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    btnContainerCadastro: {
        borderColor: AppStyles.color.verdeClaro,
        borderWidth: 1,
        marginTop: 8,
        alignItems: "center",
        borderRadius: 8
    },
    btnTextCadastro: {
        padding: 18,
        fontWeight: "bold",
        color: AppStyles.color.verdeClaro
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
        borderColor: AppStyles.color.verdeClaro,
        borderBottomWidth: 1,
        paddingRight: 20,
    },

});