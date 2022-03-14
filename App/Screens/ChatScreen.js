import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from "react-native";
import Firebase from '../Firebase/firebaseConfig';
import Spinner from "react-native-loading-spinner-overlay/lib";
import AsyncStorage from "@react-native-community/async-storage";
import AppHeader from "../Components/AppHeader";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { SendMeassage, ReceiveMeassage } from '../Firebase/Message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import moment from "moment";

class Chat extends Component {
    state = {
        message: "",
        guestUid: '',
        currentUid: '',
        AllMessages: [],
        image: '',
        gusetImage: ''
    }


    async componentDidMount() {
        const currentUid = await AsyncStorage.getItem('UID');
        const guestUid = this.props.navigation.getParam('guestUid');
        const guestimage=this.props.navigation.getParam('guestimage');
        this.setState({ currentUid: currentUid, guestUid: guestUid, gusetImage:guestimage });

        try {
            Firebase.database()
                .ref('messages')
                .child(currentUid)
                .child(guestUid)
                .on("value", (datasnapshot) => {
                    let message = [];
                    datasnapshot.forEach((data) => {
                        message.push({
                            sendBy: data.val().message.sender,
                            recieveBy: data.val().message.receiver,
                            msg: data.val().message.msg,
                            image: data.val().message.image,
                            date: data.val().message.date,
                            time: data.val().message.time
                        });
                    })
                    this.setState({ AllMessages: message.reverse() });
                    console.log('allMessages', this.state.AllMessages)
                })
        } catch (error) {
            alert(error);
        }


    }

    sendMessage = async () => {
        if (this.state.message) {
            SendMeassage(this.state.currentUid, this.state.guestUid, this.state.message, "")
                .then(() => {
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err);
                })

            ReceiveMeassage(this.state.currentUid, this.state.guestUid, this.state.message, "")
                .then(() => {
                    this.setState({ message: '' })
                }).catch((err) => {
                    alert(err);
                })
        }
    }

    openGallery() {
        launchImageLibrary('photo', (response) => {
            this.setState({ loader: true });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    let source = "data:image/jpeg;base64," + base64String;

                    SendMeassage(this.state.currentUid, this.state.guestUid, "", source)
                        .then((res) => {
                        }).catch((err) => {
                            alert(err);
                        })

                    ReceiveMeassage(this.state.currentUid, this.state.guestUid, "", source)
                        .then((res) => {
                        }).catch((err) => {
                            alert(err);
                        })

                })
                .catch(err => this.setState({ loader: false }));
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0277BD' }} >
                <AppHeader title={this.props.navigation.getParam('UserName')} navigation={this.props.navigation} />
                <View style={{alignContent:'center',alignItems:'center'}}>
                <Image
              source={{ uri: this.state.gusetImage === '' ? 'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png'  : this.state.gusetImage }}
              style={{ height: 120, width: 120, borderRadius: 60 }}
            />
                </View>
          
                <FlatList
                    inverted
                    style={{ marginBottom: 60 }}
                    data={this.state.AllMessages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ maxWidth: Dimensions.get('window').width / 2 + 10, margin: 5, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                            <View style={{ borderRadius: 20, backgroundColor: this.state.currentUid === item.sendBy ? '#4FC3F7' : '#B3E5FC' }}>
                                {item.image === "" ?
                                 <Text style={{ padding: 10, fontWeight: 'bold' }}>{item.msg} {"  "}<Text style={{fontWeight:'100', color:'grey', fontSize:12}}>{item.time}</Text></Text>

                                 :
                                 <View>
                                    <Image style={{ resizeMode: 'stretch', borderRadius: 10, width: Dimensions.get('window').width / 2 + 10, height: 100 }} source={{ uri: item.image }}></Image>

                                    <Text style={{fontWeight:'100', color:'black', fontSize:12, position:'absolute', bottom:1, right:5}}>{item.time}</Text>
                                    </View>}
                            </View>
                        </View>
                    )}
                />


                <View style={{ bottom: 0, height: 50, width: '100%', position: 'absolute', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} onPress={() => this.openGallery()} >
                        <Icons name="camera" size={30} color='#000' />
                    </TouchableOpacity>

                    <View style={{ width: '75%', justifyContent: 'center' }}>
                        <TextInput value={this.state.message} onChangeText={(text) => this.setState({ message: text })} placeholder="Enter Message" placeholderTextColor="#000" style={{ height: 40, borderRadius: 20, backgroundColor: 'grey' }}></TextInput>
                    </View>

                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={() => this.sendMessage()}>
                        <Icons name="send" size={30} color='#000' />
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

export default Chat;