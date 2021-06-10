import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Alert, ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        secureTextEntry: true,
    }

    async componentDidMount() {
        const uid = await AsyncStorage.getItem('UID');
        if (uid) {
            this.props.navigation.navigate("DashboardScreen");
        }

    }
    updateSecureTextEntry = () => {
        this.setState({

            secureTextEntry: !this.state.secureTextEntry,
        });
    }


    LoginFirebase = async () => {
        LoginUser(this.state.email, this.state.password).
            then((res) => {
                const uuid = Firebase.auth().currentUser.uid;
                AsyncStorage.setItem('UID', uuid);
                alert("login ssucces");
                this.props.navigation.navigate('DashboardScreen');

            }).catch((error) => {
                alert(error);
            })
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                    <StatusBar backgroundColor="#1A237E" barStyle="light-content" />

                    <View style={styles.header}>
                        <Text style={styles.text_header}> Welcome ! </Text>
                        <View style={{ height: 50 }}></View>
                    </View>

                    <View style={{
                        borderTopRightRadius: 30, borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        borderTopLeftRadius: 40, backgroundColor: '#90CAF9', margin: 1
                    }} >
                        <View style={{ left: 20, margin: 20 }}>
                            <Text style={[styles.text_footer, { color: 'black' }]}> Email</Text>
                            <View style={styles.action}>
                            <FontsAw name="envelope-o" color='black' size={18} />
                                <TextInput placeholder="Your Email" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none" value={this.state.email}
                                    onChangeText={(val) => this.setState({ email: val })} />
                                {this.state.email.length > 3 ?
                                    <Animatable.View animation="bounceIn" style={{ right: 30 }} >
                                        <Feather name="check-circle" color="green" size={20} />
                                    </Animatable.View>
                                    : null}
                            </View>
                            <Text style={[styles.text_footer, { color: 'black' }]}> Password</Text>
                            <View style={styles.action}>
                                <FontsAw name="expeditedssl" c color='black' size={18} />
                                <TextInput placeholder="Your password" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none" secureTextEntry={this.state.secureTextEntry ? true : false}
                                    onChangeText={(val) => this.setState({ password: val })} />
                                <TouchableOpacity onPress={this.updateSecureTextEntry} style={{ right: 30 }} >
                                    {this.state.secureTextEntry ?
                                        <Feather name="eye-off" color="grey" size={20} />
                                        : <Feather name="eye" color="grey" size={20} />}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity style={styles.signIn} onPress={() => this.LoginFirebase()}>
                                    <LinearGradient colors={['#1976D2', '#64B5F6']} style={styles.signIn}  >
                                        <Text style={styles.textSign}> Login </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                                        <Text style={{ fontSize: 20, color:'blue',marginTop: 5 }}>New User? Click here.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('Splash') }} >
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Feather name='chevron-left' size={20} />
                                    <Text>Back</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ height: 200 }}></View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D47A1'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
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
