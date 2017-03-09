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
import EvilIcon from 'react-native-vector-icons/EvilIcons';

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
        const {actions, store, params: {type}} = this.props;

        return (
            <View style={sty.main}>
                <ScrollView>
                    <LinkItem showIcon={false}
                              emphasize
                              leftText={"主题咨询：加拿大留学生活学习"}
                              leftStyle={{flex: 5}}
                              rightTextStyle={{color: '#ea5502', fontWeight: '600'}} rightText={"￥21"}/>
                    <InputExtra ref="what" style={{marginTop: 16}} labelStyle={{width: 80}} label={"我想咨询"}
                                inputProps={{placeholder: '输入想咨询的内容'}}/>
                    {this.pureText("别忘了先介绍一下自己，如教育背景、 GPA 、托福等")}
                    <InputExtra labelStyle={{width: 80}} label={"QQ"} inputProps={{placeholder: '输入您的QQ'}}/>
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={"#e5e5e5"}/>
                    <InputExtra labelStyle={{width: 80}} label={"Skype"} inputProps={{placeholder: '输入您的Skype（选题）'}}/>
                    {this.pureText("顾问会通过qq或skype与您取得联系")}
                    <LinkItem leftText="设置空闲时间" onPress={() => Actions.timezoneAndFreeTime()}/>
                    {this.pureText(
                        "已阅读或同意",
                        "服务条款"
                    )}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                    {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }

    _getBottomBtnsProps() {
        const {params: {type}} = this.props;
        switch (type) {
            case 'buy':
                return {mainText: "去付款", onMainPress: () => {
                    Actions.tab_cart({type: ActionConst.JUMP});
                    const {what: {value}} = this.refs;
                }}
            case 'cart':
                return {subText: " 加入购物车", onSubPress: () => {
                    Actions.tab_cart({type: ActionConst.JUMP});
                    const {what: {value}} = this.refs;
                }}
        }
    }

    pureText(text, btnText) {
        return (
            <View style={{flexDirection: 'row', marginTop: 4,
                marginBottom: 15, paddingLeft: 15,}}>
                {btnText && <Text style={{top: 7}} ><EvilIcon size={18} color="#ea5502" name="check"/></Text>}
            <Text style={{
                color: '#a1a1a1',
                lineHeight: 25,
                fontSize: 13.5,
                paddingRight: !btnText? 15: 0,
            }}>
                {text}
            </Text>
                {btnText && <TouchableWithoutFeedback
                    onPress={()=>Actions.serviceClause()}>
                    <View>
                    <Text style={{fontSize: 13.5, lineHeight: 25, color: '#ea5502'}}>{btnText}</Text>
                    </View>
                </TouchableWithoutFeedback>}
            </View>
        )
    }
}

export default OrderConfirmPage;
