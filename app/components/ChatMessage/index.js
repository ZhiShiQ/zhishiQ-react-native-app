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

import sty, {IMGSIZE, SELF_BGCLR, OTHER_BGCLR, MAX_WIDTH} from './style';
import CirImage from '../CirImage';
import LockTip from  '../LockTip'
@autobind
class ChatMessage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
        setTimeout(()=>{
            this.lockIcon&&this.lockIcon.measure((ox, oy, width, height, px, py) => {
                console.log(ox,oy,width,height,px,py)
                this.setState({
                    caretLeft:px- 62
                })
            })
        },0)
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        content: "  ",
        lock: false,
    }
    state = {
        showLockTip: false,
        caretLeft: 0
    }
    static propTypes = {
        img: PropTypes.object,
        type: PropTypes.oneOf("self", "other"),
        name: PropTypes.string,
        content: PropTypes.string,
        lock: PropTypes.bool,
    }

    render() {
        const {content, name, lock, type, style,lockTip} = this.props;
        const {caretLeft,showLockTip}=this.state;
        return (
            <View style={[sty.main, style, style]}>
                {type=='text'? this.textLine():type == 'self' ? this.selfMessage() : this.otherMessage()}
                <LockTip
                    showLockTip={showLockTip}
                    containerStyle={{width: MAX_WIDTH, left: 50}}
                    caretStyle={{left: caretLeft}}
                    tipContent={lockTip}></LockTip>
            </View>
        )
    }

    _renderLock() {
        const {content, name, style, lock, type} = this.props;
        if (!lock) {
            return null;
        }
        return (
            <TouchableHighlight underlayColor='' style={[{
                position: 'absolute',
                borderRadius: 17 / 2,
                height: 17, width: 17,
                overflow: 'hidden'
            }, type == 'other' ? {right: -22, backgroundColor: '#d8d8d8'} : {
                left: -22,
                backgroundColor: '#fc6d34'
            }]}
                                onPress={this._renderLockTip}
                                ref={ref => this.lockIcon = ref}
            >
                <View>
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                        {'L'}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    _renderLockTip() {
        const {lock, lockTip}=this.props;
        if (!lock) {
            return null;
        }
        this.setState({
            showLockTip: !this.state.showLockTip
        })
    }
    textLine(){
        const {content}=this.props;
        return(
            <View style={sty.textContentContainer}>
                <Text style={sty.textContent}>{content}</Text>
            </View>
        )
    }
    otherMessage() {
        const {content, name, type, lock} = this.props;
        return (
            <View style={[{flexDirection: 'row'}, sty.message]}>
                <CirImage size={IMGSIZE}/>
                <View style={[sty.otherContentContainer, lock ? {maxWidth: MAX_WIDTH - 7} : {}]}>
                    <Icon style={{
                        backgroundColor: 'transparent',
                        left: -6.5,
                        top: IMGSIZE / 2 - 10,
                        position: 'absolute'
                    }} name="caret-left" size={20} color={OTHER_BGCLR}/>
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
                <CirImage size={IMGSIZE}/>
                <View style={[sty.selfContentContainer, lock ? {maxWidth: MAX_WIDTH - 7} : {}]}>
                    <Icon style={{
                        right: -6.5,
                        top: IMGSIZE / 2 - 10,
                        position: 'absolute',
                        backgroundColor: 'transparent'
                    }} name="caret-right" size={20} color={SELF_BGCLR}/>
                    <Text style={sty.selfContent}>
                        {content}
                    </Text>
                    {this._renderLock()}
                </View>
            </View>
        )
    }
}

export default ChatMessage;
