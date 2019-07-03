import React, { Component } from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import App from './App';
import TwilioVideos from './TwilioVideos';
import SlideShow from './SlideShow';
import DeepLinkedScreen from './DeepLinkedScreen';
import Home from './Home';

export default class Main extends Component {
    render() {
        return <AppContainer/>
    }
}

const AppStacks = createStackNavigator({
    home:{
        screen:Home
    },
    signup:{
        screen:App
    },
    tvideo:{
        screen:TwilioVideos
    },
    slides:{
        screen:SlideShow
    },
    deeplinked:{
        screen:DeepLinkedScreen,
        path:'appointment/:appointment_id'
    }
},{
    initialRouteName:'home'
})

const prefix = 'apthealth://';

const APTApp = () => <AppStacks uriPrefix={prefix} />
const AppContainer = createAppContainer(APTApp);