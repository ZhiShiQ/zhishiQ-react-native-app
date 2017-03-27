'use strict';

import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 400;

export default StyleSheet.create({

    overlayStyle: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        // width: width,
        // height: height,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    optionContainer: {
        borderRadius: BORDER_RADIUS,

        // width: width-20,
        // height: OPTION_CONTAINER_HEIGHT,
        backgroundColor: 'rgba(255,255,255,0.95)',
        left: 10,
        right: 10,
        position: 'absolute',

        maxHeight: height-160,
        // top: (height-OPTION_CONTAINER_HEIGHT)/2,
        bottom: 60,
    },

    cancelContainer: {
        // left: width*0.1,
        borderRadius: BORDER_RADIUS,
        left: 0,
        right: 0,
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.95)',
        bottom: -50,
    },

    cancelStyle: {

        padding: PADDING+4
    },

    selectStyle: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        borderRadius: BORDER_RADIUS
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE
    },



    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE
    },

    optionStyle: {
        padding: PADDING+4,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },

    optionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: HIGHLIGHT_COLOR
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE
    }
});
