import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

class CustomInput extends React.PureComponent {
    render() {
        return (
            <View>
                <TextInput
                    {...this.props}
                    style={[style.input,{...this.props.style}]}
                    autoCorrect={false}
                />
                <Text></Text>
            </View>
        )
    }
}

export const FormInput = React.forwardRef((props,ref)=><CustomInput innerRef={ref} {...props}/>)

const style = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#aaa',
        padding:10,
        borderRadius:4,
        marginBottom:12
    }
})