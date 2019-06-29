import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import {
    TwilioVideo,
    TwilioVideoLocalView,
    TwilioVideoParticipantView
  } from 'react-native-twilio-video-webrtc'

export default class TwilioVideos extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAudioEnabled: true,
            isVideoEnabled: true,
            status: 'disconnected',
            participants: new Map(),
            videoTracks: new Map(),
            roomName: '',
            token: ''
        }
    }

    componentDidMount(){
        
    }

    _onConnectButtonPress = () => {
        this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: this.state.token })
        this.setState({status: 'connecting'})
      }
    
      _onEndButtonPress = () => {
        this.refs.twilioVideo.disconnect()
      }
    
      _onMuteButtonPress = () => {
        this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
          .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
      }
    
      _onFlipButtonPress = () => {
        this.refs.twilioVideo.flipCamera()
      }
    
      _onRoomDidDisconnect = ({roomName, error}) => {
        console.log("ERROR: ", error)
    
        this.setState({status: 'disconnected'})
      }
    
      _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error)
    
        this.setState({status: 'disconnected'})
      }
    
      _onParticipantAddedVideoTrack = ({participant, track}) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)
    
        this.setState({
          videoTracks: new Map([
            ...this.state.videoTracks,
            [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
          ]),
        });
      }
    
      _onParticipantRemovedVideoTrack = ({participant, track}) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)
    
        const videoTracks = this.state.videoTracks
        videoTracks.delete(track.trackSid)
    
        this.setState({videoTracks: { ...videoTracks }})
      }

    render() {
        return (
            <View style={styles.container}>
            {
              this.state.status === 'disconnected' &&
              <View>
                <Text style={styles.welcome}>
                  React Native Twilio Video
                </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  value={this.state.roomName}
                  onChangeText={(text) => this.setState({roomName: text})}>
                </TextInput>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  value={this.state.token}
                  onChangeText={(text) => this.setState({token: text})}>
                </TextInput>
                <Button
                  title="Connect"
                  style={styles.button}
                  onPress={this._onConnectButtonPress}>
                </Button>
              </View>
            }
    
            {
              (this.state.status === 'connected' || this.state.status === 'connecting') &&
                <View style={styles.callContainer}>
                {
                  this.state.status === 'connected' &&
                  <View style={styles.remoteGrid}>
                    {
                      Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                        return (
                          <TwilioVideoParticipantView
                            style={styles.remoteVideo}
                            key={trackSid}
                            trackIdentifier={trackIdentifier}
                          />
                        )
                      })
                    }
                  </View>
                }
                <View
                  style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={this._onEndButtonPress}>
                    <Text style={{fontSize: 12}}>End</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={this._onMuteButtonPress}>
                    <Text style={{fontSize: 12}}>{ this.state.isAudioEnabled ? "Mute" : "Unmute" }</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={this._onFlipButtonPress}>
                    <Text style={{fontSize: 12}}>Flip</Text>
                  </TouchableOpacity>
                  <TwilioVideoLocalView
                    enabled={true}
                    style={styles.localVideo}
                  />
                </View>
              </View>
            }
    
            <TwilioVideo
              ref="twilioVideo"
              onRoomDidConnect={ this._onRoomDidConnect }
              onRoomDidDisconnect={ this._onRoomDidDisconnect }
              onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
              onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
              onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:50,
        marginHorizontal:20
    }
})