import React, {Component} from 'react';
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
class BlockButton extends Component {
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
        backgroundColor: '#ea5502',
        title: 'title',
        disabledStyle: {backgroundColor: '#ccc'},
        disabledTextStyle: {color: '#4a4a4a'},
        color: '#FFF',
        full: false
    }
    state = {}
    static propTypes = {
        disabled: React.PropTypes.bool,
        full: React.PropTypes.bool,
        onPress: React.PropTypes.func,
        backgroundColor: React.PropTypes.string,
        disabledStyle: React.PropTypes.object,
        disabledTextStyle: React.PropTypes.object,
        title: React.PropTypes.string,
        color: React.PropTypes.string,
    }
    render() {
        const {title, disabled, full, onPress, backgroundColor, disabledTextStyle, disabledStyle, color} = this.props
        const Container = disabled ? View : TouchableOpacity
        return (
                <Container
                    disabled={disabled}
                    onPress={onPress}
                    style={[!full?sty.main:sty.full, {backgroundColor},
                        disabled&&disabledStyle
                    ]}
                >
                    <View style={sty.view}>
                        <Text style={[sty.titleText, {color}, full&&{paddingVertical: 15}, disabled&&disabledTextStyle]}>{title}</Text>
                    </View>
                </Container>
        )
    }
}

export default BlockButton;
