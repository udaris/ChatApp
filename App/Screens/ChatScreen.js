import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions, ScrollView, SafeAreaView, KeyboardAvoidingView,
  TextInput, TouchableOpacity, FlatList
} from 'react-native';
import Firebase from '../Firebase/firebaseConfig';
import { SendMessage, RecieveMessage } from '../Firebase/Message';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../Components/AppHeader'
import ImgToBase64 from 'react-native-image-base64';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import getParam from 'react-navigation'
import moment from 'moment';

class ChatScreen extends Component {

  state = {
    message: '',
    currentUid: '',
    guestUid: '',
    allMessages: [],
    image: '',
    gusetimage: ''

  };

  async componentDidMount() {
    const currentUid = await AsyncStorage.getItem('UID');
    const guestUid = this.props.navigation.getParam('guestUid');
    const guestimg = this.props.navigation.getParam('guestimage');
    this.setState({ currentUid: currentUid, guestUid: guestUid, gusetimage: guestimg });

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
      alert(error);
    }
  }

  openGallery() {
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

    return (




      <View style={style.container}>

        <AppHeader title={this.props.navigation.getParam('UserName')} navigation={this.props.navigation} />

        <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: 'yellow' }} >
            <Image
              source={{ uri: this.state.gusetimage === '' ? '' : this.state.gusetimage }}
              style={{ height: 120, width: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView  >
          <View>
            <FlatList
              inverted
              style={{ marginBottom: 60 }}
              data={this.state.allMessages}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => (

                <View style={{ marginVertical: 5, maxWidth: Dimensions.get('window').width / 2 + 10, alignSelf: this.state.currentUid === item.sendBy ? 'flex-end' : 'flex-start' }}>
                  <View style={{ borderRadius: 20, backgroundColor: this.state.currentUid === item.sendBy ? 'white' : 'grey' }}>
                    {item.image === "" ?
                      <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
                        {item.msg} {" "} <Text style={{ fontSize: 10, }}> {item.time} </Text>
                      </Text>
                      :
                      <View>
                        <Image source={{ uri: item.image }}
                          style={{
                            width: Dimensions.get('window').width / 2 + 10, height: 150,
                            borderRadius: 20
                          }} />
                        <Text style={{ fontSize: 10, position: 'absolute', bottom: 5, right: 5 }}> {item.time} </Text>
                      </View>

                    }
                  </View>
                </View>

              )}

            />
          </View>
        </ScrollView>


        <View style={{
          borderTopLeftRadius: 15, borderTopRightRadius: 15,
          bottom: 0, top: 685, position: 'absolute', height: 67, width: '100%',
          flexDirection: 'row', backgroundColor: '#3949AB'
        }}>
          <TouchableOpacity style={{
            width: '10%', justifyContent: 'center',
            alignItems: 'center', marginRight: 5
          }} onPress={() => this.openGallery()}>
            <Icon name="camera" size={30} color="black" />
          </TouchableOpacity>
          <View style={{ width: '80%', justifyContent: 'center' }}>
            <TextInput style={{
              height: 40, borderRadius: 20, width: '100%', backgroundColor: '#fff'
            }}
              value={this.state.message}
              onChangeText={(text) => this.setState({ message: text })}
              placeholder="Enter Massage" />
          </View>
          <TouchableOpacity onPress={() => this.sendMessage()}
            style={{
              width: '10%', justifyContent: 'center', alignItems: 'center',
              marginRight: 5
            }} >
            <Icon name="send" size={30} color='black' />
          </TouchableOpacity>
        </View>



      </View>

    );
  }
}
export default ChatScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9FA8DA',
  },
  circle: {
    width: 550,
    height: 550,
    borderRadius: 500 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  containerh: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514e5a',
  },
  input: {
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514e5a',
    fontWeight: '600',
  },
});
