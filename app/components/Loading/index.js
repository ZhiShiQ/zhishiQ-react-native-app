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
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class Loading extends Component {
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
    static defaultProps = {}
    state = {}
    static propTypes = {}
    render() {
        const {style, ...props} = this.props

        return (
            <ActivityIndicator
                style={[{marginVertical: 20}, style]}
                color="red"
                size="small"
                animating={true}
                {...props}
            />
        )
    }
}

export default Loading;
