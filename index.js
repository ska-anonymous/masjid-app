/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { configurePushNotification } from './src/push-notification/configureNotification';
import { requestPermissions } from './src/push-notification/requestNotificationPermissions';

// configure the push notifications
configurePushNotification();
requestPermissions()

AppRegistry.registerComponent(appName, () => App);
