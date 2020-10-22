
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, Platform, StatusBar } from 'react-native';
import { AppStyles, AppImages } from "../../AppStyles"
import { connect } from 'react-redux';
import api from '../services/api';
import Loader from '../services/loader'
import { Creators as UserActions } from '../../store/ducks/user';
import Axios from 'axios';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation, logarUsuario }) => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
 
    const logar = async () => {
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
            const { data } = await api.post("/sessions", {
                email:email, 
                password: senha
            })
            logarUsuario({
                ...data,
                loged:true
            })
            navigation.replace("Main");
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert("Usuario não encontrado")
        }
    }

    return (
        <View style={styles.containerPage}>

      <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.verdeClaro} />
            <Loader loading={loading} />
            <Image
                style={styles.logo}
                source={AppImages.images.Logo}
            />
            <View style={styles.formContainer}>
                <Text style={styles.inputText}>
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
                    onPress={logar}
                    style={styles.btnLoginContainer}
                >
                    <Text style={styles.btnLoginText}>
                        ENTRAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SingIn")}
                    style={styles.btnContainerCadastro}
                >
                    <Text style={styles.btnTextCadastro}>
                        CADASTRE-SE AQUI
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = state => ({})

const mapDispacthToProps = dispatch => ({
    logarUsuario: (user) => dispatch(UserActions.login(user))
})

export default connect(mapStateToProps, mapDispacthToProps)(Login)


const styles = StyleSheet.create({
    containerPage: {
        alignItems: "center",
        width: width,
        height: height,
        backgroundColor: "#FFF"
    },
    termoAceiteText: {
        textAlign: "center",
        color: "#666666",
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