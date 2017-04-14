/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import App from './app/index';
// import App from './Example/Example';
// import App from './Example/swipeable-example';
// import App from './Example/accordion';
// import App from './Example/scrollable-header';

console.disableYellowBox = true;

export default class WorkApp extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('WorkApp', () => WorkApp );
