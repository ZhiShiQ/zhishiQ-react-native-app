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

import sty from './style';
import * as CONST from '../../constant';
import * as HELPER from '../../helpers';

import LinkItem from '../../components/LinkItem';
import Panel from '../../components/Panel';
import PersonInOrder from '../../components/PersonInOrder';
import Hr from '../../components/Hr';
import BottomBtns from '../../components/BottomBtns';
import Radio from '../../components/Radio';
import OrderConfirmPage from '../OrderConfirmPage';

const {BlueButton} = OrderConfirmPage;
const {sep} = HELPER;
@autobind
class OrderConfirmDetailPage extends Component {
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
        const state = "ing";
        switch (state) {
            case 'waitToPay':
                return this.renderWaitToPay();
            case 'waitToUpload':
                return this.renderWaitToUpload();
            case 'ing':
                return this.renderIng();
            case 'waitToConfirmMeetTime':
                return this.renderWaitToConfirmMeetTime();
        }
    }

    renderWaitToConfirmMeetTime() {
        return this._render({
            stateText: '等待确认会面时间',
            tipText: '请在下方时间安排处确认您期望的会面时间',
            preChildren: (
                <View>
                    {sep()}
                    {_renderMainItem({title: "时间安排"})}
                    <View style={{backgroundColor: '#fff', paddingHorizontal: CONST.PADDING_SIZE}}>
                        <Panel title={"第二次会面"}>
                            <View>
                                {_renderInnerKV({
                                    keys: ['会面时长', '会面状态', '会面描述'],
                                    vals: ['90分钟', '进行中', '我这几天晚上都有空，时差12小时，北京时间是上午8点到10点吧。']
                                })}
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={{color: '#848484', fontSize: 14, lineHeight: 18}}>从几个时间中选出一项作为会面时间（已转换为您所在的时区：Asia／Shanghai）</Text>
                                <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                                        <Radio color={'#c4c4c4'} style={{marginRight: 10}} selected onPress={() => {
                                        }}/>
                                        <Text style={{color: '#4a4a4a', fontSize: 16}}>2016-10-06 10:00:00</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                                        <Radio color={'#c4c4c4'} style={{marginRight: 10}} onPress={() => {
                                        }}/>
                                        <Text style={{color: '#4a4a4a', fontSize: 16}}>2016-10-06 10:00:00</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Radio color={'#c4c4c4'} style={{marginRight: 10}} onPress={() => {
                                        }}/>
                                        <Text style={{color: '#4a4a4a', fontSize: 16}}>2016-10-06 10:00:00</Text>
                                    </View>
                                </View>

                                {BlueButton({
                                    onPress: null, text: "确认选择", style: {
                                        backgroundColor: 'transparent', paddingBottom: 10
                                    }
                                })}
                            </View>
                        </Panel>

                        {sep(true)}

                        <Panel title={"第一次会面"}>
                            <View>
                                {_renderInnerKV({
                                    keys: ['会面时长', '会面状态', '会面时间', '会面描述'],
                                    vals: ['90分钟', '已结束', ['2016-08-29 21:00 for Judy（已转换时区：中国北京）', '2016-08-29 09:00 for Kaiyi Liu（已转换时区：美国华盛顿）'], '1st writing materials session. Focus on resume polish and maybe brainstorming on PS and RL']
                                })}
                            </View>
                        </Panel>

                        {sep(true)}
                    </View>

                </View>
            ),
            kvItems: [{
                title: "基本信息",
                keys: ["时长", "真实姓名", "指定顾问", "电话", "QQ", "Skype", "Wechat", "电子邮箱", "有效期"],
                vals: ["60分钟", "Ciper", "SSJ", "12341989110", "SJD", "cp12030123", "cp9qwe", "928371812@qq.com", "7天  截止至2016-09-08"]
            }, {
                title: "课程信息",
                keys: ["课程名", "额外信息"],
                vals: ["交互设计／HCI留学作品集指导", "交互、UI设计专业、院校推荐；申请过程可能需要准备些什么材料；需要掌握哪些技能；交互设计未来趋势是怎样的，有没有必要出国留学，进行下去？我的作品集里应该有哪些内容？大致的风格什么的应该是怎样的？然后又木有什么参考？"]
            }],
            bottomComponent: this._renderBottom({mainText: "联系客服", subText: "其他", text: "联系顾问"})
        })
    }

    renderIng() {
        return this._render({
            stateText: '进行中',
            tipText: '上传文书原稿后，就可以开始服务啦',
            kvItems: [{
                title: "申请信息",
                keys: ["申请领域", "申请学位", "目标语言", "申请国家"],
                vals: ["战略管理学", "SJD", "英语", "美国"]
            }, {
                title: "文书信息",
                keys: ["服务等级", "项目数量", "文书管家"],
                vals: ["语言润色", "4个项目", "不需要"]
            }],
            children: (
                <View>
                    <LinkItem leftText={"空闲时间"} leftTextStyle={{color: "#4a4a4a"}} onPress={null}/>
                    {sep()}
                    {_renderMainItem({title: "文书项目列表（共4个 已添加2个）",})}
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={'#e5e5e5'}/>
                    {_renderSubject({
                        name: "留学文书润色 ID：1423",
                        state: "进行中",
                        intro: "语言润色• 金融学 语言润色 • 运筹学、物流管理、供应链管理学 • Pers…"
                    })}
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={'#e5e5e5'}/>
                    {_renderSubject({
                        name: "留学文书润色 ID：1423",
                        state: "待上传文书",
                        intro: "语言润色• 金融学 语言润色 • 运筹学、物流管理、供应链管理学 • Pers…"
                    })}
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={'#e5e5e5'}/>
                </View>
            ),
            bottomComponent: this._renderBottom({
                mainText: "添加项目",
                subText: "购买文书管家",
                text: "联系顾问"
            })
        })
    }

    renderWaitToUpload() {
        return this._render({
            stateText: '待上传文书原稿',
            tipText: '上传文书原稿后，就可以开始服务啦',
            kvItems: [{
                title: "申请信息",
                keys: ["申请学位", "申请领域"],
                vals: ["SJD", "战略管理学"]
            }, {
                title: "文书信息",
                keys: ["申请学位", "申请领域"],
                vals: ["SJD", "战略管理学"]
            }],
            children: (
                <View>
                    {_renderMainItem({
                        title: "指定文书顾问",
                    })}
                    <Hr color={"#e5e5e5"} marginBottom={0} style={{marginHorizontal: CONST.PADDING_SIZE}}/>
                    <PersonInOrder normal average={4.8} clients={345} name="Lindsey Ma" school={"伦敦艺术大学"}
                                   intro={"面试招生官"}/>
                </View>
            ),
            bottomComponent: this._renderBottom({mainText: "去上传", subText: "购买文书管家", text: "联系顾问"})
        })
    }

    _renderBottom({mainText, subText, onMain, onSub, text, onText}) {
        return (
            <View style={{
                flexDirection: 'row',
                height: 49,
                justifyContent: 'center',
                paddingHorizontal: CONST.PADDING_SIZE,
                // alignItems: 'center',
                backgroundColor: '#fff'
            }}>
                <TouchableOpacity
                    style={{justifyContent: 'center', flex: 0}}
                    onPress={onText}
                >
                    <Text style={{color: '#4a4a4a', fontSize: 14}}>{text}</Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    height: 35
                }}>
                    <TouchableOpacity
                        style={{
                            marginRight: 8,
                            width: 100, alignItems: 'center', justifyContent: 'center',
                            borderColor: '#848484', borderWidth: .75, borderRadius: 4
                        }}
                        onPress={onSub}
                    >
                        <Text style={{paddingHorizontal: 0, fontSize: 13, color: '#4a4a4a'}}>{subText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100, justifyContent: 'center', alignItems: 'center',
                            borderColor: '#f0591d', borderWidth: .75, borderRadius: 4,
                        }}
                        onPress={onMain}
                    >
                        <Text style={{paddingHorizontal: 0, fontSize: 13, color: '#ea5502'}}>{mainText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _render({stateText, tipText, kvItems = [], preChildren, children, bottomComponent}) {
        return (
            <View style={sty.main}>
                <ScrollView>
                    <LinkItem leftText={"服务ID：" + "123726"} rightText={stateText}
                              onPress={null} rightTextStyle={{fontSize: 16, color: '#ea5502'}}
                              showIcon={false}
                    />
                    <LinkItem
                        style={{backgroundColor: '#fff4ef'}}
                        leftText={tipText}
                        onPress={null}
                        leftTextStyle={{fontSize: 14, color: '#848484'}}
                        showBorder={"top"}
                    />

                    {preChildren}

                    {sep()}
                    <ListView
                        scrollEnabled={false}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(kvItems)
                        }
                        renderRow={(x, s, i) => _renderMainItem(x)}
                        renderSeparator={(s, i) => kvItems.length - 1 != i && sep()}
                    />
                    {sep()}
                    {children}
                </ScrollView>

                {bottomComponent}
            </View>
        )
    }

    renderWaitToPay() {
        return this._render({
            stateText: '等待付款',
            tipText: '等待用户付款',
            kvItems: [
                {title: "申请信息", keys: ["申请学位", "申请领域"], vals: ["SJD", "战略管理学"]},
                {
                    title: "文书信息",
                    keys: ["文档类型", "文书语言", "服务等级", "原稿字数", "终稿字数", "加急处理"],
                    vals: ["PS", "中文", "语言润色", "300", "310", "不需要"]
                }
            ],
            children: (
                <View>
                    {_renderMainItem({
                        title: "指定文书顾问",
                    })}
                    <Hr color={"#e5e5e5"} marginBottom={0} style={{marginHorizontal: CONST.PADDING_SIZE}}/>
                    <PersonInOrder normal average={4.8} clients={345} name="Lindsey Ma" school={"伦敦艺术大学"}
                                   intro={"面试招生官"}/>
                    {sep()}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: CONST.PADDING_SIZE,
                        backgroundColor: '#fff'
                    }}>
                        <View style={{flex: 1}}>
                            <Text style={{color: '#4a4a4a', fontSize: 14}}>优惠券已减¥100</Text>
                        </View>
                        <View style={{flex: 0}}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{color: '#4a4a4a', fontSize: 14,}}>待支付:</Text>
                                <Text style={{fontSize: 24, color: "#ea5502"}}>￥150</Text>
                            </View>
                            <Text style={{color: '#c4c4c4', fontSize: 14, alignSelf: 'flex-end'}}>
                                原价:
                                <Text style={{textDecorationLine: 'line-through'}}>￥160</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            ),
            bottomComponent: <BottomBtns lefts={[{text: "客服"}]} mainText={"去付款 ¥150"}></BottomBtns>
        });
    }
}

