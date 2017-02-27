import React, {Component} from 'react';
import {Map} from 'immutable';
import {
  Text,
  View
} from 'react-native';

import style from './style';


export default class LoginPage extends Component {
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
      const {...props} = this.props

      return (
        <View style={style.main}>
            <Text>LoginPage</Text>
        </View>
      )
    }
}
