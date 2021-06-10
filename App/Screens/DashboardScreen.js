import React, { useState } from 'react';
import { Text, StyleSheet, View,Modal, Image, FlatList, Alert, KeyboardAvoidingView,
    ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from '../Components/AppHeader'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { UpdateUserImage } from '../Firebase/Users';
import getParam from 'react-navigation'



export default class DashboardScreen extends React.Component {

    state = {
        allUser: [],
        imageUrl: '',
        addTodoVisible:false,
        userName: 'user',
        loggedInUserName: '',
        loader: false,
    }
 
    async componentDidMount() {
        try {
            await Firebase.database().ref('users')
                .on("value", async (datasnapshot) => {
                    const uuid = Firebase.auth().currentUser.uid;

                    new Promise((resolve, reject) => {
                        let users = [];
                        let lastMessage = '';
                        let lastDate = '';
                        let lastTime = '';
                        let properDate = '';
                        datasnapshot.forEach((child) => {
                            if (child.val().uid === uuid) {
                                this.setState({
                                    imageUrl: child.val().image,
                                    userName: child.val().name
                                })
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
                                    Firebase.database().ref("messages")
                                        .child(uuid).child(child.val().uid).orderByKey().limitToLast(1).on("value", (dataSnapshots) => {
                                            if (dataSnapshots.val()) {
                                                dataSnapshots.forEach((child) => {
                                                    lastMessage = child.val().message.image !== '' ? 'Photo' : child.val().message.msg;
                                                    lastDate = child.val().message.date;
                                                    lastTime = child.val().message.time;
                                                    properDate = child.val().message.date + " " + child.val().message.time;
                                                });
                                            }
                                            else {
                                                lastMessage = '';
                                                lastDate = '';
                                                lastTime = '';
                                                properDate = '';
                                            }
                                            newUser.userId = child.val().uid;
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
                                    this.setState({ allUser: users.sort((a, b) => b.properDate - a.properDate) });
                                });
                                return resolve(users);
                            }
                        });
                    }).then((users) => {
                        this.setState({ allUser: users.sort((a, b) => b.properDate - a.properDate) });
                    })

                });
        } catch (error) {
            alert(error);
        }


    }


    logOut = async () => {
        await Firebase.auth().signOut().then(() => {
            AsyncStorage.removeItem('UID');
            this.props.navigation.navigate('Splash');
        }).catch((err) => {
            alert(err);
        })
    }


    openGallery() {
        launchImageLibrary('photo', (response) => {

            this.setState({ imageUrl: response.uri });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    const uid = Firebase.auth().currentUser.uid;
                    let source = "data:image/jpeg;base64," + base64String;
                    UpdateUserImage(source, uid).
                        then(() => {
                            this.setState({ imageUrl: response.uri });
                        })
                })
                .catch(err => this.setState({}));
        })
    }


    render() {

        return (
       
            <View style={{ alignContent: 'center', alignItems: 'center',backgroundColor:'#BBDEFB' }}>
                <Text style={{ fontSize: 30, marginTop: 20 }} >Chat APP</Text>
               
                <AppHeader title="Messages" navigation={this.props.navigation} />
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text style={{ fontSize: 20, margin: 10 }}>Log out</Text>
                </TouchableOpacity>



                <View style={{ marginTop: 15, marginBottom: 50, margin: 2 }}>
                    <ScrollView>
                        <SafeAreaView>
                            <FlatList
                                alwaysBounceVertical={false}
                                data={this.state.allUser}
                                style={{ padding: 20 }}
                                keyExtractor={(_, index) => index.toString()}
                                ListHeaderComponent={
                                    <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: '#F9813A' }} onPress={() => { this.openGallery() }}>

                                            <Image
                                                source={{ uri: this.state.imageUrl === '' ? '' : this.state.imageUrl }}
                                                style={{ height: 120, width: 120, borderRadius: 60 }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{ color: '#000', fontSize: 20,margin:18, fontWeight: 'bold' }}>{this.state.userName}</Text>
                                    </View>
                                }
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ flexDirection: 'row' }}
                                        onPress={() => this.props.navigation.navigate('ChatScreen', { UserName: item.userName, guestUid: item.uuid,guestimage:item.imageUrl })} >
                                        <View style={{ borderRadius: 50, margin: 20, backgroundColor: 'yellow', width: '15%', alignContent: 'center', alignItems: 'center' }}>
                                            <Image source={{ uri: item.imageUrl === '' ? '' : item.imageUrl }}
                                                style={{ height: 60, width: 60, borderRadius: 30 }} />
                                        </View>
                                        <View style={{ width: '90%', margin: 20, borderBottomWidth: 3, borderBottomColor: 'gray' }}>
                                            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>{item.userName}</Text>
                                            <Text style={{ fontSize: 15 }}> {item.lastMessage}
                                            <Text style={{fontSize:12}}>  {item.lastTime}</Text>
                                            <Text style={{fontSize:12}}>  {item.lastDate}</Text>
                                            </Text>
                                            
                                            
                                        </View>
                                        

                                    </TouchableOpacity>

                                )}
                            />
                              <View style={{ height: 100 }} ></View>
                        </SafeAreaView>
                    </ScrollView>
                    <View style={{ height: 500 }} ></View>


                </View>

            </View>

          

        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        fontWeight: 'bold',
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
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
