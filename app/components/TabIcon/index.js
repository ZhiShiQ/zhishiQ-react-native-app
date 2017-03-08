import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button
} from 'react-native';

import style from './style';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';


@autobind
class TabIcon extends Component {
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
    static propTypes = {
        title: React.PropTypes.string,
        selected: React.PropTypes.bool,
        iconName: React.PropTypes.string
    };
    icons = {
        home: <SimpleLineIcon color="#a1a1a1" size={26} name="home"/>,
        cart: <Ionicon color="#a1a1a1" size={26} name="ios-cart-outline"/>,
        service: <Ionicon color="#a1a1a1" size={26} name="ios-cart-outline"/>,
        mine: <Ionicon color="#a1a1a1" size={26} name="ios-cart-outline"/>,
    }

    render() {
      const {title, selected, iconName} = this.props;

      return (
          <View
              style={{alignItems: 'center'}}
          >
              {React.cloneElement(this.icons[iconName], {color: selected ? '#ea5502' : '#a1a1a1'})}
              <Text style={{ color: selected ? '#ea5502' : '#a1a1a1', fontSize: 11.5}}>{title}</Text>
          </View>
      )
    }
}

export default TabIcon;
