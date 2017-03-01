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

import sty from './style';


@autobind
class SubMenu extends Component {
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
        title: PropTypes.string,
        onPress: PropTypes.func,
        active: PropTypes.bool,
        style: PropTypes.object
    }
    render() {
        const {title, onPress, active, style} = this.props

        return (
            <TouchableHighlight
                style={[sty.rowContainer, active ? sty.active : {}, style]}
                onPress={onPress}
            >
                <Text style={sty.rowText}>{title}</Text>
            </TouchableHighlight>
        )
    }
}

export default SubMenu;
