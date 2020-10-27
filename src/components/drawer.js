import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text, Switch } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Creators as UserActions } from '../../store/ducks/user';
import { AppStyles, AppImages } from '../../AppStyles';
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

const version = "00.00.00"

const options = [
    {
        title: "Encerrar sessão",
        action: "logout"
    }

]


function DrawerContainer({ navigation, logout }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { user } = useSelector(state => state);

    console.log(user)

    const CloseButton = () => (
        <TouchableOpacity style={styles.closeButton}
            onPress={() => navigation.pop()}
        >
            <Icon
                name="times"
                type='font-awesome-5'
                color={"#000"}
            />
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
                <View style={styles.avatar} >
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 60,
                        color: "#FFF"
                    }}>
                        {user.username !== undefined && user.username.split("")[0]}
                    </Text>
                </View>
                <Text style={styles.nomeMedico}>
                    {user.username}
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
                        <Icon
                            name="chevron-right"
                            type='font-awesome-5'
                            color={AppStyles.color.azul}
                        />
                    </TouchableOpacity>
                ))}
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
        backgroundColor: AppStyles.color.roxo,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
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