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

import sty from './style';

import ScrollableTab, {DefaultTabBar} from 'react-native-scrollable-tab-view';
@autobind
class ScrollTab extends Component {
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
        tabBarStyle: PropTypes.object,
        tabContainerStyle: PropTypes.object,
    }
    render() {
        const {children, tabContainerStyle, tabBarStyle, ...rest} = this.props

        return (
            <ScrollableTab
                renderTabBar={() => <DefaultTabBar tabContainerStyle={tabContainerStyle} style={[{height: 48}, tabBarStyle]} tabStyle={{paddingBottom: 0}}/>}
                tabBarTextStyle={{fontSize: 17}}
                tabBarInactiveTextColor="#4A4A4A"
                tabBarActiveTextColor="#EA5502"
                tabBarBackgroundColor="#fff"
                tabBarUnderlineStyle={{backgroundColor: "#EA5502", height: 2}}
                {...rest}
            >
                {children}
            </ScrollableTab>
        )
    }
}

export default ScrollTab;
