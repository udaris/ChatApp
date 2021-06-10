import React from 'react';
import { View, Image, Text, Modal, StyleSheet, KeyboardAvoidingView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Firebase from '../Firebase/firebaseConfig';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-community/async-storage';
import { UpdateUserImage } from '../Firebase/Users';
import ChatScreen2 from './ChatScreen2';
import moment from "moment";

export default class MsgScreen extends React.Component {

    state = {
        allUsers: [],
        imageUrl: '',
        loggedInUserName: '',
        loader: false,
        addTodoVisible: false,
    }
    toggleChatScreen() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }
    render() {

        const list = this.props.list;
        const userName = list.userName;
        const lastMessage = list.lastMessage;
        const lastDate = list.lastDate;
        const lastTime = list.lastTime;
        const Id = list.uuid;

        return (
            <View style={{ alignItems: 'center' }}>
                <Modal animationType='slide'
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleChatScreen()} >
                     <ChatScreen2 closeModal={() => this.toggleChatScreen()}
                        list={list}
                    /> 
                </Modal>
                <View style={{ margin: 5, width: '100%' }}>


                    <TouchableOpacity style={{
                        flexDirection: 'row', backgroundColor: '#A7FFEB',
                      borderRadius:15,
                        marginTop: 5, marginBottom: 5
                    }} onPress={() => this.toggleChatScreen()}  >
                        <View style={{margin:2,
                            width: '98%', alignItems: 'center', justifyContent: 'center',
                            borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 10, height: 60,
                            width: 60, borderRadius: 30, backgroundColor: 'green'
                        }}>

                            <Image
                                source={{ uri: list.imageUrl === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfb4boKKaHu5x1oFASsO92hJb-78nyVcFKRT_WxvRf1O165kUOYWfa0uGn12tfdw8uRU&usqp=CAU' : list.imageUrl }}
                                style={{ height: 60, width: 60, borderRadius: 30 }}
                            />
                        </View>

                        <View>
                            <Text style={{
                                color: '#000', fontSize: 16,
                                fontWeight: 'bold', width: '92%', alignItems: 'flex-start',
                                justifyContent: 'center', marginLeft: 30, top: 10
                            }}>{userName}</Text>
                            <Text style={{
                                color: '#000', fontSize: 14, marginTop: 18,
                                fontWeight: '600', width: '92%', alignItems: 'flex-start', justifyContent: 'center',
                                marginLeft: 20
                            }}>{lastMessage}</Text>

                        </View>
                        <View>

                            <Text style={{
                                marginTop: 22,marginLeft:60,
                                color: '#000', fontSize: 13, fontWeight: '400',
                                width: '92%', alignItems: 'flex-end', justifyContent: 'center',
                            }}>{lastTime}</Text>
                            <Text style={{
                                marginTop: 5,marginLeft:60,
                                color: '#000', fontSize: 13, fontWeight: '400',
                                width: '92%', alignItems: 'flex-end', justifyContent: 'center',
                            }}>{lastDate}</Text>
                        </View>



                    </TouchableOpacity>


                </View>


            </View>

        )
    }


}

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: 'red',
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: 'lightblue',
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 300

    },
    input: {
        borderWidth: 1,
        borderColor: 'orange',
        padding: 8,
        margin: 10,
        width: 150,
    },

    teambutton: {
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    },
    infoBoxWrapper: {
        flexDirection: 'row',
        height: 60,
    },
    infoBox1: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox2: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})
