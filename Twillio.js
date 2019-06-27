import React, { Component } from 'react'
import { Text, View, SafeAreaView, Button } from 'react-native'
import TwilioVoice from 'react-native-twilio-programmable-voice'

export default class Twillio extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.initTelephony()
        // add listeners (flowtype notation)
    }

    listenEvents=()=>{
        TwilioVoice.addEventListener('deviceReady', function() {
            // no data
        })
        TwilioVoice.addEventListener('deviceNotReady', function(data) {
            console.log(data)
            // {
            //     err: string
            // }
        })
        TwilioVoice.addEventListener('connectionDidConnect', function(data) {
            console.log(data)
            // Android
            // {
            //     call_sid: string,  // Twilio call sid
            //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //     call_from: string, // "+441234567890"
            //     call_to: string,   // "client:bob"
            // }
            // iOS
            // {
            //     call_sid: string,  // Twilio call sid
            //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //     from: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //     to: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            // }
        })
        TwilioVoice.addEventListener('connectionDidDisconnect', function(value) {
            console.log(value)
            //   | null
            //   | {
            //       err: string
            //     }
            //   | Android
            //     {
            //         call_sid: string,  // Twilio call sid
            //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //         call_from: string, // "+441234567890"
            //         call_to: string,   // "client:bob"
            //         err?: string,
            //     }
            //   | iOS
            //     {
            //         call_sid: string,  // Twilio call sid
            //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //         call_from?: string, // "+441234567890"
            //         call_to?: string,   // "client:bob"
            //         from?: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //         to?: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //         error?: string,                        // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //     }
        })

        // iOS Only
        TwilioVoice.addEventListener('callRejected', function(value) {
            console.log(value)
        })

        // Android Only
        // TwilioVoice.addEventListener('deviceDidReceiveIncoming', function(data) {
        //     console.log(data)
        //     // {
        //     //     call_sid: string,  // Twilio call sid
        //     //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //     //     call_from: string, // "+441234567890"
        //     //     call_to: string,   // "client:bob"
        //     // }
        // })
        // // Android Only
        // TwilioVoice.addEventListener('proximity', function(data) {
        //     console.log(data)
        //     // {
        //     //     isNear: boolean
        //     // }
        // })
        // // Android Only
        // TwilioVoice.addEventListener('wiredHeadset', function(data) {
        //     console.log(data)
        //     // {
        //     //     isPlugged: boolean,
        //     //     hasMic: boolean,
        //     //     deviceName: string
        //     // }
        // })

        // ...

        // // start a call
        

        // // hangup
        // TwilioVoice.disconnect()

        // // accept an incoming call (Android only, in iOS CallKit provides the UI for this)
        // TwilioVoice.accept()

        // // reject an incoming call (Android only, in iOS CallKit provides the UI for this)
        // TwilioVoice.reject()

        // // ignore an incoming call (Android only)
        // TwilioVoice.ignore()

        // // mute or un-mute the call
        // // mutedValue must be a boolean
        // TwilioVoice.setMuted(mutedValue)

        // TwilioVoice.sendDigits(digits)

        // should be called after the app is initialized
        // to catch incoming call when the app was in the background
        TwilioVoice.getActiveCall()
            .then(incomingCall => {
                if (incomingCall){
                    _deviceDidReceiveIncoming(incomingCall)
                }
            })
    }


    async initTelephony() {
        try {
            const accessToken = '909f115987fa6c362855f1ee8ecb7c7c'
            const success = await TwilioVoice.initWithToken(accessToken)
            this.listenEvents()
            console.log(success)
        } catch (err) {
            console.err(err)
        }
    }

    TwillioEvents=()=>{
       
        // start a call
        console.log(TwilioVoice.connect({To: '+919560690833'}))

    }
    
    initTelephonyWithUrl(url) {
        TwilioVoice.initWithTokenUrl(url)
        try {
            TwilioVoice.configureCallKit({
                appName:       'TwilioVoiceExample',                  // Required param
                imageName:     'my_image_name_in_bundle',             // OPTIONAL
                ringtoneSound: 'my_ringtone_sound_filename_in_bundle' // OPTIONAL
            })
        } catch (err) {
            console.err(err)
        }
    }

    render() {
        return (
            <SafeAreaView>
                <Button
                    title={'Call Now'}
                    onPress={this.TwillioEvents}
                />
            </SafeAreaView>
        )
    }
}
