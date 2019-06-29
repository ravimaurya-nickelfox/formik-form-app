import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Form from './Form';
import Twillio from './Twillio';
import TwilioVideos from './TwilioVideos';


AppRegistry.registerComponent(appName, () =>TwilioVideos);