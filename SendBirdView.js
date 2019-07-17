import React, { Component } from 'react'
import { 
        Text, 
        View, 
        SafeAreaView, 
        StyleSheet, 
        TouchableOpacity, 
        Image, 
        TextInput, 
        KeyboardAvoidingView,
        Keyboard,
        Animated,
        Dimensions
 } from 'react-native'
import SendBirdLib from './SendBirdLib';
import { ReceiverBuuble, SenderBubble, ChatMenues, TypingBubble, DeleteChatPop, ClearChatPop } from './ChatComponents';

const { height } = Dimensions.get('screen')

export default class SendBirdView extends Component {
    static navigationOptions = {
        header:null
    }
    constructor(props){
        super(props)
        this.flatlistMinPadding = 50
        this.flatListMaxPadding = height/2.3
        this.messageHandlerId = Math.floor(Math.random()*100000000)
        this.typingHandlerId = Math.floor(Math.random()*100000000)
        this.state = {
            showChatMenu:false,
            oldMessages:[],
            inputText:'',
            animatedPadding: new Animated.Value(this.flatlistMinPadding),
            channelId: this.props.navigation.state.params.channelId,
            frinedUser: this.props.navigation.state.params.friend,
            showEmojiPanel:false,
            showDeletePopUp:false,
            showClearChatPopUp:false
        }
    }

    componentDidMount(){
        SendBirdLib.participentUser = this.state.frinedUser.userId
        SendBirdLib.reconnectUser()
        SendBirdLib.connectToChannel(this.state.channelId)
        .then((connect)=>console.log('Channel Connected',connect))
        .catch(c=>console.log(c))
        SendBirdLib.getChannelMessages()
        .then((oldMessages)=>{
            console.log('Prev Messages',oldMessages)
            this.setState({oldMessages});
            SendBirdLib.markMessageAsRead()
        }).catch(c=>console.log(c))
        this.eventObservers()
        this.keyboardListener()
    }

    keyboardListener =()=> {
        Keyboard.addListener('keyboardDidShow',()=>{
            SendBirdLib.updateTypingStatus(true)
            Animated.timing(this.state.animatedPadding,{
                toValue:this.flatListMaxPadding,
                duration:500
            }).start()
        })
        Keyboard.addListener('keyboardDidHide',()=>{
            SendBirdLib.updateTypingStatus(false)
            this.setState({animatedPadding:new Animated.Value(this.flatListMaxPadding)},()=>{
                Animated.timing(this.state.animatedPadding,{
                    toValue:this.flatlistMinPadding,
                    duration:500
                }).start()
            })
        })
    }

    sendMessage =()=> {
        if(this.state.inputText.trim().length == 0) {
            return;
        }
        let messageParam = SendBirdLib.messageParams;
        messageParam.message = this.state.inputText.trim();
        SendBirdLib.sendMessage(messageParam).then((res)=>{
            this.setState({inputText:''},()=>{
                this.updateMessages(res);
            })
        }).catch(c=>console.log(c))
    }

    updateMessages =(res)=> {
        var { oldMessages } = this.state
        oldMessages = [res,...oldMessages]
        this.setState({oldMessages})
        SendBirdLib.markMessageAsRead()
    }

    eventObservers =()=>{
        var handler = new SendBirdLib.libSendBird.ChannelHandler()
        const SendBirdView = this
        handler.onMessageReceived = function(channel,message){
            console.log(channel,message)
            SendBirdView.setParticipantTypingEnd()
            SendBirdView.updateMessages(message)
        }
        handler.onTypingStatusUpdated = function(channel){
            var member = channel.getTypingMembers()
            console.log(member)
        }
        SendBirdLib.libSendBird.addChannelHandler(this.messageHandlerId,handler)
    }

    setParticipantTypingStart =()=> {
        var { oldMessages } = this.state
        oldMessages = [{typing:true},...oldMessages]
        this.setState({oldMessages})
    }

    setParticipantTypingEnd =()=> {
        var { oldMessages } = this.state
        oldMessages.splice(0,1)
        this.setState({oldMessages})
    }

    componentWillUnmount(){
        SendBirdLib.libSendBird.removeChannelHandler(this.messageHandlerId)
        SendBirdLib.updateTypingStatus(false)
    }

    backButtonHandler =()=> {
        this.props.navigation.pop()
    }

    chatMenuToggle =()=> {
        this.setState({showChatMenu:!this.state.showChatMenu})
    }

    toggleDeletePopUp =()=> {
        this.setState({showChatMenu:false, showDeletePopUp:!this.state.showDeletePopUp})
    }

    toggleClearChatPopUp =()=> {
        this.setState({showChatMenu:false, showClearChatPopUp:!this.state.showClearChatPopUp})
    }

    clearChat =()=> {
        this.toggleClearChatPopUp()
        SendBirdLib.clearChatHistory()
        .then((res)=>{
            console.log(res)
        }).catch(c=>console.log(c))
    }

    deleteChat =()=> {
        this.toggleDeletePopUp()
        SendBirdLib.deleteChannel()
        .then((res)=>{
            console.log(res)
            this.props.navigation.pop()
        }).catch(c=>console.log(c))
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
                            source={{uri : this.state.frinedUser.profileUrl}}
                            style={styles.headerTumbnail}
                        />
                        <Text style={styles.participantText}>{this.state.frinedUser.userId}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={this.chatMenuToggle}>
                        <Image
                            source={require('./assets/icons/vertical_dots/vertical_dots.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Animated.FlatList
                    data={this.state.oldMessages}
                    renderItem={({item,index})=>
                        <View key={'chats'+index.toString()} style={{paddingHorizontal:10}}>
                            {
                                item._sender && item._sender.userId == SendBirdLib.senderUser &&
                                <SenderBubble {...this.props} {...item} />
                            }
                            {
                                 item._sender && item._sender.userId == SendBirdLib.participentUser &&
                                <ReceiverBuuble {...this.props} {...item} />
                            }
                            {
                                item.typing && 
                                <TypingBubble/>
                            }
                        </View>
                    }
                    extraData={this.state}
                    keyExtractor={(item,index)=>index.toString()}
                    contentContainerStyle={{paddingVertical:10}}
                    style={{marginBottom:this.state.animatedPadding}}
                    inverted
                    showsVerticalScrollIndicator={false}
                />
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
                                    onChangeText={(inputText)=>this.setState({inputText})}
                                    value={this.state.inputText.toString()}
                                />
                            </View>
                            <TouchableOpacity 
                                style={styles.sendButtonWrapper}
                                onPress={this.sendMessage}
                            >
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>

                { 
                    this.state.showChatMenu && 
                    <ChatMenues {...this.props} toggle={this.chatMenuToggle} clear={this.toggleClearChatPopUp} delete={this.toggleDeletePopUp} />
                }
                {
                    this.state.showDeletePopUp && 
                    <DeleteChatPop {...this.props} cancel={this.toggleDeletePopUp} delete={this.deleteChat} />
                }
                {
                    this.state.showClearChatPopUp && 
                    <ClearChatPop {...this.props} cancel={this.toggleClearChatPopUp} clear={this.clearChat} />
                }
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
        paddingHorizontal:20,
        flex:1,
        paddingVertical:15
    },
    inputGroupWrapper:{
        flexDirection:'row',
        borderEndWidth:2,
        borderEndColor:'#d8d8d8',
        flex:1,
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
        maxHeight:40,
        flex:1
    }
})