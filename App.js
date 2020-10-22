// In App.js in a new project

import * as React from 'react';
import Routes from "./src/routes"
import { StatusBar } from 'react-native';
import { AppStyles } from './AppStyles';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.roxo} />
      <Routes />
    </>
  );
}

export default App;