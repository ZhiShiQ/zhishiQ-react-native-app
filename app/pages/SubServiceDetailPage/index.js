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
import {Actions} from 'react-native-router-flux';
import * as CONST from '../../constant';
import * as HELPER from '../../helpers';

import CollapsibleIntro from '../../components/CollapsibleIntro';
import BottomBtns from '../../components/BottomBtns';
import Panel from '../../components/Panel';

import sty from './style';


const {sep} = HELPER;
const textStyle = {color: '#4a4a4a', fontSize: 14, lineHeight: 27};
const thinSep = <View style={{height: 1.4, flex: 0, backgroundColor: '#f7f7f7'}}/>;
const titleStyle = {fontWeight: '600', color: '#4a4a4a', fontSize: 14, lineHeight: 20};
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
        // const {params={}} = this.props;
        // const {source="sub_service_detail"} = params;
        const {
            actions,
            store: {
                sub_service_detail: {
                    type,//("oneStepApply")
                    base: {description},
                    detail: {items, subs}
                }
            }
        } = this.props;

        const titles = [{title: "方案比较"}, {title: "文章样例"}];
        const isOneStepApply = type == 'oneStepApply';
        const noBase = isOneStepApply;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={sty.main}>
                    {!noBase &&
                    <View>
                        <View
                            style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
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
                                <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={{color: '#ea5502', fontSize: 16}}>{x.title}</Text>
                                </TouchableOpacity>
                            }
                            renderSeparator={ (x, i) => i != titles.length - 1 && <View
                                style={{
                                    width: 1,
                                    alignSelf: 'stretch',
                                    marginVertical: -2,
                                    backgroundColor: '#c4c4c4'
                                }}/> }
                        />
                    </View>}

                    {sep()}
                    <ListView
                        scrollEnabled={false}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(items.map((x, i) => ({
                                ...x, onBtnPress: () => {
                                    if (!isOneStepApply) {
                                        this._pushOrderConfirm({index: i})
                                    } else {

                                    }
                                }, onSubPress: isOneStepApply ? () => {

                                    } : null
                            })))
                        }
                        renderRow={(x, s, i) => this.renderItem(x, i)}
                        renderSeparator={(s, i) => i != items.length - 1 && sep()}
                    />
                    {sep(!subs||!subs.length)}
                    <ListView
                        scrollEnabled={false}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(subs)
                        }
                        renderRow={(x, s, i) => this.renderSubItem(x, i)}
                        renderSeparator={(s, i) => i != subs.length - 1 && sep()}
                    />


                    <View style={{height: 14}}/>
                </ScrollView>
                <BottomBtns lefts={[{text: "客服", onPress: null}]}
                            subText={"加入购物车"}
                            onSubPress={() => {
                            }}
                            mainText={"立即购买"}
                            onMainPress={() => {
                                // 默认选择第一个服务等级。
                                this._pushOrderConfirm({index: 0});
                            }}
                />
            </View>
        )
    }

    _pushOrderConfirm({index = 0}) {
        const {
            actions,
            store: {
                sub_service_detail: {
                    type,
                    base: {description, id},
                    detail: {items, subs}
                }
            }
        } = this.props;
        actions.setOrderConfirmType(type);
        // actions.setOrderConfirmTopic(name);
        actions.setOrderConfirmLevels(
            items.map(({title, bottom: {price}}) => ({label: title, price}))
        );
        actions.setOrderConfirmPrice(items[index].bottom.price);
        actions.setOrderConfirmLevelIndex(index || 0);
        actions.setOrderConfirmId(id);
        Actions.orderConfirm({params: {type: 'buy'}});
    }

    renderItem({title, contents, bottom, onBtnPress, onSubPress}, i) {

        return (
            <View key={i}>
                <CollapsibleIntro
                    title={title}
                    titleCenter
                >
                    {contents.map((text, i) => (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                            <Text style={[textStyle, {lineHeight: 20}]}>{text}</Text>
                        </View>
                    ))}
                </CollapsibleIntro>
                {thinSep}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    paddingHorizontal: CONST.PADDING_SIZE,
                    paddingVertical: bottom.addon ? 8 : CONST.PADDING_SIZE
                }}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 24, color: '#ea5502'}}>￥{bottom.price}</Text>
                            {bottom.addon && <Text style={{fontSize: 14, color: '#4a4a4a'}}> 起/300单词</Text>}
                        </View>
                        {bottom.tip && <Text style={{fontSize: 12, color: '#848484'}}>{bottom.tip}</Text>}
                    </View>

                    {bottom.subBtnText && <View style={{flex: 0, justifyContent: 'center', marginRight: 20}}>
                        <Text style={{fontSize: 13, color: '#848484'}} onPress={onSubPress}>{bottom.subBtnText}</Text>
                    </View>}

                    <View style={{flex: 0, justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 24,
                                paddingVertical: 10,
                                backgroundColor: bottom.infoBtn ? '#1097ec' : '#ea5502',
                                borderRadius: 2
                            }}
                            onPress={onBtnPress}
                        >
                            <Text style={{color: '#fff', fontSize: 13}}>{bottom.btnText || "立即购买"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderSubItem({title, contents}, i) {
        // debugger;
        // alert(title, contents.length);
        // const {title: title1, contents: contents1} = contents;
        return (
            <CollapsibleIntro
                key={i}
                title={title}
            >

                <ListView
                    scrollEnabled={false}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(contents)
                    }
                    renderRow={({title, contents}, s, i) => (
                        <Panel title={title}>
                            {contents.map((c, i) => {
                                let title, contents, content;
                                if (typeof c === 'string') {
                                    content = c;
                                } else {
                                    title = c.title;
                                    contents = c.contents;
                                }
                                return (
                                    <View key={i}>
                                        {title &&
                                        <Text style={[titleStyle, {marginTop: i == 0 ? 0 : 5}]}>{title}</Text>}
                                        {/*{content && <View style={{flexDirection: 'row', marginVertical: 4}}>*/}
                                        {/*<Text style={[textStyle, {lineHeight: 20}]}>• </Text>*/}
                                        {/*<Text style={[textStyle, {*/}
                                        {/*lineHeight: 20,*/}
                                        {/*flex: 0*/}
                                        {/*}]}>{content}</Text>*/}
                                        {/*</View>}*/}

                                        <View>
                                            {contents &&
                                            <View>
                                                {contents.map((c, i) => {
                                                    let contents, content;
                                                    if (typeof c === 'string') {
                                                        content = c;
                                                    } else {
                                                        content = c.title;
                                                        contents = c.contents;
                                                    }
                                                    return (
                                                        <View key={i}>
                                                            {content &&
                                                            <View style={{flexDirection: 'row', marginVertical: 4}}>
                                                                <Text style={[textStyle, {lineHeight: 20}]}>• </Text>
                                                                <Text style={[textStyle, {
                                                                    lineHeight: 20,
                                                                    flex: 1
                                                                }]}>{content}</Text>
                                                            </View>}
                                                            {contents &&
                                                            contents.map((text, i) => (
                                                                <View style={{marginLeft: 15}}>
                                                                    <Text key={i} style={[textStyle, {
                                                                        color: '#848484',
                                                                        lineHeight: 22
                                                                    }]}>
                                                                        {text}
                                                                    </Text>
                                                                </View>
                                                            ))
                                                            }
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                            }
                                        </View>
                                    </View>
                                )
                            })}
                        </Panel>
                    )}
                    renderSeparator={(s, i) => i != contents.length - 1 && <View style={{height: 14}}/>}
                />

            </CollapsibleIntro>
        )
    }
}

export default SubServiceDetailPage;
