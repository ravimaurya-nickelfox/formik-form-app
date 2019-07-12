import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import SendBird from 'sendbird'

const SB_APP_ID = '609B359F-699F-4E48-970C-9202A1574D9D'

export default class SendBirdView extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.libSendBird = null;
    }

    componentDidMount(){
        this.libSendBird = new SendBird({appId:SB_APP_ID})
        console.log(this.libSendBird)
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Text> textInComponent </Text>
            </SafeAreaView>
        )
    }
}
