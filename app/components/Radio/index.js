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
class Radio extends Component {
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
        selected: false,
        children: <View/>
    }
    state = {}
    static propTypes = {
        selected: React.PropTypes.bool,
        onPress: React.PropTypes.func
    }
    render() {
        const {selected, style, children} = this.props

        return (
            <TouchableHighlight style={[sty.main, selected?sty.selected:{}, style||{}]}>
                {React.Children.only(children)}
            </TouchableHighlight>
        )
    }
}

export default Radio;
