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
import {Actions, ActionConst} from 'react-native-router-flux';

import InputExtra from '../../components/InputExtra';
import LinkItem from '../../components/LinkItem';
import Hr from '../../components/Hr';
import BottomBtns from '../../components/BottomBtns';

import sty from './style';


@autobind
class OrderConfirmPage extends Component {
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

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {...props} = this.props;

        return (
            <View style={sty.main}>
                <ScrollView>
                    <LinkItem showIcon={false} leftText={"主题咨询：加拿大留学生活学习"} leftStyle={{flex: 5}}
                              rightTextStyle={{color: '#ea5502', fontWeight: '600'}} rightText={"￥21"}/>
                    <InputExtra ref="what" style={{marginTop: 16}} labelStyle={{width: 80}} label={"我想咨询"}
                                inputProps={{placeholder: '输入想咨询的内容'}}/>
                    {this.pureText("别忘了先介绍一下自己，如教育背景、 GPA 、托福等")}
                    <InputExtra labelStyle={{width: 80}} label={"QQ"} inputProps={{placeholder: '输入您的QQ'}}/>
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={"#e5e5e5"}/>
                    <InputExtra labelStyle={{width: 80}} label={"Skype"} inputProps={{placeholder: '输入您的Skype（选题）'}}/>
                    {this.pureText("顾问会通过qq或skype与您取得联系")}
                    <LinkItem leftText="设置空闲时间" onPress={() => Actions.timezoneAndFreeTime()}/>
                    {this.pureText("已阅读或同意服务条款")}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]} onMainPress={() => {
                    // Actions.tabbar({type: ActionConst.PUSH});
                    Actions.tab_service();
                    // Actions.tab_service({type: ActionConst.POP_AND_REPLACE});
                    // Actions.tab_cart({type: ActionConst.REPLACE});
                    const {what: {value}} = this.refs;
                }} mainText={"去付款"}/>
            </View>
        )
    }

    pureText(text) {
        return (
            <Text style={{
                paddingHorizontal: 15,
                color: '#a1a1a1',
                marginTop: 10,
                marginBottom: 20,
                fontSize: 13.5
            }}>{text}</Text>
        )
    }
}

export default OrderConfirmPage;
