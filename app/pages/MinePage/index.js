import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button
} from 'react-native';
import {
    ActionConst, Actions
} from 'react-native-router-flux';

import style from './style';
import LinkItems from '../../components/LinkItems';
import LinkItem from '../../components/LinkItem';
import IconsGroup from '../../components/IconsGroup';
import CirImage from '../../components/CirImage';


@autobind
class MinePage extends Component {
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
        linkItems: [{
            leftText: '邀请好友',
            rightText: '赠300礼包',
            style: {
                marginVertical: 10
            },
            onPress: () => Actions.inviteFriend()
        }, {
            leftText: '我的收藏',
            showBorder: null,
            onPress: () => Actions.myCollection()
        }, {
            leftText: '我的优惠券',
            onPress: () => Actions.myDiscountCoupon()
        }, {
            leftText: '最近浏览',
            onPress: () => Actions.recentSkim()
        }, {
            leftText: '我的资料',
            onPress: () => Actions.myInformation()
        }],
        iconItems: [{
            text: '待付款',
            onPress: Actions.waitToPay
        }, {
            text: '进行中',
            onPress: Actions.ing
        }, {
            text: '待反馈',
            onPress: Actions.waitToFeedBack
        }, {
            text: '待确认',
            onPress: Actions.waitToConfirm
        }, {
            text: '待评价',
            onPress: Actions.waitToEvaluate
        }]
    }
    state = {}
    static propTypes = {}

    render() {
        const {store: {mine: {username}}, linkItems, iconItems} = this.props

        return (
            <View style={style.main}>
                <LinkItems
                    renderHeader={() =>
                        <View>
                            <View style={style.avatarContainer}>
                                <CirImage size={70} />
                                <Text style={style.username}>{username}</Text>
                            </View>
                            <LinkItem showBorder="bottom" leftText="我的订单" rightText="全部订单" onPress={Actions.totalOrder}/>
                            <IconsGroup items={iconItems}/>
                        </View>
                    }
                    items={linkItems}/>
            </View>
        )
    }
}

export default MinePage;
