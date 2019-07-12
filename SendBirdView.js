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
        this.chatChannel = null;
    }

    componentDidMount(){
        this.libSendBird = new SendBird({appId:SB_APP_ID})
        console.log(this.libSendBird)
        this.connectToUser()
    }

    connectToUser=()=>{
        this.libSendBird.connect('user-test-01',(user,error)=>{
            console.log('User connected ',user,error)
        });
        this.createChannel()
    }

    createChannel=()=>{
        this.libSendBird.OpenChannel.createChannel((openChannel,error)=>{
            console.log('Channel created',openChannel,error)
            this.chatChannel = openChannel;
            this.enterToChannel()
        })
    }

    enterToChannel=()=>{
        this.chatChannel.enter((res,err)=>{
            console.log(res,err)
        })
    }

    sendMessage=(payload)=>{
        this.chatChannel.sendUserMessage('Hello',(res,err)=>{
            console.log(res,err)
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Text> textInComponent </Text>
            </SafeAreaView>
        )
    }
}
