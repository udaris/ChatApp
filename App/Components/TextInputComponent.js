import React, {Component} from "react";
import {Text, TextInput, View, StyleSheet} from 'react-native';

class TextInputComponent extends Component{
    render(){
        const {placeholder, updateFields,}=this.props;

        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} 
                onChangeText={text => updateFields(text)}
                secureTextEntry={placeholder=="Enter Password " ? true:false}
                placeholder={placeholder} placeholderTextColor='black'/>

              
            </View>
        )
    }
}

const styles=StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:15,
        height:50,
        marginBottom:10,
        width:'85%',
        backgroundColor:'#B0BEC5'
    },
    textInput:{
        paddingHorizontal:10,
        width:'90%',
        paddingVertical:0,
        color:'white',
    }
});

export default TextInputComponent;