const _renderInnerKV = ({keys = [], vals = []}) => (
    <ListView
        scrollEnabled={false}
        dataSource={
            new ListView.DataSource({
                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
            }).cloneWithRows(keys)
        }
        renderRow={(x, s, i) => {
            const items = Array.isArray(vals[i]) ? vals[i] : [vals[i]];
            return (
                <View style={{flexDirection: 'row', marginBottom: 6}}>
                    <Text style={{flex: 0, width: 70, lineHeight: 18, fontSize: 14, color: '#848484'}}>{x}</Text>
                    <ListView
                        scrollEnabled={false}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(items)
                        }
                        renderRow={x => (
                            <Text style={{flex: 1, fontSize: 14, lineHeight: 18, color: '#4a4a4a'}}>
                                {x}
                            </Text>
                        )}
                        renderSeparator={(s, i) => i != items.length - 1 && <View style={{height: 6}}/>}
                    />
                </View>
            )
        }}
    />
)

const _renderMainItem = ({title, keys = [], vals = []}) => {

    return (
        <View style={{padding: CONST.PADDING_SIZE, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 16, color: '#4a4a4a', marginBottom: keys.length ? 6 : 0}}>{title}</Text>
            {keys.map((k, i) => (
                <View key={i} style={{flexDirection: 'row', marginTop: 8}}>
                    <Text style={{fontSize: 14, lineHeight: 18, color: '#848484', width: 80, flex: 0}}>{k}</Text>
                    <Text style={{fontSize: 14, lineHeight: 18, color: '#4a4a4a', flex: 1}}>{vals[i]}</Text>
                </View>
            ))}
        </View>
    )
};

const _renderSubject = ({name, state, intro}) => {

    return (
        <View style={{padding: CONST.PADDING_SIZE, backgroundColor: '#fff'}}>
            <View style={{marginBottom: 8, flexDirection: 'row'}}>
                <Text style={{fontSize: 14, color: '#4a4a4a', flex: 1}}>{name}</Text>
                <Text style={{fontSize: 14, color: '#ea5502', flex: 0}}>{state}</Text>
            </View>

            <Text numberOfLines={1} style={{flex: 1, color: '#848484', fontSize: 14}}
                  ellipsizeMode={"tail"}>{intro}</Text>
        </View>
    )
};

export default OrderConfirmDetailPage;
