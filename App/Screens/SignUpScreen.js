import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Alert, ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { SignUpUser } from '../Firebase/SignUpUser';
import { AddUser } from '../Firebase/Users';;
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUp extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        secureTextEntry: true,
        password2:'',
    }
    updateSecureTextEntry = () => {
        this.setState({

            secureTextEntry: !this.state.secureTextEntry,
        });
    }

    SignUptoFirebase = async () => {
        SignUpUser(this.state.email, this.state.password).
            then((res) => {
                var uid = Firebase.auth().currentUser.uid;
                AddUser(this.state.name, this.state.email, '', uid).then(() => {
                    alert("Success");
                    const uuid = Firebase.auth().currentUser.uid;
                    AsyncStorage.setItem('UID', uuid);
                    this.props.navigation.navigate('DashboardScreen');
                }).catch((err) => {
                    alert(err);
                })

            }).catch((error) => {
                alert(error);
            })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                    <StatusBar backgroundColor="#0D47A1" barStyle="light-content" />
                    <View style={styles.header}>
                        <Text style={styles.text_header}> Register Now ! </Text>
                        <View style={{ height: 50 }}></View>
                    </View>


                    <View style={{
                        borderTopRightRadius: 30, borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        borderTopLeftRadius: 40, backgroundColor: '#90CAF9'
                    }}>
                        <View style={{ left: 20 ,marginTop:20}}>
                            <Text style={[styles.text_footer, { color: 'black' }]}> Name</Text>
                            <View style={styles.action}>
                                <FontsAw name="user-o" color='black' size={18} />
                                <TextInput placeholder="Your Name" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => this.setState({ name: val })} />
                            </View>
                            <Text style={[styles.text_footer, { color: 'black' }]}> Email</Text>
                            <View style={styles.action}>
                                <FontsAw name="envelope-o" color='black' size={18} />
                                <TextInput placeholder="Your Email" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none" value={this.state.email}
                                    onChangeText={(val) => this.setState({ email: val })} />
                                {this.state.email.length > 3 ?
                                    <Animatable.View animation="bounceIn" style={{ right: 50 }} >
                                        <Feather name="check-circle" color="green" size={20} />
                                    </Animatable.View>
                                    : null}

                            </View>


                            <Text style={[styles.text_footer, { color: 'black' }]}> Password</Text>
                            <View style={styles.action}>
                                <FontsAw name="expeditedssl" c color='black' size={18} />
                                <TextInput placeholder="Your Passwrod" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none" secureTextEntry={this.state.secureTextEntry ? true : false}
                                    value={this.state.password}    onChangeText={(val) => this.setState({ password: val })} />
                                <TouchableOpacity onPress={this.updateSecureTextEntry} style={{ right: 30 }} >
                                    {this.state.secureTextEntry ?
                                        <Feather name="eye-off" color="grey" size={20} />
                                        : <Feather name="eye" color="grey" size={20} />}
                                </TouchableOpacity>
                            </View>
 
                            <Text style={[styles.text_footer, { color: 'black' }]}> Re Enter password</Text>
                            <View style={styles.action}>
                                <FontsAw name="expeditedssl" c color='black' size={18} />
                                <TextInput placeholder="Your Password" style={[styles.textInput, { color: 'black' }]}
                                    autoCapitalize="none" secureTextEntry={this.state.secureTextEntry ? true : false}
                                  value={this.state.password2}  onChangeText={(val) => this.setState({ password2: val })} />
                                <TouchableOpacity onPress={this.updateSecureTextEntry} style={{ right: 30 }} >
                                    {this.state.secureTextEntry ?
                                        <Feather name="eye-off" color="grey" size={20} />
                                        : <Feather name="eye" color="grey" size={20} />}
                                </TouchableOpacity>
                              
                            </View>
                            {this.state.password===this.state.password2?  
                            <Animatable.View animation="bounceIn" style={{ left: 20 }} >
                                <Text style={{color:'green'}}>Correct password</Text></Animatable.View>
                                : <Animatable.View animation="bounceIn" style={{ left: 20 }} >
                                    <Text style={{color:'red'}}>Passwords wrong</Text></Animatable.View>}

                            <View style={styles.button}>
                                <TouchableOpacity style={styles.signIn} onPress={() => this.SignUptoFirebase()}>
                                    <LinearGradient colors={['#2196F3', '#E3F2FD']} style={styles.signIn}  >
                                        <Text style={styles.textSign}> Submit </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{marginTop:2}}
                                onPress={() => { this.props.navigation.navigate('Login') }} >
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Feather name='chevron-left' size={20} />
                                    <Text>Back</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                     
                    </View>
                 
                    <View style={{ height: 350 }}></View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#283593'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        borderBottomEndRadius: 50,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 30,
        paddingTop: 100,
        alignContent: 'center',
        alignItems: 'center',
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
        marginTop: 20,
        marginBottom: 20,
    },
    signIn: {
        width: '95%',
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
