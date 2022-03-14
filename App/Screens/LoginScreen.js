import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import { LoginUser } from "../Firebase/LoginUser";
import Firebase from '../Firebase/firebaseConfig';
import Spinner from "react-native-loading-spinner-overlay/lib";
import AsyncStorage from "@react-native-community/async-storage";

class Login extends Component {
    state = {
        email: "",
        password: "",
        loader: false
    }

    async componentDidMount() {
        this.setState({ loader: true })
        const uid = await AsyncStorage.getItem('UID');
        if (uid) {
            this.props.navigation.navigate("Home");
            this.setState({ loader: false })
        }
        this.setState({ loader: false })
    }

    LoginToFirebase = async () => {
        this.setState({ loader: true })
        LoginUser(this.state.email, this.state.password).
            then(async (res) => {
                //console.log('res',res);
                const uid = Firebase.auth().currentUser.uid;
                await AsyncStorage.setItem('UID', uid);
                this.setState({ loader: false })
                this.props.navigation.navigate('Home')

                alert('Success');
            }).catch((error) => {
                this.setState({ loader: false })
                alert(error);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A237E', }} >
                <Text style={{ fontSize: 45, fontFamily: 'BigShouldersInlineDisplay-Bold', }}>Chat App</Text>
                <ImageBackground imageStyle={{ borderRadius: 25 }} resizeMode="cover" source={require('../Assets/login.png')} style={styles.image}>

                    <View style={{ marginBottom: 223 }}></View>
                    <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })}></TextInputComponent>
                    <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })}></TextInputComponent>

                </ImageBackground>

                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { this.LoginToFirebase() }}>
                    <View style={{ height: 50, width: 330, borderRadius: 20, alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                    </View>
                </TouchableOpacity>


                <View style={{ marginTop: 5 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Signup') }}>
                        <Text></Text>
                        <Text style={{ color: 'black', fontFamily: 'PermanentMarker-Regular', fontSize: 20 }}>New User? </Text>
                    </TouchableOpacity>
                </View>

                <Spinner visible={this.state.loader} />
            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    image: {
        flex: 0.8,
        //justifyContent: "flex-start",
        //borderRadius:20
    },
});