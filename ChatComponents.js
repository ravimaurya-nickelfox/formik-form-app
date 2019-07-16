import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native'

export const ReceiverBuuble =props=> {
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
                <Text style={styles.receiverText}>This message is received from other person</Text>
                <Text style={styles.receiverTimingText}>16.08</Text>
            </TouchableOpacity>
        </View>
    )
}

export const SenderBubble =props=> {
    return(
        <View style={[styles.senderBubbleView,styles.shadow]}>
            <TouchableOpacity style={styles.senderBubbleMessageContainer}>
                <Text style={styles.senderText}>this message is sent by me.</Text>
                <Text style={styles.senderTimingText}>16.08</Text>
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
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>Delete This Conversation</Text>
                </TouchableOpacity>
                <View style={styles.borderBottom} />
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>Clear Conversation</Text>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            height:3,
            width:0
        },
        shadowOpacity:0.2,
        shadowRadius:3
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
        padding:15,
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
        marginBottom:15
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
        height:'100%',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.51)',
        zIndex:9
    },
    menuContainer:{
        backgroundColor:'#fff',
        position:'absolute',
        bottom:-150,
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:5,
        borderTopStartRadius:10,
        borderTopEndRadius:10
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
        marginHorizontal:10
    }
})