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

import sty from './style';


@autobind
class BlockTextInput extends Component {
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

    static defaultProps = {}
    state = {}
    static propTypes = {
        rightComponent: PropTypes.element,
        rightText: PropTypes.string,
        onRight: PropTypes.func
    }

    render() {
        const {rightText, rightComponent, onRight} = this.props;

        return (
            <View style={sty.main}>
                <TextInput style={sty.input}/>
                <TouchableOpacity style={sty.btn} onPress={onRight}>
                    {
                        rightComponent ? rightComponent :
                        <Text>{rightText}</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

export default BlockTextInput;
