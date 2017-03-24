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
    static defaultProps = {
        wrap: false
    }
    state = {}
    static propTypes = {
        tabBarStyle: PropTypes.object,
        tabContainerStyle: PropTypes.object,
        tabBarTextStyle: PropTypes.object,
        wrap: PropTypes.bool
    }

    get tabBar() {
        return this._tabs.refs.tabBar;
    }

    get tabs() {
        return this._tabs;
    }

    _defaultRenderTabBar() {
        const {children, wrap, tabContainerStyle, renderTabBar, tabBarStyle, tabBarTextStyle, ...rest} = this.props
        return <DefaultTabBar ref="tabBar" wrap={wrap} tabContainerStyle={tabContainerStyle} style={[{height: 48}, tabBarStyle]} tabStyle={{paddingBottom: 0}}/>
    }

    render() {
        const {children, wrap, renderTabBar, tabContainerStyle, tabBarStyle, tabBarTextStyle, ...rest} = this.props

        return (
            <ScrollableTab
                ref={r => this._tabs = r}
                renderTabBar={() =>
                    renderTabBar ? renderTabBar(this._defaultRenderTabBar.bind(this)) : this._defaultRenderTabBar()
                }
                tabBarTextStyle={[{fontSize: 17, color: '#4a4a4a'}, tabBarTextStyle]}
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
