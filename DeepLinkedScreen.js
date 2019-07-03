import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class DeepLinkedScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            params:this.props.navigation.state.params
        }
        console.log()
    }
    render() {
        return (
            <View>
                <Text> You are viewing appointment for id 
                    <Text style={{fontWeight:'600',textDecorationLine:'underline'}}> {this.state.params.appointment_id}</Text>
                </Text>
            </View>
        )
    }
}
