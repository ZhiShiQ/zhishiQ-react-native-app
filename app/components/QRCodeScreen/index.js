'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import Loading from '../Loading'

let oldUrl = null;

var QRCodeScreen = React.createClass({

    propTypes: {
        cancelButtonVisible: React.PropTypes.bool,
        loading: React.PropTypes.bool,
        cancelButtonTitle: React.PropTypes.string,
        onSuccess: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            cancelButtonVisible: false,
            cancelButtonTitle: 'Cancel',
        };
    },

    _onPressCancel: function() {
        var $this = this;
        requestAnimationFrame(function() {
            if ($this.props.onCancel) {
                $this.props.onCancel();
            }
        });
    },

    reset: function () {
        oldUrl = null;
    },

    _onBarCodeRead: function(result) {
        var $this = this;

        if (oldUrl != result.data) {
            oldUrl = result.data;

            setTimeout(function() {
                Vibration.vibrate();
                $this.props.onSuccess(result.data);
                setTimeout(() => {
                    $this.reset();
                }, 3000);
            }, 1000);
        }
    },

    render2: function () {

        return (
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                captureAudio={false}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
                <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
        )
    },

    takePicture() {
        this.camera.capture()
            .then((data) => {alert(JSON.stringify(data));console.log(data)})
            .catch(err => console.error(err));
    },


    render: function() {
        const Camera = require('react-native-camera').default;

        var cancelButton = null;

        if (this.props.cancelButtonVisible) {
            cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
        }

        return (
            <Camera onBarCodeRead={this._onBarCodeRead}
                    style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={[styles.rectangle, {justifyContent: 'center'}]}>
                        {this.props.loading && <Loading size="large"/>}
                    </View>
                </View>
                {cancelButton}
            </Camera>
        );
    },
});

var CancelButton = React.createClass({
    render: function() {
        return (
            <View style={styles.cancelButton}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.cancelButtonText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    },
});

var styles = StyleSheet.create({

    camera: {
        marginVertical: 15,
        flex: 1,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },

    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

module.exports = QRCodeScreen;
