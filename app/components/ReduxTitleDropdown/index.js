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

import TitleDropdown from '../TitleDropdown';
@autobind
class ReduxTitleDropdown extends Component {
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
        const {
            store: {
                common: {openModal},
                my_total_order: {titleIndex, filters}
            },
            actions
        } = this.props;
        const list = filters.map(x => ({
            ...x,
            onPress: (index, data) => {
                actions.setMyActiveTotalOrderTitleIndex(index);
                actions.fetchMyTotalOrder("reset");
                setTimeout(()=>{
                    this.refs.drop.hideDropDown();
                }, 100)
            }
        }))

        return <TitleDropdown
            showTitleIcon
            ref="drop"
            style={{width: 200}}
            title={list[titleIndex].title}
            selectedIndex={titleIndex}
            options={list}
        />
    }
}

export default ReduxTitleDropdown;
