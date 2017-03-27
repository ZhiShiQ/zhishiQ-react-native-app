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
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions, ActionConst} from 'react-native-router-flux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {sep} from '../../helpers';

import InputExtra from '../../components/InputExtra';
import LinkItem from '../../components/LinkItem';
import Hr from '../../components/Hr';
import BottomBtns from '../../components/BottomBtns';
import CirImage from '../../components/CirImage';

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

    get hr() {
        return <Hr marginBottom={0} style={{marginHorizontal: 15}} color={"#e5e5e5"}/>;
    }

    render() {
        const {actions, store: {
            order_confirm: {id, topic, skype, qq, price, want}
        }, params: {type}} = this.props;

        return (
            <View style={sty.main}>
                <ScrollView>
                    <LinkItem showIcon={false}
                              emphasize
                              leftComponent={
                                  <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: '#4a4a4a', fontSize: 16}}>主题咨询：</Text>
                                      <Text numberOfLines={1} ellipsizeMode={"tail"}
                                            style={{color: '#4a4a4a', flex: 1, fontSize: 16}}>
                                          {topic}
                                      </Text>
                                  </View>
                              }
                              rightTextStyle={{color: '#ea5502', fontWeight: 'bold', fontSize: 16}} rightText={"￥"+price}/>
                    {sep(true, {height: 16})}
                    {this.renderSelectable({label: '申请学位', content: '请选择您申请的学位', onPress: () => actions.pickerModalOpen(true) })}
                    {this.hr}
                    {this.renderSelectable({label: '申请领域', content: '请选择您的申请领域', onPress: () => actions.pickerModalOpen(true)})}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({label: '文档类型', content: 'PS', contentHighlight: true, onPress: () => actions.pickerModalOpen(true)})}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({label: '文书语言', content: '选择您将上传文书的语言', contentHighlight: false, onPress: () => actions.pickerModalOpen(true) })}
                    {this.pureText('上传中文文书将默认选择翻译服务（0.18元／字）')}

                    {this.renderSelectable({label: '原稿字数', content: '请输入原稿字数', showIcon: false})}
                    {this.hr}
                    {this.renderSelectable({label: '终稿字数', content: '请输入终稿期望字数', showIcon: false})}
                    {this.pureText('顾问会参考您提供的终稿字数提供服务，语言润色服务终稿单词数浮动范围为原稿单词数上下10%')}

                    {this.renderSelectable({label: '服务等级', content: '语言润色', contentHighlight: true, onPress: () => actions.pickerModalOpen(true)})}
                    {this.pureText('这里需要一个关于服务等级的介绍，可能还有一个链接到单项文书产品页的链接，并且可以直接返回到这里')}

                    {this.renderSelectable({label: '加急处理', content: '不需要', contentHighlight: true, onPress: () => actions.pickerModalOpen(true)})}
                    {this.pureText('注意：加急处理无法取消')}

                    {this.renderSelectable({label: '指定顾问', content: '指定文书顾问', contentHighlight: true, onPress: () => actions.pickerModalOpen(true)})}
                    {this.hr}
                    <View style={{backgroundColor: '#fff', padding: 15, paddingBottom: 0}}>
                        <TextInput
                            placeholder={"sdsds"}
                            editable={true}
                            style={{
                                color: '#4a4a4a',
                                borderRadius: 3, flex: 1, paddingHorizontal: 10, fontSize: 16, height: 35,
                                backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#e5e5e5'
                            }}
                        />
                    </View>
                    {this.renderPeople()}
                    <Hr marginBottom={0} style={{marginHorizontal: 0}} color={"#e5e5e5"}/>
                    {this.pureText('指定文书顾问需要额外缴纳50%的指定费用，直接下单将由芝士圈文书顾问团队中的一位顾问接手您的订单。')}
                    {sep(true, {height: 16})}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                    {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }

    renderPeople() {
        const items = [{}, {}];
        return (
            <ListView
                scrollEnabled={false}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(items)}
                renderRow={(x, s, i) => this.renderPerson(x, i)}
                renderSeparator={(x, i) => i!=items.length-1?this.hr:null}
                renderFooter={() => this.renderResetButton()}
            />
        )
    }

    renderResetButton() {
        return (
            <View style={{alignItems: 'center', backgroundColor: '#fff', paddingBottom: 15}}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 22,
                        backgroundColor: '#1097ec',
                        borderRadius: 2
                    }}
                >
                    <View>
                        <Text style={{color: '#fff', fontSize: 13}}>重新选择</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderPerson() {
        return (
            <View style={{flexDirection: 'row', flex: 1, alignSelf: 'stretch', padding: 15, backgroundColor: '#fff'}}>
                <View style={{marginRight: 10}}>
                    <CirImage size={45}/>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, fontSize: 16, fontColor: '#4a4a4a', fontWeight: '600'}}>November M</Text>
                        <Text style={{fontSize: 14, color: '#848484'}}>
                            <Text style={{color: '#ea5502'}}>4.8 </Text>分
                            <Text>  </Text>
                            <Text style={{color: '#ea5502'}}>234 </Text>服务
                        </Text>
                    </View>
                    <View style={{marginTop: 6}}>
                        <Text style={{fontSize: 14, color: '#848484', flex: 1}}>
                            <Text style={{}}>伦敦艺术大学</Text>
                            <Text>   </Text>
                            <Text style={{}}>面试招生官</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderSelectable({label, content, onPress, contentStyle, contentHighlight, ...rest}) {
        return (
            <LinkItem
                leftComponent={
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{width: 80, fontSize: 16, color: '#848484'}}>{label}</Text>
                        <Text style={[{fontSize: 16, fontWeight: 'normal', color: '#c4c4c4'},
                            contentHighlight && {color: '#4a4a4a'},
                            contentStyle
                        ]}>
                            {content}</Text>
                    </View>
                }
                iconName={"down"}
                onPress={onPress}
                {...rest}
            />
        )
    }

    _getBottomBtnsProps() {
        const {params: {type}, actions} = this.props;
        switch (type) {
            case 'buy':
                return {mainText: "去付款", onMainPress: () => {
                    // Actions.tab_cart({type: ActionConst.JUMP});
                    actions.simplePayModalOpen();
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
            <View style={{flexDirection: 'row', marginTop: 8,
                marginBottom: 15, paddingLeft: 15,}}>
                {btnText && <Text style={{top: 7}} ><EvilIcon size={18} color="#ea5502" name="check"/></Text>}
            <Text style={{
                color: '#a1a1a1',
                lineHeight: 18,
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
