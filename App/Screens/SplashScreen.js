import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Alert, ScrollView, Dimensions,TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        secureTextEntry: true,
    }




    render() {

        return (
            <ScrollView>
                <View style={styles.container} >
                    <StatusBar backgroundColor="#1A237E" barStyle="light-content" />

                    <View style={styles.header}>
                        <Text style={styles.text_header}> Connected with everyone ! </Text>
                   
                    </View>
                  
               
                 
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#1A237E' }}>
                    <View style={{
                        width: '40%', backgroundColor: 'lightblue', height: 80,
                        borderTopEndRadius: 100, borderTopStartRadius: 100    }}></View>
   
                    <View style={{ width: '60%', 
                    backgroundColor: '#1A237E', height: 80, }}>
                         <Animatable.Image
                            duration={10000} resizeMode={'stretch'}
                            style={[styles.logo,{left:70,margin:2,borderRadius:10}]}
                            source={require('../chat.png')}   />
                           
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: 'lightblue' }}>
                    <View style={{
                        backgroundColor: '#0D47A1',
                        borderTopEndRadius: 100, borderTopStartRadius: 100,
                        width: '40%', height: 90 }}>
                           
                  
                    </View>
                    <View style={{
                        width: '60%', height: 90,
                        borderBottomStartRadius: 100,
                        borderBottomEndRadius: 100,
                        backgroundColor: '#1A237E' }}>
                          <Text style={{color:'#C51162',fontSize:28,fontFamily:'Lemon-Regular',
                           marginLeft:60, marginTop:5}}>Chat App</Text>
                    </View>
                </View>


                <View style={{ backgroundColor: '#0D47A1', flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: '#0D47A1',
                        width: '40%', height: 80 }}></View>

                    <View style={{
                        width: '60%', height: 80,
                        borderBottomStartRadius: 100,
                        borderBottomEndRadius: 100,
                        backgroundColor: 'lightblue' }}>
                    </View>
                </View>
                <View style={{ backgroundColor: '#0D47A1', flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopEndRadius: 100, borderTopStartRadius: 130,
                        width: '40%', height: 80}}></View>

                    <View style={{
                        backgroundColor: 'white',
                        width: '60%', height: 80,  }}>
                        <View style={{
                            borderBottomStartRadius: 100,
                            borderBottomEndRadius: 240, height: 80,
                            backgroundColor: '#0D47A1'}}></View>
                    </View>

                </View>

                <View style={{
                    marginTop: 60, alignItems: 'center', marginBottom: 5,
                    backgroundColor: 'white', }}>
                    <TouchableOpacity style={{
                        margin: 8, borderRadius: 30, height: 50,
                        width: '70%', marginBottom: 5, }}
                        onPress={() => { this.props.navigation.navigate('Login') }}>

                        <View style={{ flexDirection: 'row', height: 40, }}>
                            <Text style={{ fontWeight: 'bold', left: 60, marginTop: 5,color:'blue', fontSize: 22 }} >Get Started</Text>
                            <Feather name='chevron-right' color='blue' size={28} style={{ left: 60, marginTop: 5 }} />
                        </View>

                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.09;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A237E'
    },
    logo: {
        width: height_logo,
        height: height_logo,
      
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 50,
        paddingTop: 100,
        alignContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 50,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 30,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontFamily: 'Lemon-Regular',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
    },
    signIn: {
        width: '97%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        right: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})
