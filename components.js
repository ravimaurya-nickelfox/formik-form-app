import React, { Component } from 'react'
import { Text, View, TextInput,StyleSheet } from 'react-native'
import {withNextInputAutoFocusInput,handleTextInput} from 'react-native-formik'
import { compose } from 'recompose'

const Colors = {
    primary:'#6B7A81',
    purple:'#5B57DC',
    red:'#DF1F20'
}

class Input extends React.PureComponent {
    constructor(props){
        super(props)
    }
    focus=()=>{
        this.input.focus()
    }

    zoomInFocus=()=>{
        this.view.setNativeProps({
            style:{
                // shadowColor: Colors.purple,
                // shadowOpacity: 0.4,
                // shadowRadius: 3,
                // shadowOffset: {
                //     height: 4,
                //     width: 0
                // },
                borderColor:Colors.purple
            }
        })
    }

    zoomOutFocus=()=>{
        this.view.setNativeProps({
            style:{
                shadowColor: Colors.primary,
                shadowOpacity: 1,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                    width: 0
                },
                borderColor:Colors.primary
            }
        })
    }

    borderColor=()=>{
        if(this.props.formik.touched[this.props.name] && this.props.formik.errors[this.props.name])
            return Colors.red
        return Colors.primary
    }

    isError=()=>{
        if(this.props.formik.touched[this.props.name] && this.props.formik.errors[this.props.name])
        return true
    return false
    }

    render() {
        return (
            <View style={{marginBottom:5}}>
                <Text>{this.props.label}</Text>
                <View ref={p=>this.view=p} style={[style.view,{borderColor:this.borderColor()}]}>
                    <TextInput
                        ref={p=>this.input=p}
                        {...this.props}
                        onFocus={this.zoomInFocus}
                        onBlur={this.zoomOutFocus}
                        style={[style.input]}
                    />
                </View>
                {this.isError() &&
                    <Text style={{ fontSize: 12, color: 'red' }}>{this.props.formik.errors[this.props.name]}</Text>
                }
                {
                    !this.isError() && <Text>{' '}</Text>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    input:{
        color:Colors.purple,
        paddingVertical:15,
        paddingHorizontal:10,
        fontFamily: "Helvetica",
       fontSize: 14,
       fontWeight: "600",
       borderRadius:4,
       shadowRadius:0,
       shadowOffset: {
            height: 0,
            width: 0
        },
    },
    view:{
        borderWidth:1,
        borderRadius:4,
        marginTop:5
    }
})

export const MyInput = compose(handleTextInput,withNextInputAutoFocusInput)(Input)