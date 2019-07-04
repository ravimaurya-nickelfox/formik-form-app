import React, { Component } from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import App from './App';
import TwilioVideos from './TwilioVideos';
import SlideShow from './SlideShow';
import DeepLinkedScreen from './DeepLinkedScreen';
import Home from './Home';
import Form from './Form';
import Analytics from './Analytics';

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
    },
    form:{
        screen:Form
    },
    analytics:{
        screen:Analytics
    }
},{
    initialRouteName:'home'
})

const prefix = 'apthealth://';

const AppContainer = createAppContainer(AppStacks);

export default class Main extends Component {
    render() {
        return <AppContainer uriPrefix={prefix}/>
    }
}