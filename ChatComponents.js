import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Animated, Dimensions, Easing, Platform } from 'react-native'
import dateTime from './Utils';
import SendBirdLib from './SendBirdLib';

const {height} = Dimensions.get('window')

export const ContactCards =props=> {
    const friend = dateTime.getChatFriend(props.members,SendBirdLib.senderUser)
    return(
        <TouchableOpacity 
            style={[styles.contactParentView,styles.contactCardShadow]}
            onPress={()=>props.navigation.navigate('chat',{channelId:props.channelUrl,friend:friend})}
            activeOpacity={0.65}
        >
            <View>
                <Image 
                    source={{uri : friend.profileUrl}}
                    style={styles.contactThumbnail}
                    defaultSource={SendBirdLib.fallbackProfilePic}
                />
                {
                    props.unreadCount > 0 &&
                    <View style={styles.messageCountView}>
                        <Text style={styles.countText}>{props.unreadCount}</Text>
                    </View>
                }
            </View>
            <View style={styles.contactTextView}>
                <View>
                    <Text style={styles.contactNameText}>{friend.nickname}</Text>
                    <Text style={styles.contactMessageText} numberOfLines={1}>
                        {props.message}
                    </Text>
                </View>
                <View>
                    <Text style={styles.lastMessageTimeText}>
                        {props.message ? dateTime.convertTo24Hrs(props.createdAt) : ''}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ReceiverBuuble =props=> {
    return(
        <View style={styles.receiverBubbleView}>
            <View style={{marginEnd:5}}>
                <Image
                    source={require('./assets/cat.jpg')}
                    resizeMode={'contain'}
                    style={styles.thumbnail}
                />
            </View>
            <View style={[{flexDirection:'row'},styles.shadow]}>
                <View style={styles.caretLeft}/>
                <TouchableOpacity style={styles.receiverBubbleMessageContainer} activeOpacity={1}>
                    <Text style={styles.receiverText}>{props.message}</Text>
                    <Text style={styles.receiverTimingText}>{dateTime.convertTo24Hrs(props.createdAt)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const SenderBubble =props=> {
    return(
        <View style={styles.senderBubbleView}>
            <TouchableOpacity style={[styles.senderBubbleMessageContainer,styles.shadow]} activeOpacity={1}>
                <Text style={styles.senderText}>{props.message}</Text>
                <Text style={styles.senderTimingText}>{dateTime.convertTo24Hrs(props.createdAt)}</Text>
            </TouchableOpacity>
            <View style={styles.caretRight}></View>
        </View>
    )
}

export const TypingBubble =props=> {
    const [firstDot,setFirstDot] = useState(new Animated.Value(0))
    const [secondDot,setSecondDot] = useState(new Animated.Value(-10))
    const [thirdDot,setThirdDot] = useState(new Animated.Value(0))
    const AnimationDuration = 250
    const AnimationDelay = 250
    Animated.loop(
        Animated.sequence([
            Animated.timing(firstDot,{toValue:-10,delay:AnimationDelay}),
            Animated.timing(secondDot,{toValue:0,delay:AnimationDelay}),
            Animated.timing(thirdDot,{toValue:-10,delay:AnimationDelay}),
            Animated.timing(firstDot,{toValue:0,duration:AnimationDuration}),
            Animated.timing(secondDot,{toValue:-10,duration:AnimationDuration}),
            Animated.timing(thirdDot,{toValue:0,duration:AnimationDuration})
        ])
    ).start()

    return(
        <View style={[styles.receiverBubbleView,styles.shadow]}>
            <View style={{marginEnd:5}}>
                <Image
                    source={require('./assets/cat.jpg')}
                    resizeMode={'contain'}
                    style={styles.thumbnail}
                />
            </View>
            <View style={styles.caretLeft}/>
            <TouchableOpacity style={styles.receiverBubbleMessageContainer}>
                <View style={styles.typingDotsView}>
                    <Animated.View style={[styles.typingDot,{marginTop:firstDot}]} />
                    <Animated.View style={[styles.typingDot,styles.marginHorizontal,{marginTop:secondDot}]} />
                    <Animated.View style={[styles.typingDot,{marginTop:thirdDot}]} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const ChatMenues =props=> {
    const [animatedBottom, setAnimatedBottom] = useState(new Animated.Value(-150))
    Animated.timing(animatedBottom,{
        toValue:0,
        duration:400
    }).start()
    return(
        <TouchableOpacity style={styles.menuView} onPress={props.toggle}>
            <Animated.View style={[styles.menuContainer,{bottom:animatedBottom}]}>
                <TouchableOpacity style={styles.menuButton} onPress={props.delete}>
                    <Text style={styles.menuText}>Delete This Conversation</Text>
                </TouchableOpacity>
                <View style={styles.borderBottom} />
                <TouchableOpacity style={styles.menuButton} onPress={props.clear}>
                    <Text style={styles.menuText}>Clear Conversation</Text>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    )
}

export const DeleteChatPop =props=> {
    const [ show,setShow ] = useState(new Animated.Value(0))
    Animated.timing(show,{
        toValue:1,
        duration:400,
        easing:Easing.linear
    }).start()

    fadeOutAnimation =()=> {
        Animated.timing(show,{
            toValue:0,
            duration:400,
            easing:Easing.linear
        }).start(()=>props.cancel())
    }

    return(
        <View style={[styles.menuView,styles.centerOfScreen]}>
            <Animated.View easing="bounce" style={[styles.deletePopUpParentView,styles.shadow,{opacity:show}]}>
                <View style={[styles.trashImageView,styles.centerOfScreen]}>
                    <Image
                        source={require('./assets/icons/trash/trash.png')}
                    />
                </View>
                <View style={styles.popUpTextView}>
                    <Text style={styles.popUpTitleText}>
                        Delete Conversation
                    </Text>
                    <Text style={styles.popUpSubTitleText}>
                        Are you sure you want to delete this conversation?
                    </Text>
                </View>
                <View style={styles.popUpButtonsView}>
                    <TouchableOpacity 
                        style={[styles.outlineButton,styles.centerOfScreen]}
                        onPress={fadeOutAnimation}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.outlineButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.fillButton,styles.centerOfScreen]}
                        onPress={props.delete}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.fillButtonText}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export const ClearChatPop =props=> {
    const [ show,setShow ] = useState(new Animated.Value(0))
    Animated.timing(show,{
        toValue:1,
        duration:400,
        easing:Easing.linear
    }).start()

    fadeOutAnimation =()=> {
        Animated.timing(show,{
            toValue:0,
            duration:400,
            easing:Easing.linear
        }).start(()=>props.cancel())
    }

    return(
        <View style={[styles.menuView,styles.centerOfScreen]}>
            <Animated.View style={[styles.deletePopUpParentView,styles.shadow,{opacity:show}]}>
                <View style={styles.popUpTextView}>
                    <Text style={styles.popUpTitleText}>
                        Clear Conversation
                    </Text>
                    <Text style={styles.popUpSubTitleText}>
                        Are you sure you want to clear this conversation?
                    </Text>
                </View>
                <View style={styles.popUpButtonsView}>
                    <TouchableOpacity 
                        style={[styles.outlineButton,styles.centerOfScreen]}
                        onPress={fadeOutAnimation}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.outlineButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.fillButton,styles.centerOfScreen]}
                        onPress={props.clear}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.fillButtonText}>CLEAR</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow:{
        ...Platform.select({
            ios:{
                shadowColor:'#000',
                shadowOffset:{
                    height:3,
                    width:0
                },
                shadowOpacity:0.2,
                shadowRadius:3
            },
            android:{
                elevation:2
            }
        })
    },
    receiverBubbleView:{
        alignSelf:'flex-start',
        maxWidth:'80%',
        flexDirection:"row",
        borderTopEndRadius:6,
        borderBottomStartRadius:6,
        borderBottomEndRadius:6,
        marginBottom:15
    },
    receiverBubbleMessageContainer:{
        padding:12,
        backgroundColor:'#fff',
        borderTopEndRadius:6,
        borderBottomStartRadius:6,
        borderBottomEndRadius:6,
    },
    caretLeft:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
        transform:[
            {rotate: '90deg'}
        ]
    },
    thumbnail:{
        height:30,
        width:30,
        borderRadius:15
    },
    receiverText:{
        fontFamily:'Helvetica',
        fontSize:15,
        color:'#668391'
    },
    receiverTimingText:{
        fontFamily:'Helvetica',
        fontSize:11,
        color:'#999',
        textAlign:'right',
        marginBottom:-8
    },
    senderBubbleView:{
        maxWidth:'80%',
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        flexDirection:'row',
        borderTopStartRadius:6,
        borderBottomStartRadius:6,
        borderBottomEndRadius:6,
        marginBottom:15,
        backgroundColor:'#fff'
    },
    senderBubbleMessageContainer:{
        padding:15,
        backgroundColor:'#668391',
        borderTopStartRadius:6,
        borderBottomStartRadius:6,
        borderBottomEndRadius:6
    },
    caretRight:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderRightColor: 'transparent',
        borderTopColor: '#668391'
    },
    senderText:{
        fontFamily:'Helvetica',
        fontSize:15,
        color:'#fff'
    },
    senderTimingText:{
        fontFamily:'Helvetica',
        fontSize:10,
        color:'#fff',
        textAlign:'right',
        marginBottom:-8
    },
    menuView:{
        position:'absolute',
        width:'100%',
        height:height,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.51)',
        zIndex:9
    },
    menuContainer:{
        backgroundColor:'#fff',
        position:'absolute',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:5,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
        paddingBottom:30
    },
    menuButton:{
        paddingVertical:25
    },
    borderBottom:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    menuText:{
        fontFamily:'Helvetica',
        fontSize:15
    },
    typingDotsView:{
        flexDirection:'row',
        alignItems:'center'
    },
    typingDot:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'#668391'
    },
    marginHorizontal:{
        marginHorizontal:5
    },
    contactParentView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        padding:12,
        borderRadius:4,
        marginVertical:10
    },  
    contactThumbnail:{
        height:42,
        width:42,
        borderRadius:21
    },
    contactTextView:{
        flex:1,
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    contactNameText:{
        fontFamily:'Helvetica',
        fontSize:16,
        color:'#222222',
        fontWeight:'normal',
        marginBottom:5
    },
    contactMessageText:{
        fontFamily:'Helvetica',
        fontSize:14,
        color:'#668391'
    },
    lastMessageTimeText:{
        fontFamily:'Helvetica',
        fontSize:11,
        fontWeight:'100'
    },
    messageCountView:{
        backgroundColor:'#5B57DC',
        alignSelf:'flex-end',
        borderRadius:10,
        marginTop:-15,
        borderWidth:1,
        borderColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:2.1
    },
    countText:{
        fontSize:10,
        color:'#fff'
    },
    contactCardShadow:{
        shadowColor:'#979797',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    height:3,
                    width:0
                },
                shadowOpacity:0.5,
                shadowRadius:3,
            },
            android:{
                elevation:3
            }
        })
    },
    centerOfScreen:{
        justifyContent:'center',
        alignItems:'center'
    },
    deletePopUpParentView:{
        backgroundColor:'#fff',
        padding:25,
        borderRadius:10
    },
    trashImageView:{
        backgroundColor:'#5B57DC',
        borderRadius:50,
        height:64,
        width:64,
        alignSelf:'center',
        marginTop:10,
        marginBottom:20
    },
    popUpTextView:{
        marginVertical:10,
        alignItems:'center'
    },
    popUpTitleText:{
        fontFamily:'Helvetica',
        fontSize:17,
        fontWeight:'bold',
        color:'#222222',
        marginBottom:20
    },
    popUpSubTitleText:{
        fontFamily:'Helvetica',
        fontSize:15,
        fontWeight:'normal',
        color:'#222222',
        textAlign:'center'
    },
    popUpButtonsView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20
    },
    outlineButton:{
        paddingHorizontal:30,
        paddingVertical:15,
        backgroundColor:'#fff',
        borderColor:'#00E2B2',
        borderWidth:1,
        borderRadius:5
    },
    outlineButtonText:{
        fontFamily:'Helvetica',
        fontSize:15,
        fontWeight:'bold',
        color:'#00E2B2'
    },
    fillButton:{
        paddingHorizontal:30,
        paddingVertical:15,
        backgroundColor:'#00E2B2',
        borderWidth:1,
        borderColor:'#00E2B2',
        marginStart:15,
        borderRadius:5
    },
    fillButtonText:{
        fontFamily:'Helvetica',
        fontSize:15,
        fontWeight:'bold',
        color:'#FFF'
    }
})