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
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import sty, {IMGSIZE, SELF_BGCLR, OTHER_BGCLR} from './style';
import CirImage from '../CirImage';

@autobind
class ChatMessage extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {
        content: "  ",
        lock: false,
    }
    state = {}
    static propTypes = {
        img: PropTypes.object,
        type: PropTypes.oneOf("self", "other"),
        name: PropTypes.string,
        content: PropTypes.string,
        lock: PropTypes.bool,
    }
    render() {
        const {content, name, style, lock, type} = this.props;
        return (
            <View style={[sty.main, style]}>
                {type == 'self' ? this.selfMessage() : this.otherMessage()}
            </View>
        )
    }

    _renderLock() {
        const {content, name, style, lock, type} = this.props;
        if (!lock) {
            return null;
        }
        return (
            <Text style={[{
                position: 'absolute', color: '#fff',
                overflow: 'hidden', textAlign: 'center',
                borderRadius: 17/2, height: 17, width: 17
            }, type == 'other'? {right: -22, backgroundColor: '#d8d8d8'}: {left: -22, backgroundColor: '#fc6d34'}
            ]}>
                {'L'}
            </Text>
        )
    }

    otherMessage() {
        const {content, name, type, lock} = this.props;
        return (
            <View style={[{flexDirection: 'row'}, sty.message]}>
                <CirImage size={IMGSIZE} />
                <View style={sty.otherContentContainer}>
                    <Icon style={{
                        backgroundColor: 'transparent',
                        left: -6.5,
                        top: IMGSIZE/2-10,
                        position: 'absolute'
                    }} name="caret-left" size={20} color={OTHER_BGCLR} />
                    <Text style={sty.otherContent}>
                        {content}
                    </Text>
                    {this._renderLock()}
                </View>
            </View>
        )
    }

    selfMessage() {
        const {content, name, type, lock} = this.props;
        return (
            <View style={[{flexDirection: 'row-reverse'}, sty.message]}>
                <CirImage size={IMGSIZE} />
                <View style={sty.selfContentContainer}>
                    <Icon style={{
                        backgroundColor: 'transparent',
                        right: -6.5,
                        top: IMGSIZE/2-10,
                        position: 'absolute'
                    }} name="caret-right" size={20} color={SELF_BGCLR} />
                    <Text style={sty.selfContent}>
                        内容是什么内容
                    </Text>
                    {this._renderLock()}
                </View>
            </View>
        )
    }
}

export default ChatMessage;
