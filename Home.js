import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    btnPressAction=route=>{
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <TouchableOpacity style={Styles.button} onPress={()=>this.btnPressAction('signup')}>
                    <Text style={Styles.btnTxt}>Sign Up Form</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.button} onPress={()=>this.btnPressAction('tvideo')}>
                    <Text style={Styles.btnTxt}>Twilio Video Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.button} onPress={()=>this.btnPressAction('slides')}>
                    <Text style={Styles.btnTxt}>Slide Animation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.button} onPress={()=>this.btnPressAction('deeplinked')}>
                    <Text style={Styles.btnTxt}>Deep Linked Screen</Text>
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
        backgroundColor:'#d3d3d3',
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius:4
    },
    btnTxt:{
        fontWeight:'500',
        color:'#fff',
        fontSize:16
    }
})