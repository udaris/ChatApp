/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local 
 */

import React from 'react';
import {StyleSheet, View,} from 'react-native';
import Signup from './App/Screens/SignUpScreen';
import RootNavigator from './App/router';

class App extends React.Component{
  render(){
    return(
   <RootNavigator/>
    );
  }
}

export default App;
