import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import { store, persistor } from '../store';
import Main from './pages/Main';
import { AppStyles } from '../AppStyles';
import SingIn from './pages/SingIn';
import CadastrarPonto from './pages/CadastrarPonto';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
      <Drawer.Navigator
          drawerStyle={{
              width: "100%"
          }}
          drawerContent={(props) => {
              return <DrawerContainer navigation={props.navigation} />
          }}
      >
          <Drawer.Screen name="main" component={MainStack} />
      </Drawer.Navigator>
  )
}


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
              name="Main"
              component={Main}
              options={{
                title: "ECO-SIS"
              }}
            />
            <Stack.Screen 
              name="Drawer"
              component={DrawerNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default Routes;