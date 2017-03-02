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
    Button
} from 'react-native';

import sty from './style';


@autobind
class TextWithBg extends Component {
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
        bgColor: '#F7F7F7',
        color: '#4a4a4a'
    }
    state = {}
    static propTypes = {
        ...Text.propTypes,
        title: PropTypes.string.isRequired,
        bgColor: PropTypes.string,
        color: PropTypes.string,
        onPress: PropTypes.func,
    }

    render() {
        const {title, style, onPress, bgColor, color, ...props} = this.props

        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
                <View>
                    <Text
                        {...props}
                        style={[sty.main, style, {color, backgroundColor: bgColor}]}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default TextWithBg;
