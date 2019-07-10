import React, { Component } from 'react'
import { Text, View, SafeAreaView, Platform } from 'react-native'
import analytics from '@segment/analytics-react-native'

const WRITE_KEY = 'A6HWS0lSAlY6npthCZs7eyEBcYtDPFpX'

export default class Analytics extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    async componentDidMount(){
        const analised =  await analytics.setup(WRITE_KEY, {
            recordScreenViews: true,
            trackAppLifecycleEvents: true
        })
        analytics.identify('User opened analytic screen',{
            id:Math.floor(Math.random()*10000)
        })
        analytics.track('User tapped on analytic button', {
            category:'Analytics Category',
            name:Platform.OS
        })
    }

    render() {
        return (
            <SafeAreaView>
                <Text> textInComponent </Text>
            </SafeAreaView>
        )
    }
}
