import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button, StyleSheet,SafeAreaView, Image } from 'react-native'
import {
    TwilioVideo,
    TwilioVideoLocalView,
    TwilioVideoParticipantView
  } from 'react-native-twilio-video-webrtc'

const buttonChord = 64

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
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdmNTBmYzdiNzJjZWUyZGRjNmM5Y2Y2YTk0ODQ2YTZhLTE1NjMyNTYyMTEiLCJpc3MiOiJTSzdmNTBmYzdiNzJjZWUyZGRjNmM5Y2Y2YTk0ODQ2YTZhIiwic3ViIjoiQUM0M2RkNTQzMmUzMjUzZDJlOTI4ZmFlZmVhY2Y3NzJkYSIsImV4cCI6MTU2MzI5MjIxMSwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoiam9obl9kb2UxIiwidmlkZW8iOnsicm9vbSI6InJvb20xMDEifX19.ZTi-2ZrgxR2ZunJUUMF9pgg2Kx8bifkrW2APeMbMtN4'
        }
        console.log(this.state)
    }

    componentDidMount(){
        
    }

    _onConnectButtonPress = () => {
        let x = this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: this.state.token })
        console.log('qq',x)
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

      _onStatsReceivedEvent = (event) =>{
        console.log('Stats',event)
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
                <SafeAreaView style={styles.callContainer}>
                  <View style={styles.videoTopBar}>
                    <View>
                      <Image
                        source={require('./assets/icons/network/network.png')}
                      />
                    </View>
                    <View>
                      <Text style={[styles.txtfont,{fontSize:17,fontWeight:'bold'}]}>Adam Smith</Text>
                      <Text style={[styles.txtfont,{fontSize:14}]}>05:20</Text>
                    </View>
                    <TouchableOpacity
                      onPress={this._onFlipButtonPress}
                    >
                      <Image
                        source={require('./assets/icons/flip/flip.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.localVideo}>
                    <TwilioVideoLocalView
                      enabled={true}
                      style={styles.localVideoInner}
                    />
                  </View>
                  <View style={{flex:1}}>
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
                        {/* <Image
                          source={require('./assets/doctor.png')}
                          style={{flex:1}}
                        /> */}
                      </View>
                    }
                  </View>

                <View
                  style={styles.optionsContainer}>
                  <View style={styles.callActionBtnViewUpper}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={this._onMuteButtonPress}>
                      <Image
                        source={require('./assets/icons/mic/mic.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={this._onFlipButtonPress}>
                      <Image
                        source={require('./assets/icons/video/video.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.callActionBtnViewLower}>
                    <TouchableOpacity
                      style={styles.endCallButton}
                      onPress={this._onEndButtonPress}>
                      <Image
                        source={require('./assets/icons/phone/phone.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </SafeAreaView>
            }
    
            <TwilioVideo
              ref="twilioVideo"
              onRoomDidConnect={ this._onRoomDidConnect }
              onRoomDidDisconnect={ this._onRoomDidDisconnect }
              onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
              onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
              onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
              onStatsReceived={this._onStatsReceivedEvent}
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
    flex: 1
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  videoTopBar:{
    backgroundColor:'#979797',
    height:88,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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
    width: 126,
    height: 161,
    position: "absolute",
    right: 12,
    top: 100,
    borderRadius:10,
    zIndex:1,
    overflow:'hidden'
  },
  localVideoInner: {
    flex: 1
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
    flex:1,
    borderWidth:1
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 45,
    right: 0,
    backgroundColor: 'transparent',
    marginHorizontal:48,
    zIndex:99
  },
  optionButton: {
    width: buttonChord,
    height: buttonChord,
    borderRadius: buttonChord / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: "center"
  },
  callActionBtnViewUpper:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  callActionBtnViewLower:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginTop:11
  },
  endCallButton:{
    width: buttonChord,
    height: buttonChord,
    borderRadius: buttonChord / 2,
    backgroundColor: '#E41C34',
    justifyContent: 'center',
    alignItems: "center"
  },
  txtfont:{
    fontFamily:'Helvetica',
    color:'#fff',
    textAlign:'center'
  }
})