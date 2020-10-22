import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import { Creators as UserActions } from '../../store/ducks/user';
import { AppStyles, AppImages } from '../../AppStyles';
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

const version = "00.00.00"

const options = [
    {
        title: "Dados Pessoais",
        action: "dadosDoUsuario"
    },
    {
        title: "Alterar Senha",
        action: "alterarSenha"
    },
    /*{
        title: "Ativar Biometria",
        action: "biometria"
    },*/
    {
        title: "Reportar prolema",
        action: "reportar problema"
    },
    {
        title: "Termos de uso",
        action: "termosUso"
    },
    {
        title: "Sair do App",
        action: "logout"
    }

]


function DrawerContainer({ navigation, user, logout }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const CloseButton = () => (
        <TouchableOpacity style={styles.closeButton}
            onPress={() => navigation.closeDrawer()}
        >
            <Text> x</Text>
        </TouchableOpacity>
    )

    const handleOption = (option) => {
        switch (option.action) {
            case "logout":
                logout(navigation)
                break;

            default:
                break;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <CloseButton />
            <View style={styles.topContainer}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${user.Avatar}`}}
                    style={styles.avatar} />
                <Text style={styles.nomeMedico}>
                    {user.Nome}
                </Text>
                <Text style={{ fontSize: 16 }}>
                    <Text style={styles.crmMedico}>
                        CRM:
                      </Text>
                    {" " + user.CRM}
                </Text>
            </View>
            <View >
                {options.map(option => (
                    <TouchableOpacity
                    key={option.action}
                        style={styles.listItem}
                        onPress={() => handleOption(option)}
                    >
                        <Text>{option.title}</Text>
                        {option.action === "biometria" ? (
                            <Switch
                                trackColor={{ false: AppStyles.color.cinzaInativo, true: "#6EDC5F" }}
                                thumbColor={"#FFF"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        ) : (
                                <Icon
                                    name="chevron-right"
                                    type='font-awesome-5'
                                    color={AppStyles.color.azul}
                                />
                            )}


                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                <Image
                    source={AppImages.images.LogoSantaCasa}
                    style={styles.logo}
                />
                <Text style={{ color: AppStyles.color.cinza }}>
                    <Text style={{ fontWeight: "bold" }}>VERSÃO</Text>
                    {" " + version}
                </Text>
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispacthToProps = dispatch => ({
    logout: (navigation) => dispatch(UserActions.logout(navigation))
})

export default connect(mapStateToProps, mapDispacthToProps)(DrawerContainer)


const styles = StyleSheet.create({
    closeButton: {
        position: "relative",
        zIndex: 1,
        top: 50,
        left: width - 50,
        width: 30,
        height: 30
    },
    topContainer: {
        height: height * 0.30,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: AppStyles.color.cinzaClaro,
        borderWidth: 1
    },
    nomeMedico: {
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 16,
    },
    crmMedico: {
        fontSize: 16,
        fontWeight: "bold"
    },
    listItem: {
        height: height * 0.09,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 16,
    },
    logo: {
        height: height * 0.09,
        resizeMode: "contain",
    },
})