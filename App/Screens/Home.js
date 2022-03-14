import React, { Component } from "react";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import Firebase from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from "react-native-loading-spinner-overlay/lib";
import AppHeader from "../Components/AppHeader";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { UpdateUserImage } from '../Firebase/Users';
import ImgToBase64 from 'react-native-image-base64';

class Home extends Component {
    state = {
        allUsers: [],
        loader: false,
        imageUrl: '',
        loggedInUserName: ''
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true })
            await Firebase.database().ref('users')
                .on("value", async (datasnapshot) => {
                    //const uuid = await AsyncStorage.getItem('UID');
                    const uuid = Firebase.auth().currentUser.uid;
                    new Promise((resolve, reject) => {
                        let users = [];
                        let lastMessage = '';
                        let lastDate = '';
                        let lastTime = '';
                        let properDate = '';
                        datasnapshot.forEach((child) => {
                            if (child.val().userId === uuid) {
                                
                                this.setState({ loggedInUserName: child.val().name, imageUrl: child.val().image })
                            }
                            else {
                                let newUser = {
                                    userId: '',
                                    userName: '',
                                    userProPic: '',
                                    lastMessage: '',
                                    lastDate: '',
                                    lastTime: '',
                                    properDate: ''
                                }
                                new Promise((resolve, reject) => {
                                    Firebase.database().ref('messages').
                                        child(uuid).child(child.val().userId).orderByKey().limitToLast(1).on('value', (dataSnapshots) => {
                                            if (dataSnapshots.val()) {
                                                dataSnapshots.forEach((child) => {
                                                    lastMessage = child.val().message.image !== '' ? 'Photo' : child.val().message.msg;
                                                    lastDate = child.val().message.date;
                                                    lastTime = child.val().message.time;
                                                    properDate = child.val().message.date + " " + child.val().message.time
                                                });
                                            }
                                            else {
                                                lastMessage = '';
                                                lastDate = '';
                                                lastTime = '';
                                                properDate = '';
                                            }
                                            newUser.userId = child.val().userId;
                                            newUser.userName = child.val().name;
                                            newUser.userProPic = child.val().image;
                                            newUser.lastMessage = lastMessage;
                                            newUser.lastTime = lastTime;
                                            newUser.lastDate = lastDate;
                                            newUser.properDate = properDate;
                                            return resolve(newUser);
                                        });
                                }).then((newUser) => {
                                    users.push({
                                        userName: newUser.userName,
                                        uuid: newUser.userId,
                                        imageUrl: newUser.userProPic,
                                        lastMessage: newUser.lastMessage,
                                        lastTime: newUser.lastTime,
                                        lastDate: newUser.lastDate,
                                        properDate: newUser.lastDate ? new Date(newUser.properDate) : null
                                    });
                                    this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                                });
                                return resolve(users);
                            }
                        });
                    }).then((users) => {
                        this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                    })
                    this.setState({ loader: false })
                })
        } catch (error) {
            alert(error);
            this.setState({ loader: false })
        }
    }

    logOut = async () => {
        await Firebase.auth().signOut().then(async () => {
            await AsyncStorage.removeItem('UID');
            this.props.navigation.navigate('Login');
        }).catch((err) => {
            alert(err);
        })
    }

    openGallery() {
        launchImageLibrary('photo', (response) => {

            this.setState({ loader: true });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    const uid = await AsyncStorage.getItem('UID');
                    let source = "data:image/jpeg;base64," + base64String;
                    UpdateUserImage(source, uid).
                        then(() => {
                            this.setState({ imageUrl: response.uri, loader: false });
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#1A237E' }}>
                <AppHeader title="Messages" navigation={this.props.navigation} onPress={() => this.logOut()} />
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.allUsers}
                    style={{ padding: 5 }}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 90, width: 90, borderRadius: 45 }} onPress={() => { this.openGallery() }}>
                                <Image source={{ uri: this.state.imageUrl === '' ? 'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png' : this.state.imageUrl }} style={{ height: 90, width: 90, borderRadius: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ color: 'blue', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.state.loggedInUserName}</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', margin: 6, borderBottomWidth: 2, borderBottomColor: 'grey', backgroundColor: 'lightblue', borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Chat', { UserName: item.userName, guestUid: item.uuid, guestimage:item.imageUrl })}>
                            <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: item.imageUrl === '' ? 'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png' : item.imageUrl }} style={{
                                    width: 60, height: 60, borderRadius: 40
                                }} />
                            </View>
                            <View style={{ width: '60%', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.userName}</Text>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '600' }}>{item.lastMessage}</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                                    <Text style={{ color: '#000', fontSize: 13, fontWeight: '400' }}>{item.lastTime}</Text>
                                    <Text style={{fontSize:11, right:5}}>  {item.lastDate}</Text>
                                </View>
                        </TouchableOpacity>

                    )}

                    ListFooterComponent={
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.logOut() }}>
                            <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold' }}>Log Out</Text>
                        </TouchableOpacity>
                    }
                />
                <Spinner visible={this.state.loader} />
            </View>
        )
    }
}

export default Home;