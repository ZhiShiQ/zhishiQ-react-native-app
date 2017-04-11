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
    Button,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import sty from './style';

const {width}=Dimensions.get('window');
@autobind
class LockTip extends Component {
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
    state = {
    }
    static propTypes = {
        showLockTip: PropTypes.bool,
        tipContent: PropTypes.string,
        caretStyle:PropTypes.object
    }

    render() {
        let {tipContent,containerStyle,caretStyle,showLockTip} = this.props;
        return (
            showLockTip ?
                <View style={[sty.lockTipContainer,containerStyle]}>
                    <View style={sty.lockTipContent}>
                        <Text style={{color:'#fff',textAlign:'center'}}>{tipContent}</Text>
                    </View>
                    <Icon style={[sty.lockTipTop,caretStyle]} name="caret-up" size={20} color={'#4a4a4a'}/>
                </View> : null
        )
    }

}

export default LockTip;
