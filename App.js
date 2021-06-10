import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpScreen from './App/Screens/SignUpScreen';
import  RootNavigator from './router';

export default class App extends React.Component {
 

  render() {
    return (
      <View style={{height:1000, backgroundColor:'lightblue'}}>
       <RootNavigator/>
      </View>
    )
  }
}