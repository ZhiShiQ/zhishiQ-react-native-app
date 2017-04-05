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
    Image,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as CONST from '../../constant';
import * as HELPER from '../../helpers';

import CollapsibleIntro from '../../components/CollapsibleIntro';
import BottomBtns from '../../components/BottomBtns';

import sty from './style';


const {sep} = HELPER;
const textStyle = {color: '#4a4a4a', fontSize: 14, lineHeight: 27};
const thinSep = <View style={{height: 1.4, flex: 0, backgroundColor: '#f7f7f7'}}/>;

@autobind
class SubServiceDetailPage extends Component {
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
        const {...props} = this.props

        const titles = [{title: "方案比较"}, {title: "文章样例"}];
        const titleStyle = {fontWeight: '600', color: '#4a4a4a', fontSize: 14, lineHeight: 20};
        const thinSep = <View style={{height: 1.4, flex: 0, backgroundColor: '#f7f7f7'}}/>;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={sty.main}>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <View style={{paddingRight: 15}}>
                            <Image style={{width: 100, height: 100, backgroundColor: '#eee'}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: '#4a4a4a', fontSize: 14, lineHeight: 18}}>提供针对个人陈述/推荐信/简历/小文章等留学文书的点评、语言润色、深度修改、辅导撰写等服务，权威外籍导师一对一个性化指导，助你的文书脱颖而出。</Text>
                        </View>
                    </View>

                    {thinSep}

                    <ListView
                        scrollEnabled={false}
                        contentContainerStyle={{
                            paddingVertical: 15,
                            flexDirection: 'row',// height: 125,
                            justifyContent: 'center',
                            alignItems: 'center', backgroundColor: '#fff'
                        }}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(titles)
                        }
                        renderRow={ (x, s, i) =>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text style={{color: '#ea5502', fontSize: 16}}>{x.title}</Text>
                            </View>
                        }
                        renderSeparator={ (x, i) => i != titles.length - 1 && <View
                            style={{width: 1, alignSelf: 'stretch', marginVertical: -2, backgroundColor: '#c4c4c4'}}/> }
                    />

                    {sep()}
                    {this.renderItem()}
                    {sep()}
                    {this.renderItem()}
                    {sep()}
                    <CollapsibleIntro
                        title={"套餐外可额外加购服务"}
                    >
                        <View style={{borderWidth: 1, borderColor: '#e5e5e5'}}>
                            <Text style={{fontSize: 16, color: '#4a4a4a', flex: 1, textAlign: 'center', padding: 13, fontWeight: '600'}}>指定顾问</Text>
                            <View style={{borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingVertical: 13, paddingHorizontal: 10, paddingTop: 5, backgroundColor: '#fafafa'}}>
                                <Text style={[titleStyle, {marginTop: 5}]}>指定特定顾问：</Text>
                                <Text style={textStyle}>• 将由该顾问完成您的文书修改</Text>
                                <Text style={textStyle}>• 将由该顾问完成您的文书修改</Text>

                                <View style={{backgroundColor: '#e5e5e5', height: 1, marginHorizontal: -10, marginVertical: 4}} />

                                <Text style={[titleStyle, {marginTop: 5}]}>指定特定顾问：</Text>
                                <View style={{flexDirection: 'row', marginVertical: 4}}>
                                    <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                                    <Text style={[textStyle, {lineHeight: 20, flex: 1}]}>顾问等级为平台依据专家组评分，用户评价，服务响应时间等标准综合评比确定</Text>
                                </View>
                                <Text style={textStyle}>• 指定不同等级顾问价格如下：</Text>
                                <View style={{marginLeft: 15}}>
                                    <Text style={[textStyle, {color: '#848484', lineHeight: 22}]}>指定 level2 顾问＋总价 10%</Text>
                                    <Text style={[textStyle, {color: '#848484', lineHeight: 22}]}>指定 level2 顾问＋总价 10%</Text>
                                    <Text style={[textStyle, {color: '#848484', lineHeight: 22}]}>指定 level2 顾问＋总价 10%</Text>
                                    <Text style={[textStyle, {color: '#848484', lineHeight: 22}]}>指定 level2 顾问＋总价 10%</Text>
                                </View>

                                <View style={{backgroundColor: '#e5e5e5', height: 1, marginHorizontal: -10, marginVertical: 4}} />

                                <Text style={[titleStyle, {marginTop: 5}]}>不指定顾问：</Text>
                                <View style={{flexDirection: 'row', marginVertical: 4}}>
                                    <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                                    <Text style={[textStyle, {lineHeight: 20, flex: 1}]}>不指定特定顾问和顾问等级，文书将由本申请领域各等级顾问自由接单。</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{height: 14}}/>

                        <View style={{borderWidth: 1, borderColor: '#e5e5e5'}}>
                            <Text style={{fontSize: 16, color: '#4a4a4a', flex: 1, textAlign: 'center', padding: 13, fontWeight: '600'}}>翻译</Text>
                            <View style={{borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingVertical: 8, paddingHorizontal: 10, paddingTop: 5, backgroundColor: '#fafafa'}}>

                                <View style={{flexDirection: 'row', marginVertical: 4}}>
                                    <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                                    <Text style={[textStyle, {lineHeight: 20, flex: 1}]}>72 小时, 180.84 元 / 千汉字（正常）</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginVertical: 4}}>
                                    <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                                    <Text style={[textStyle, {lineHeight: 20, flex: 1}]}>72 小时, 180.84 元 / 千汉字（正常）</Text>
                                </View>

                            </View>
                        </View>
                    </CollapsibleIntro>

                    <View style={{height: 14}}/>
                </ScrollView>
                <BottomBtns lefts={[{text: "客服", onPress: null}]} mainText={"立即购买"}/>
            </View>
    )
    }

    renderItem() {

        return (
        <View>
        <CollapsibleIntro
        title={"语言润色"}
        titleCenter
        >
        <Text style={textStyle}>• 适用于已有初稿并且希望着重提升语言表达的用户</Text>
        <Text style={textStyle}>• 适用于除简历外所有留学文书</Text>
        <Text style={textStyle}>• 一对一匹配顶级名校外籍老师</Text>
        <Text style={textStyle}>• 1 稿 / 3 天</Text>
        <Text style={textStyle}>• 每一稿完成 3 天内不限留言数</Text>
        <Text style={textStyle}>• 文章压缩范围：±10%</Text>
        <Text style={textStyle}>• 服务有效期：7 天</Text>
        </CollapsibleIntro>
        {thinSep}
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingHorizontal: CONST.PADDING_SIZE,
            paddingVertical: 8
        }}>
        <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 24, color: '#ea5502'}}>￥160</Text>
        <Text style={{fontSize: 14, color: '#4a4a4a'}}> 起/300单词</Text>
        </View>
        <Text style={{fontSize: 12, color: '#848484'}}>（超过部分¥0.53/单词）</Text>
        </View>
        <View style={{flex: 0, justifyContent: 'center'}}>
        <TouchableOpacity style={{
            paddingHorizontal: 24,
            paddingVertical: 10,
            backgroundColor: '#ea5502',
            borderRadius: 2
        }}>
        <Text style={{color: '#fff', fontSize: 13}}>立即购买</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        )
    }
    }

    export default SubServiceDetailPage;
