import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import { store, persistor } from '../store';
import Main from './pages/Main';
import { AppStyles } from '../AppStyles';
import SingIn from './pages/SingIn';
import CadastrarPonto from './pages/CadastrarPonto';
import EditarPonto from './pages/EditarPonto';
import DrawerContainer from '../src/components/drawer'

const Stack = createStackNavigator();


function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer >
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: {
                backgroundColor: AppStyles.color.roxo,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: "center"
              }
            }}

          >
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false
              }}

            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name="SingIn"
              component={SingIn}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="CadastrarPonto"
              component={CadastrarPonto}
              options={{
                title: "Cadastrar Ponto",
                headerStyle: {
                  backgroundColor: AppStyles.color.roxo
                }
              }}
            />

            <Stack.Screen
              name="EditarPonto"
              component={EditarPonto}
              options={{
                title: "Editando Ponto",
                headerStyle: {
                  backgroundColor: AppStyles.color.roxo
                }
              }}
            />

            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                title: "ECO-SIS"
              }}
            />
            <Stack.Screen
              name="Drawer"
              component={DrawerContainer}
              options={{
                title: "Configurações"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default Routes;