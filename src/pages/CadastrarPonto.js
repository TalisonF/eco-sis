
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { AppStyles } from "../../AppStyles"
import api from '../services/api';
import Loader from '../services/loader'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { set } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const items = [
    // this is the parent or 'item'
    {
        name: 'Materiais recicláveis',
        id: 0,
        // these are the children or 'sub items'
        children: [
            {
                name: 'Plástico',
                id: 0,
            },
            {
                name: 'Vidros',
                id: 1,
            },
            {
                name: 'Metais',
                id: 2,
            },
        ],
    }
];

export default function CadastrarPonto({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [nome, setNome] = useState("");
    const { addCoordinate } = route.params
    const [materiais, setMateriais] = useState([]);

    const { user } = useSelector(state => state)

    const cadastrar = async () => {
        let m = []; 
        items[0].children.map(i => {
            if(materiais.includes(i.id)){
                m.push(i.name);
            }
        })
        if(m.length === 0){
            alert ("selecione pelo menos um material")
            return 0;
        }
        if(nome.length < 3){
            alert("Preencha o nome");
            return 0;
        }
        try {
            setLoading(true)
            const { data } = await api.post("/coleta", {
                nome: nome,
                lat: addCoordinate.latitude,
                long: addCoordinate.longitude,
                materiais: JSON.stringify(m)
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
                <Text style={[styles.inputText, { marginTop: 16 }]}>
                    Materiais recicláveis
                </Text>
                <SectionedMultiSelect
                    items={items}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={items => setMateriais(items)}
                    selectedItems={materiais}
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
                        CADASTRAR
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