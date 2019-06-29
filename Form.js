import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory'

export default class Form extends Component {
    constructor(props){
        super(props)
        this.inputRefs = [
            'fname','lname','email','phone','password','cpass','web'
        ]
        this.activeRef = 0
    }

    componentDidMount(){
        this.inputRefs.map((item,index)=>{
            if(index < this.inputRefs.length-1){
                this[item].setNativeProps({
                    returnKeyType:'next',
                    returnKeyLabel:'Next'
                })
            }else{
                this[item].setNativeProps({
                    returnKeyType:'done',
                    returnKeyLabel:'Done'
                })
            }
        })
    }

    handleNext=()=>{
        if(this.inputRefs.length>this.activeRef+1)
            this[this.inputRefs[this.activeRef+1]].focus()
    }

    handlePrev=()=>{
        if(this.activeRef>0)
            this[this.inputRefs[this.activeRef-1]].focus()
    }

    onInputChange=()=>{
        // var ref = this[this.inputRefs[this.activeRef]]
        // if(this.validateEmail(ref._lastNativeText)){
        //     ref.setNativeProps({
        //         style:{
        //             borderColor:'#000',
        //             borderWidth:1
        //         }
        //     })
        // }else{
        //     ref.setNativeProps({
        //         style:{
        //             borderColor:'red',
        //             borderWidth:1
        //         }
        //     })
        // }
    }

    validateEmail=(text='')=>{
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(text)
    }

    handleFocus=(ref)=>{
        this.activeRef = this.inputRefs.indexOf(ref)
        this[ref].setNativeProps({
            style:{
                borderColor:'#5B57DC',
                shadowColor:'#5B57DC',
                ...Platform.select({
                    ios:{
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 4,
                    },
                    android:{
                        elevation:2
                    }
                })
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
               <View style={{flex:1,padding:20}}>
                    <TextInput
                        placeholder={'First Name'}
                        style={style.input}
                        ref={p=>this.fname=p}
                        onFocus={()=>this.handleFocus('fname')}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                        type={'email'}
                        onChange={this.onInputChange}
                    />
                    <TextInput
                        placeholder={'Last Name'}
                        style={style.input}
                        ref={p=>this.lname=p}
                        onFocus={()=>this.activeRef=1}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                    />
                    <TextInput
                        placeholder={'Email'}
                        style={style.input}
                        ref={p=>this.email=p}
                        onFocus={()=>this.activeRef=2}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                    />
                    <TextInput
                        placeholder={'Phone'}
                        style={style.input}
                        ref={p=>this.phone=p}
                        onFocus={()=>this.activeRef=3}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                    />
                    <TextInput
                        placeholder={'Password'}
                        style={style.input}
                        ref={p=>this.password=p}
                        onFocus={()=>this.activeRef=4}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                    />
                    <TextInput
                        placeholder={'Confirm Password'}
                        style={style.input}
                        ref={p=>this.cpass=p}
                        onFocus={()=>this.activeRef=5}
                        autoCorrect={false}
                        onSubmitEditing={this.handleNext}
                    />
                    <TextInput
                        placeholder={'Website'}
                        style={style.input}
                        ref={p=>this.web=p}
                        onFocus={()=>this.activeRef=6}
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={style.btn}
                    >
                        <Text style={style.btnTxt}>Submit</Text>
                    </TouchableOpacity>
               </View>
               
               <KeyboardAccessoryNavigation
                    avoidKeyboard={true}
                    multiline={false}
                    androidAdjustResize ={true}
                    accessoryStyle={{marginBottom:-35,backgroundColor:'#fff'}}
                    onPrevious={this.handlePrev}
                    onNext={this.handleNext}/>

            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#aaa',
        padding:10,
        borderRadius:4,
        marginBottom:12
    },
    btn:{
        backgroundColor:'#930470',
        alignSelf:'center',
        paddingVertical:10,
        paddingHorizontal:25,
        borderRadius:4,
        marginVertical:10
    },
    btnTxt:{
        color:'#fff',
        fontWeight:'500',
        fontSize:15
    }
})