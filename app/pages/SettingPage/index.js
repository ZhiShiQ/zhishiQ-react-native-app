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
    Alert,
    ScrollView,
    Button
} from 'react-native';

import {Actions, ActionConst} from 'react-native-router-flux';

import {removeToken} from '../../helpers/index';

import LinkItems from '../../components/LinkItems';
import BlockButton from '../../components/BlockButton';
import LinkItem from '../../components/LinkItem';

import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class SettingPage extends Component {
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

    static defaultProps = {};
    state = {};
    static propTypes = {};

    render() {
        const {...props} = this.props;

        return (
            <View style={[sty.main, {backgroundColor: '#F7F7F7'}]}>
                <LinkItems
                    style={{flex: 1}}
                    items={[{
                        leftText: '修改密码',
                    }, {
                        leftText: '修改手机号'
                    }, {
                        leftText: '修改邮箱'
                    }, {
                        leftText: '交易记录与账户余额'
                    }]}
                    renderFooter={() => (
                        <View style={{marginTop: 15}}>
                            <LinkItem leftText={"通用设置"}></LinkItem>
                        </View>
                    )}
                />
                <BlockButton
                    title={"退出登录"}
                    onPress={() => {
                        removeToken().then(x => {
                            Alert.alert("确认退出？", null, [
                                {text: "取消", onPress: () => {}},
                                {text: "确定", onPress: () => {
                                    removeToken().then(x => {
                                        Actions.entry({type: ActionConst.POP_AND_REPLACE});
                                    })
                                }}
                            ])
                        })
                    }}/>
            </View>
        )
    }
}

export default SettingPage;
