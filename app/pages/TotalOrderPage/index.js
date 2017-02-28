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
import BoughtViews from '../../components/BoughtViews';

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
            state: '进行中', prompt: '2016-09-12', count: 300,
            price: 99999, btnText: '服务进行中',
            content: 'CONTENT',
            onPress: null, onBtnPress: null, btnDisabled: true
        }, {
            title: 'sds', active: true, thumbnail: {},
            state: '进行中', prompt: '2016-09-12', count: 300,
            price: 99999, content: 'CONTENT'
        }, {
            title: 'sds', active: true, thumbnail: {},
            state: '进行中', prompt: '2016-09-12', count: 300,
            price: 99999, content: 'CONTENT'
        }]
    }
    state = {}
    static propTypes = {}

    render() {
        const {store, menus, boughtList} = this.props;
        return (
            <View sty={sty.main}>
                <HorizontalMenu items={menus}/>
                <BoughtViews items={boughtList} style={{marginTop: 36}}/>
            </View>
        )
    }
}

export default TotalOrderPage;
