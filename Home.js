import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import SendBirdLib from './SendBirdLib';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    btnPressAction=route=>{
        this.props.navigation.navigate(route)
    }

    createUser =()=> {
        let url = `https://sendbird.com/main/img/profiles/profile_0${Math.floor(Math.random()*10)}_512px.png`
        const userData = {
            "user_id": "user-id-06",
            "nickname": "David Hussey",
            "profile_url": url
        }
        SendBirdLib.createUser(userData)
        .then((res)=>{
            if(res.error) {
                alert(res.message);
                return;
            }
            console.log(res)
        }).catch(c=>console.log(c))
    }

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('signup')}>
                    <Text style={Styles.btnTxt}>Sign Up Form</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('tvideo')}>
                    <Text style={Styles.btnTxt}>Twilio Video Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('slides')}>
                    <Text style={Styles.btnTxt}>Slide Animation</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('deeplinked')}>
                    <Text style={Styles.btnTxt}>Deep Linked Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('form')}>
                    <Text style={Styles.btnTxt}>Forms</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('analytics')}>
                    <Text style={Styles.btnTxt}>Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={this.createUser}>
                    <Text style={Styles.btnTxt}>Register User</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={()=>this.btnPressAction('contacts')}>
                    <Text style={Styles.btnTxt}>Open Chat</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'rgb(37,134,227)',
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius:4,
        marginBottom:15
    },
    btnTxt:{
        fontWeight:'500',
        color:'#fff',
        fontSize:16
    }
})