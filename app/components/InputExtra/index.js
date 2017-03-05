import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    TextInput,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class InputExtra extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        label: "LABEL",
        inputProps: {}
    }
    state = {}
    static propTypes = {
        label: PropTypes.string.isRequired,
        rText: PropTypes.string,
        onRight: PropTypes.func,
        inputProps: PropTypes.object,
        style: PropTypes.object
    }

    render() {
        const {label, rText, onRight, style, inputProps} = this.props;

        return (
            <View style={[sty.main, style]}>
                {label && <Text style={sty.label}>{label}</Text>}
                <TextInput
                    style={[sty.input, label ? {paddingRight: 14} : {}]}
                    {...inputProps}
                />
                {rText && <TouchableOpacity
                    style={sty.rBtn}
                    onPress={onRight}
                >
                    <View>
                        <Text style={sty.rText}>{rText}</Text>
                    </View>
                </TouchableOpacity>}
            </View>
        )
    }
}

export default InputExtra;
