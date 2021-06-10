import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Firebase from '../Firebase/firebaseConfig';
import { SendMessage, RecieveMessage } from '../Firebase/Messages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImgToBase64 from 'react-native-image-base64';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from "moment";

class ChatScrenn extends Component {
    state = {
        message: '',
        currentUid: '',
        guestUid: '',
        allMessages: [],
        image: '',

    };

    async componentDidMount() {

        const list = this.props.list;
        const userName = list.userName;
       
        const Id = list.uuid;
        const guestUid = Id;
        const currentUid = Firebase.auth().currentUser.uid;
       
        this.setState({ currentUid: currentUid, guestUid: guestUid });

        try {
            Firebase.database().
                ref('messages').
                child(currentUid).
                child(guestUid).
                on("value", (dataSnapshot) => {
                    let message = [];
                    dataSnapshot.forEach((data) => {
                        message.push({
                            sendBy: data.val().message.sender,
                            recieveBy: data.val().message.reciever,
                            msg: data.val().message.msg,
                            image: data.val().message.image,
                            date: data.val().message.date,
                            time: data.val().message.time,
                        });
                    })
                    this.setState({ allMessages: message.reverse() });

                })
        } catch (error) {
           
        }


    }

    openGallery() {
        const list = this.props.list;
        const userName = list.userName;
       
        const Id = list.uuid;
        const guestUid = Id;
        const currentUid = Firebase.auth().currentUser.uid;
       
        this.setState({ currentUid: currentUid, guestUid: guestUid });

        launchImageLibrary('photo', (response) => {
            this.setState({ loader: true });
            this.setState({ imageUrl: response.uri });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    let source = "data:image/jpeg;base64," + base64String;
                    SendMessage(this.state.currentUid, this.state.guestUid, "", source).
                        then((res) => {
                            this.setState({ loader: false })
                        }).catch((err) => {
                            alert(err)
                        })

                    RecieveMessage(this.state.currentUid, this.state.guestUid, "", source).
                        then((res) => {
                            this.setState({ loader: false })
                        }).catch((err) => {
                            alert(err)
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }

    sendMessage = async () => {
        const list = this.props.list;
        const userName = list.userName;
       
        const Id = list.uuid;
        const guestUid = Id;
        const currentUid = Firebase.auth().currentUser.uid;
       
        this.setState({ currentUid: currentUid, guestUid: guestUid });

        if (this.state.message) {
            SendMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
                then((res) => {
                    console.log(res);
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err)
                })

            RecieveMessage(this.state.currentUid, this.state.guestUid, this.state.message, "").
                then((res) => {
                    console.log(res);
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err)
                })

        }
    }


    render() {
     
        const list = this.props.list;
        const userName = list.userName;
        return (

            <KeyboardAvoidingView style={styles.containerh} >
                <View style={{
                    height: 70, width: '100%', position: 'absolute', top: 0,
                    backgroundColor: '#00BFA5' }}>
                    <View style={{ flexDirection: 'row', top: 5 }}>
                        <View style={{ alignContent: 'center', width: 30 }}>
                            <TouchableOpacity
                                onPress={this.props.closeModal}
                                style={{ left: 10,marginTop:15,margin:5 }} >
                                <Icon name='arrow-back' size={30} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', left: 55, alignContent: 'center',marginTop:15 }}>
                            <Text style={{ alignContent: 'center', fontWeight: 'bold', fontSize: 22, alignItems: 'center' }}>
                                {userName} 
                            </Text>
                        </View>

                        <View style={{margin:0,
                            width: '98%', alignItems: 'flex-end', justifyContent: 'flex-end',
                             height: 60,left:180,
                            width: 60, borderRadius: 30, backgroundColor: 'green' }}>


                            <Image
                                source={{ uri: list.imageUrl === '' ? 
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfb4boKKaHu5x1oFASsO92hJb-78nyVcFKRT_WxvRf1O165kUOYWfa0uGn12tfdw8uRU&usqp=CAU'
                                 : list.imageUrl }}
                                style={{ height: 60, width: 60, borderRadius: 30 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{width:'100%',top:300, position:'absolute', bottom:0}} >
                    <View style={{ bottom: 0, height: 80, width: '100%', backgroundColor: '#00BFA5', position: 'absolute', flexDirection: 'row', }}>
                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} onPress={() => this.openGallery()}>
                            <Icon name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <TextInput value={this.state.message}
                            onChangeText={(text) => this.setState({ message: text })} placeholder="Enter Message" placeholderTextColor="gray" 
                            style={{ height: 55, borderRadius: 20, width: '100%', backgroundColor: '#fff' }} />
                        </View>
                        <TouchableOpacity onPress={() => this.sendMessage()} style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 15 }} >
                            <Icon name="send" size={30} color='black' />
                        </TouchableOpacity>
                    </View>

                </View>
                

                     <FlatList
                                inverted
                                style={{ marginBottom: 90 }}
                                data={this.state.allMessages}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                                        <View style={{ borderRadius: 20, backgroundColor: this.state.currentUid === item.sendBy ? '#C8E6C9' : '#fff' }}>
                                            {item.image === "" ? <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
                                                {item.msg} {""} <Text style={{ fontSize: 10, }}>{item.time}</Text>
                                            </Text> :
                                                <View>
                                                    <Image source={{ uri: item.image }} style={{ width: Dimensions.get('window').width / 2 + 10, height: 150, resizeMode: 'stretch', borderRadius: 30 }} />
                                                    <Text style={{ fontSize: 10, position: 'absolute', bottom: 5, right: 5 }}>{item.time}</Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                )}
                            /> 

             


            </KeyboardAvoidingView>
        );
    }
}
export default ChatScrenn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    containerh: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        width: 500,
        height: 770,
        borderRadius: 500 / 2,
        backgroundColor: "green",
        position: "absolute",
        left: -120,
        top: -20
    },
    header: {
        fontWeight: "800",
        fontSize: 30,
        color: "blue",
        marginTop: 200

    },
    input: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        borderRadius: 30,
        paddingHorizontal: 16,
        color: "#514e5a",
        fontWeight: "600",
    },
    btnContainer: {
        backgroundColor: '#F9813A',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
