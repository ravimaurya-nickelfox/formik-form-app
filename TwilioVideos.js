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
            roomName: 'room101',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdmNTBmYzdiNzJjZWUyZGRjNmM5Y2Y2YTk0ODQ2YTZhLTE1NjIwNTU3MjgiLCJpc3MiOiJTSzdmNTBmYzdiNzJjZWUyZGRjNmM5Y2Y2YTk0ODQ2YTZhIiwic3ViIjoiQUM0M2RkNTQzMmUzMjUzZDJlOTI4ZmFlZmVhY2Y3NzJkYSIsImV4cCI6MTU2MjA5MTcyOCwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoiam9obl9kb2UxIiwidmlkZW8iOnsicm9vbSI6InJvb20xMDEifX19.doBChvIGPbY0aSBzc0O7vEMRisy5wADudDeILSRWjSk'
        }
        console.log(this.state)
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
        console.log("ERROR1: ", error, roomName)
    
        this.setState({status: 'disconnected'})
      }
    
      _onRoomDidFailToConnect = (error) => {
        console.log("ERROR2: ", error)
    
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
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginTop: 100
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 200,
    position: "absolute",
    right: 0,
    bottom: 100
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  remoteVideo: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 120,
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    backgroundColor: 'blue',
    flexDirection: "row",
    alignItems: "center"
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: "center"
  }
})