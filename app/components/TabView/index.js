
import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';


const propTypes = {
    name: PropTypes.string,
    sceneStyle: View.propTypes.style,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderWidth: 2,
        borderColor: 'red',
    },
});

const TabView = (props, context) => {
    return (
        <View style={[styles.container, props.sceneStyle ]}>
            <Text>Tab {props.title}</Text>
            <Text>{JSON.stringify(props)}</Text>
        </View>
    );
};

// TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
