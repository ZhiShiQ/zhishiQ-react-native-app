import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    ScrollView,
    StyleSheet,
    Button
} from 'react-native';

import sty from './style';

import HorizontalMenu from '../../components/HorizontalMenu'
import ScrollTab from '../../components/ScrollTab';
import BoughtViews from '../../components/BoughtViews';
import {sep} from '../../helpers';
import ModalDropdown from 'react-native-modal-dropdown';

@autobind
class TotalOrderPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        menus: [
            {title: '全部', active: true, onPress: null},
            {title: '待付款', onPress: null},
            {title: '待开始', onPress: null},
            {title: '进行中', onPress: null},
            {title: '待反馈', onPress: null},
            {title: '待确认', onPress: null},
            {title: '待评价', onPress: null},
            {title: '已取消', onPress: null},
        ],
        boughtList: [{
            title: 'sds', active: true, thumbnail: {},
            state: 'ing', prompt: '2016-09-12', disCount: 300,
            price: 99999,
            content: 'CONTENT',
            onPress: null, onBtnPress: null, btnDisabled: true
        }, {
            title: 'sds', active: true, thumbnail: {},
            state: 'ing', prompt: '2016-09-12', disCount: 300,
            price: 99999, content: 'CONTENT'
        }, {
            title: 'sds', active: true, thumbnail: {},
            state: 'wait', prompt: '2016-09-12', disCount: 300,
            price: 99999, content: 'CONTENT'
        }]
    }
    state = {}
    static propTypes = {}

    render() {
        const {store, menus, boughtList} = this.props;
        return (
            /*<View sty={sty.main}>*/
                <ScrollTab
                    style={{flex: 1}}
                    page={0}
                    /*tabContainerStyle={{flexWrap: 'wrap'}}*/
                    tabBarStyle={{height: 33}}
                    tabBarTextStyle={{fontSize: 13}}
                >
                    <View style={{flex: 1}} tabLabel="全部">
                        <BoughtViews
                            renderHeader={() => sep()}
                            items={boughtList} />
                    </View>
                    <View tabLabel="待付款"></View>
                    <View tabLabel="待开始"></View>
                    <View tabLabel="进行中"></View>
                    <View tabLabel="待反馈"></View>
                    <View tabLabel="待确认"></View>
                    <View tabLabel="待评价"></View>
                    <View tabLabel="已取消"></View>
                </ScrollTab>
            /*</View>*/
        )
    }
}

export default TotalOrderPage;
