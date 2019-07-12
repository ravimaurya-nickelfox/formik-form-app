import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
const sendbird = require('sendbird')



export default class SendBirdView extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        console.log(sendbird)
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Text> textInComponent </Text>
            </SafeAreaView>
        )
    }
}
