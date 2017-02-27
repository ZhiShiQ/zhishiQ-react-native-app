import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import sty from './style';


@autobind
class Hr extends Component {
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
        const {color='#C4C4C4', marginTop=0, marginBottom=8, style} = this.props

        return (
            <View style={[sty.main, {backgroundColor: color, marginTop, marginBottom}, style]}>
            </View>
        )
    }
}

export default Hr;
