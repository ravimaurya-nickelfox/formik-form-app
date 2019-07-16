import React, { Component } from 'react'
import { Text, View, SafeAreaView, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import SendBirdLib from './SendBirdLib';
import { ReceiverBuuble, SenderBubble, ChatMenues, TypingBubble } from './ChatComponents';

export default class SendBirdView extends Component {
    static navigationOptions = {
        header:null
    }
    constructor(props){
        super(props)
        this.state = {
            showChatMenu:false
        }
        this.messageHandlerId = Math.floor(Math.random()*100000000)
    }

    componentDidMount(){
        SendBirdLib.senderUser = 'user-test-01';
        SendBirdLib.participentUser = 'user-test-02'
        SendBirdLib.connectUser().then((user)=>{
            console.log(user);
            SendBirdLib.createChannel().then((channel)=>{
                SendBirdLib.connectToChannel()
                .then((connect)=>console.log('Channel Connected',connect))
                .catch(c=>console.log(c))
                SendBirdLib.getChannelMessages()
                .then((messages)=>console.log('Prev Messages',messages))
                .catch(c=>console.log(c))
                this.messageObserver()
            }).catch(c=>console.log(c))
        }).catch(c=>console.log(c))
    }

    sendMessage=(payload)=>{
        let messageParam = SendBirdLib.messageParams;
        messageParam.message = 'Hello A';
        SendBirdLib.sendMessage(messageParam).then((res)=>{
            console.log(res)
        }).catch(c=>console.log(c))
    }

    messageObserver =()=>{
        var handler = new SendBirdLib.libSendBird.ChannelHandler()
        handler.onMessageReceived = function(channel,message){
            console.log(channel,message)
        }
        SendBirdLib.libSendBird.addChannelHandler(this.messageHandlerId,handler)
    }

    componentWillUnmount(){
        SendBirdLib.libSendBird.removeChannelHandler(this.messageHandlerId)
    }

    backButtonHandler =()=> {
        this.props.navigation.pop()
    }

    chatMenuToggle =()=> {
        this.setState({showChatMenu:!this.state.showChatMenu})
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.buttons} onPress={this.backButtonHandler}>
                        <Image
                            source={require('./assets/icons/back/back.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerCenteralView}>
                        <Image 
                            source={require('./assets/cat.jpg')}
                            style={styles.headerTumbnail}
                        />
                        <Text style={styles.participantText}>Queen Cat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={this.chatMenuToggle}>
                        <Image
                            source={require('./assets/icons/vertical_dots/vertical_dots.png')}
                        />
                    </TouchableOpacity>
                </View>
                
                <ScrollView
                    contentContainerStyle={{paddingBottom:60}}                
                >
                    <View style={{padding:10}}>
                        <ReceiverBuuble/>
                        <ReceiverBuuble/>
                        <SenderBubble/>
                        <SenderBubble/>
                        <ReceiverBuuble/>
                        <SenderBubble/>
                        <ReceiverBuuble/>
                        {/* <TypingBubble/> */}
                    </View>
                </ScrollView>
                
                <KeyboardAvoidingView behavior={'position'}>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomGroupWrapper}>
                            <View style={styles.inputGroupWrapper}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('./assets/icons/smile_emoticon/smile_emoticon.png')}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    placeholder={'Type your messages ...'}
                                    style={styles.inputField}
                                    placeholderTextColor={'#668391'}
                                    multiline
                                />
                            </View>
                            <TouchableOpacity style={styles.sendButtonWrapper}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>

                { this.state.showChatMenu && <ChatMenues {...this.props} toggle={this.chatMenuToggle} />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    headerView:{
        paddingHorizontal:3,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5,
        alignItems:'center',
        backgroundColor:'#fff',
        shadowColor:'#ddd',
        shadowOffset:{
            height:4,
            width:0
        },
        shadowOpacity:0.55
    },
    buttons:{
        padding:15
    },
    headerCenteralView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    headerTumbnail:{
        height:36,
        width:36,
        borderRadius:18,
        resizeMode:'contain'
    },
    participantText:{
        fontSize:17,
        fontFamily:'Helvetica',
        fontWeight:'bold',
        paddingStart:5
    },
    bottomView:{
        position:'absolute',
        width:'100%',
        bottom:0,
        flex:1,
        shadowColor:'#d8d8d8',
        shadowOffset:{
            height:-3,
            width:0
        },
        shadowOpacity:0.3,
        shadowRadius:4,
        backgroundColor:'#fff'
    },
    bottomGroupWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        flex:1
    },
    inputGroupWrapper:{
        flexDirection:'row',
        borderEndWidth:2,
        borderEndColor:'#d8d8d8',
        flex:1,
        padding:5,
        alignItems:'center'
    },
    sendButtonWrapper:{
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center'
    },
    sendButtonText:{
        color:'#00E2B2',
        fontFamily:'Helvetica',
        fontSize:16,
        fontWeight:'bold'
    },
    inputField:{
        marginStart:10,
        fontFamily:'Helvetica',
        fontSize:15,
        color:'#668391',
        maxHeight:60,
        flex:1
    }
})