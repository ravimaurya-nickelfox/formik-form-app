import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

export default class Loaders extends Component {
    constructor(props){
        super(props)
        this.state = {
            size: this.props.size || 'small',
            color: this.props.color || undefined
        }

    }

    render() {
        const { size, color } = this.state
        
        switch ( size ) {
            case 'small':
                return(
                    <TouchableOpacity activeOpacity={1} style={Style.smallLoaderView}>
                        <View style={Style.smallLoaderContainer}>
                            <ActivityIndicator size={size} color={color} />
                            {
                                this.props.label && this.props.label.length>0 &&
                                <Text style={[Style.loadingLabel,{color:color}]}>Loading</Text>
                            }
                        </View>
                    </TouchableOpacity>
                )
            default:
                <Text>default</Text>
        }
    }
}

const Style = StyleSheet.create({
    smallLoaderView:{
        flex:1,
        position:'absolute',
        zIndex:99,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    smallLoaderContainer:{
        padding:25,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,0.95)'
    },
    loadingLabel:{
        marginTop:6,
        fontSize:12,
        fontStyle:'normal'
    }
})