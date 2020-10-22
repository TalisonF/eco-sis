import { createStore } from 'redux';
import rootReducers from './ducks'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';


const persistConfig = {
    key: 'ECOSIS',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export { store, persistor };