import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Animated,Dimensions, StyleSheet } from 'react-native'

const {width} = Dimensions.get('window')

export default class SlideShow extends Component {
    constructor(props){
        super(props)
        this.state = {
            marginLeft:new Animated.Value(0),
            text:this.generateRandomNumber()
        }
    }

    onActionBtnPress = direction => {
        const multiplier = direction === 'next' ? 1 : -1
        this.setState({marginLeft:new Animated.Value(width*multiplier),text:this.generateRandomNumber()},()=>{
            Animated.timing(
                this.state.marginLeft,
                {
                  toValue: 0,
                  duration: 500,
                }
            ).start();  
        })
    }

    generateRandomNumber=()=>{
        return Math.round(Math.random()*1000000000)
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Animated.View
                    ref={p=>this.animView=p}
                    style={{
                        ...styles.container,
                        marginLeft:this.state.marginLeft
                    }}
                >
                    <View style={styles.cellWrapper}>
                        <View style={styles.cell}>
                            <Text>{this.state.text}</Text>
                        </View>
                        <View style={[styles.cell,{marginLeft:10}]}>
                            <Text>{this.state.text}</Text>
                        </View>
                    </View>
                </Animated.View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity 
                        onPress={()=>this.onActionBtnPress('prev')}
                        style={styles.actionBtn}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>this.onActionBtnPress('next')}
                        style={[styles.actionBtn,styles.nextBtn]}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#f2f2f2",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:width,
        paddingHorizontal:10
    },
    cellWrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    cell:{
        flex:1,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:4
    },
    btnWrapper:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'space-between',
        alignItems:'center',
        height:40,
        marginTop:10
    },
    actionBtn:{
        backgroundColor:'#ccc',
        flex:1,
        alignItems:'center',
        paddingVertical:10,
        borderRadius:5
    },
    nextBtn:{
        marginStart:15,
        backgroundColor:'#290'
    }
})