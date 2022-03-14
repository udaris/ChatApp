import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from "react-native";
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { SignupUser } from '../Firebase/SignUpUser';
import { AddUser } from "../Firebase/Users";
import Firebase from '../Firebase/firebaseConfig';
import Feather from 'react-native-vector-icons/Feather';

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    }
    SignupToFirebase = () => {

        if (!this.state.name) {
            return alert("Please enter your name ");
        }
        if (!this.state.email) {
            return alert("Please enter your email");
        }
        if (!this.state.password) {
            return alert("Please enter your password");
        }
        SignupUser(this.state.email, this.state.password).
            then((res) => {
                console.log('res', res);
                var userUID = Firebase.auth().currentUser.uid;
                AddUser(this.state.name, this.state.email, '', userUID).
                    then(() => {
                        this.props.navigation.navigate("Home");
                        alert("success");
                    }).catch((error) => {
                        alert(error);
                    })

            }).catch((err) => {
                alert(err);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }} >
                <ImageBackground imageStyle={{ borderRadius: 25,  }} style={styles.image} resizeMode="cover" source={require('../Assets/sign.png')} >
                    <View>
                        <TextInputComponent placeholder="Enter Name" updateFields={(text) => this.setState({ name: text })}></TextInputComponent>
                        <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })}></TextInputComponent>
                        <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })}></TextInputComponent>
                    </View>

                    <View>
                        <ButtonComponent title="Register" onPress={() => { this.SignupToFirebase() }} ></ButtonComponent>
                    </View>

                    <View style={{height: 40,}}>
                        <TouchableOpacity style={{ marginBottom: 5, }}
                            onPress={() => { this.props.navigation.navigate('Login') }}>
                            <View style={{ flexDirection: 'row',}}>
                                <Feather name='chevron-left' color='#000' size={30} style={{ left: 22, marginTop: 14, }} /><Text style={{ fontWeight: 'bold', left: 20, color: '#000', fontSize: 22, marginTop: 12 }} >Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default Signup;

const styles = StyleSheet.create({
    image: {
        flex: 0.8,
        //justifyContent: "flex-start",
        //borderRadius:20
    },
});