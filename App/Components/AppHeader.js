import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

class AppHeader extends Component {
    render() {
        const { title, onPress, navigation } = this.props;
        return (
            <View >
                <View >
                    <View>
                        {title === "Messages" ?
                            <View style={{ backgroundColor: '#BBDEFB' }} >
                                <View style={{ width: '100%', alignItems: 'center',paddingTop:10 }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'blue' }}>{title}</Text>
                                </View>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', height:60,backgroundColor:'#5C6BC0' }}>

                                <View style={style.btnContainer}>
                                    <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
                                        <Icons name='arrow-back' size={25} color='black' />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center'}}>
                                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'black' ,margin:10}}>{title}</Text>
                                </View>
                            </View>
                        }


                    </View>
                </View>
            </View>
        )
    }
}

export default AppHeader;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fedac5",

    },
    circle: {
        width: 500,
        height: 770,
        borderRadius: 500 / 2,
        backgroundColor: "#fff",
        position: "absolute",
        left: -120,
        //top: -20
    },
    header: {
        fontWeight: "800",
        fontSize: 30,
        color: "#514e5a",
        //marginTop: 200

    },
    input: {
        //marginTop: 32,
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#bab7c3",
        borderRadius: 40,
        paddingHorizontal: 16,
        color: "#514e5a",
        fontWeight: "600",
    },
    btnContainer: {
        margin:5,
        backgroundColor: '#3949AB',
        height: 50,
        width: 50,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',

    },
});