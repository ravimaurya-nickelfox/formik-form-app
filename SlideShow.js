import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Animated,Dimensions } from 'react-native'

const {width} = Dimensions.get('window')

export default class SlideShow extends Component {
    constructor(props){
        super(props)
        this.state = {
            marginRight:new Animated.Value(0),
            marginLeft:new Animated.Value(0),
            text:Math.random()*1000000000
        }
    }

    onPressNext=()=>{
        this.setState({marginLeft:new Animated.Value(width),text:Math.random()*1000000000},()=>{
            Animated.timing(
                this.state.marginLeft,
                {
                  toValue: 0,
                  duration: 500,
                }
            ).start();
        })
    }

    onPressPrev=()=>{
        this.setState({marginRight:new Animated.Value(width),text:Math.random()*1000000000},()=>{
            Animated.timing(
                this.state.marginRight,
                {
                  toValue: 0,
                  duration: 500,
                }
            ).start();  
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Animated.View
                    ref={p=>this.animView=p}
                    style={{
                        backgroundColor:"green",
                        flex:1,
                        marginRight:this.state.marginRight,
                        marginLeft:this.state.marginLeft,
                        flexWrap:'nowrap',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Text>{this.state.text}</Text>
                </Animated.View>
                <View style={{flexDirection:'row',marginHorizontal:20,justifyContent:'space-between',alignItems:'center',height:40,marginTop:10}}>
                    <TouchableOpacity 
                        onPress={this.onPressPrev}
                        style={{backgroundColor:'#ccc',flex:1,alignItems:'center',paddingVertical:10,borderRadius:5}}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={this.onPressNext}
                        style={{backgroundColor:'#748374',flex:1,alignItems:'center',paddingVertical:10,borderRadius:5,marginStart:15}}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
