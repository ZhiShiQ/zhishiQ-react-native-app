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
        backgroundColor: 'rgb(17,169,138)',
        title: 'title',
        disabledStyle: {},
        color: '#FFF'
    }
    state = {}
    static propTypes = {
        disabled: React.PropTypes.bool,
        onPress: React.PropTypes.func,
        backgroundColor: React.PropTypes.string,
        disabledStyle: React.PropTypes.object,
        title: React.PropTypes.string,
        color: React.PropTypes.string,
    }
    render() {
        const {title, disabled, onPress, backgroundColor, disabledStyle, color} = this.props
        const Container = disabled ? TouchableWithoutFeedback : TouchableOpacity
        return (
                <Container
                    disabled={disabled}
                    onPress={onPress}
                    style={[sty.main, {backgroundColor}, disabled&&disabledStyle]}
                >
                    <View style={sty.view}>
                        <Text style={[sty.titleText, {color}]}>{title}</Text>
                    </View>
                </Container>
        )
    }
}

export default BlockButton;
