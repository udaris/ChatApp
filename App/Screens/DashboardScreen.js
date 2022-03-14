import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Dimensions } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

class Dashboard extends Component {
    render() {

        return (
            <View style={styles.container} >
                <StatusBar backgroundColor='#1A237E' barStyle="light-content" />

                <View style={styles.header}>
                    <Text style={styles.text_header}> Connected With  Everyone Here ! </Text>


                </View>

                <View style={{ width: '60%', backgroundColor: '#1A237E', }}>
                    <Image
                        duration={10000} resizeMode={'stretch'}
                        style={{
                            width: height_logo,
                            height: height_logo, left: 165, marginTop: 10, borderRadius: 10
                        }}
                        source={require('./chat.png')} />

                </View>
                <View style={{
                    backgroundColor: '#0D47A1',
                    borderTopEndRadius: 100,
                    borderTopStartRadius: 100,
                    width: '40%', height: 120
                }}>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#0D47A1' }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopEndRadius: 580,
                        borderTopStartRadius: 150,
                        width: '40%', height: 120
                    }}>
                    </View>
                    <View style={{
                        width: '60%', height: 120,
                        borderBottomStartRadius: 150,
                        borderBottomEndRadius: 130,
                        backgroundColor: '#1A237E'
                    }}>
                    </View>
                </View>


                <View style={{ flexDirection: 'row',borderBottomRightRadius:850, 
                backgroundColor: '#0D47A1', }}>
                    <View style={{
                        width: '40%', height: 120,
                        borderBottomStartRadius: 100,
                        borderBottomEndRadius: 600,
                        backgroundColor: 'white'
                    }}>
                    </View>

                </View>

                
                <View style={{alignItems: 'center',marginLeft:95,marginRight:75, marginBottom: 5, backgroundColor: '#fff',borderRadius:30 }}>
                    <TouchableOpacity style={{ height: 55, marginBottom: 5, }}
                        onPress={() => { this.props.navigation.navigate('Login') }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: 'blue', fontSize: 22, marginTop: 12 }} >Get Started</Text>
                            <Feather name='chevron-right' color='blue' size={30} style={{ left: 22, marginTop: 14, }} />
                        </View>

                    </TouchableOpacity>
                </View>

            </View>
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
    text_header: {
        color: '#fff',
        fontFamily: 'PermanentMarker-Regular',
        fontSize: 30,
        margin: 25,
        left: 50
    },
    header: {
        alignContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo,

    },
})





export default Dashboard;