import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    login: ["user"],
    logout: ["navigation"]
})

const INITIAL_STATE = [
    user = {
        loged: false
    }
]

const login = (state = INITIAL_STATE, action) => (action.user)

const logout = (state = INITIAL_STATE, action) => {
    action.navigation.replace("Login")
    return INITIAL_STATE
};

export default createReducer(INITIAL_STATE,{
    [Types.LOGIN] : login,
    [Types.LOGOUT] : logout
});