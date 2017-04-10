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
import * as CONST from '../../constant';
import * as HELPER from '../../helpers';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import {Actions, ActionConst} from 'react-native-router-flux';

import sty from './style';
import TeacherBasicInfo from '../../components/TeacherBasicInfo';
import ScrollTab from '../../components/ScrollTab';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import CollapsibleService from '../../components/CollapsibleService';
import Services from '../../components/Services';
import ServiceItem from '../../components/ServiceItem';
import BottomBtns from '../../components/BottomBtns';
import Hr from '../../components/Hr';

const {getHead} = CollapsibleIntro;
const {sep} = HELPER;
const HR = <Hr color={'#e5e5e5'} marginTop={10} marginBottom={0}/>;
@autobind
class ServiceDetailPage extends Component {
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
        const {params={}} = this.props;
        const {source="service_detail"} = params;

        const {
            actions, store: {
            [source]: {
                base,
                detail: {
                    services, teacherInfo, serviceTitle="套餐类型",
                    character, promise, process, offerRank
                }
            }
        }} = this.props;
        // 针对不同服务的各自的action（统一命名/统一交互）
        const {[source]: innerAction} = actions;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={sty.main}>

                    <TeacherBasicInfo
                        style={{paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 15}}
                        listValues={[base.clients, base.rate, base.reviews]}
                        listKeys={["用户数", "评分", "评价数"]}
                    >
                        <View style={{flex: 0, height: 210, alignSelf: 'stretch'}}>
                            <Image source={base.source} style={{flex: 1, backgroundColor: '#eee'}} resizeMode={"cover"}/>
                        </View>
                    </TeacherBasicInfo>

                    <ScrollTab
                        onChangeTab={({i}) => {
                        }}
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40}}
                        initialPage={0}
                    >
                        <View tabLabel="服务详情">
                            <View style={{flex: 1}}>
                                {sep()}
                                <CollapsibleIntro title={serviceTitle} style={{paddingBottom: 0}}>
                                    <View style={{marginHorizontal: -15}}>
                                        {services.map((item, i) => {
                                            item.onPress = function () {
                                                actions.setSubServiceDetailType(item.type);
                                                Actions.subServiceDetail({params: {
                                                    title: item.name,
                                                }});

                                                if (item.type!='oneStepApply') {
                                                    actions.setSubServiceDetailItems([{
                                                        title: "语言润色",
                                                        contents: [
                                                            "适用于已有初稿并且希望着重提升语言表达的用户",
                                                            "适用于除简历外所有留学文书",
                                                            "一对一匹配顶级名校外籍老师",
                                                            "1 稿 / 3 天",
                                                            "每一稿完成 3 天内不限留言数",
                                                            "文章压缩范围：±10%",
                                                            "服务有效期：7 天"
                                                        ],
                                                        bottom: {
                                                            price: 160,
                                                            tip: "（超过部分¥0.53/单词）"
                                                        }
                                                    }, {
                                                        title: "深度修改",
                                                        contents: [
                                                            "适用于已有初稿并且希望着重提升语言表达,结构逻辑，素材使用的用户",
                                                            "适用于除简历、case study、writing sample等学术类文书外所有留学文书",
                                                            "一对一匹配顶级名校外籍老师",
                                                            "1 稿 / 3 天",
                                                            "每一稿完成 3 天内不限留言数",
                                                            "文章压缩范围：±10%",
                                                            "服务有效期：7 天"
                                                        ],
                                                        bottom: {
                                                            price: 284,
                                                            tip: "（超过部分¥0.95/单词）"
                                                        }
                                                    }, {
                                                        title: "VIP文书辅导",
                                                        contents: [
                                                            "适用于已有初稿并且希望着重提升语言表达的用户",
                                                            "适用于除简历外所有留学文书",
                                                            "一对一匹配顶级名校外籍老师",
                                                            "1 稿 / 3 天",
                                                            "每一稿完成 3 天内不限留言数",
                                                            "文章压缩范围：±10%",
                                                            "服务有效期：7 天"
                                                        ],
                                                        bottom: {
                                                            price: 160,
                                                            tip: "（超过部分¥0.53/单词）"
                                                        }
                                                    }])
                                                    actions.setSubServiceDetailSubs([{
                                                    title: "套餐外可额外加购服务",
                                                    contents: [{
                                                        title: '指定顾问',
                                                        contents: [{
                                                            title: '指定特定顾问：',
                                                            contents: [
                                                                "将由该顾问完成您的文书修改",
                                                                '价格以顾问自己定价为准'
                                                            ]
                                                        }, {
                                                            title: '指定顾问等级：',
                                                            contents: [
                                                                '顾问等级为平台依据专家组评分，用户评价，服务响应时间等标准综合评比确定',
                                                                {
                                                                    title: '指定不同等级顾问价格如下：',
                                                                    contents: [
                                                                        '指定 level2 顾问＋总价 10%',
                                                                        '指定 level3 顾问＋总价 30%',
                                                                        '指定 level4 顾问＋总价 50%',
                                                                        '指定 level5 顾问＋总价 100%'
                                                                    ]
                                                                }
                                                            ]
                                                        }, {
                                                            title: '不指定顾问：',
                                                            contents: [
                                                                '不指定特定顾问和顾问等级，文书将由本申请领域各等级顾问自由接单。'
                                                            ]
                                                        }]
                                                    }, {
                                                        title: '翻译',
                                                        contents: [{
                                                            contents: [
                                                                '72 小时, 180.84 元 / 千汉字（正常）',
                                                                '48 小时, 271.26 元 / 千汉字（加急）'
                                                            ]
                                                        }]
                                                    }]
                                                }])
                                                } else {
                                                    actions.setSubServiceDetailItems([
                                                        {
                                                            title: "美国",
                                                            contents: [
                                                                '8个项目',
                                                                '额外赠送：\n1小时OPT/H1B指导\n1小时任意留学行家咨询'
                                                            ],
                                                            bottom: {
                                                                price: "41000",
                                                                addon: false,
                                                                infoBtn: true,
                                                                btnText: "免费测评",
                                                                subBtnText: "查看详情",
                                                            }
                                                        },
                                                        {
                                                            title: "美国",
                                                            contents: [
                                                                '8个项目',
                                                                '额外赠送：\n1小时OPT/H1B指导\n1小时任意留学行家咨询'
                                                            ],
                                                            bottom: {
                                                                price: "41000",
                                                                addon: false,
                                                                infoBtn: true,
                                                                btnText: "免费测评",
                                                                subBtnText: "查看详情"
                                                            }
                                                        },
                                                        {
                                                            title: "美国",
                                                            contents: [
                                                                '8个项目',
                                                                '额外赠送：\n1小时OPT/H1B指导\n1小时任意留学行家咨询'
                                                            ],
                                                            bottom: {
                                                                price: "41000",
                                                                addon: false,
                                                                infoBtn: true,
                                                                btnText: "免费测评",
                                                                subBtnText: "查看详情"
                                                            }
                                                        },
                                                        {
                                                            title: "美国",
                                                            contents: [
                                                                '8个项目',
                                                                '额外赠送：\n1小时OPT/H1B指导\n1小时任意留学行家咨询'
                                                            ],
                                                            bottom: {
                                                                price: "41000",
                                                                addon: false,
                                                                infoBtn: true,
                                                                btnText: "免费测评",
                                                                subBtnText: "查看详情"
                                                            }
                                                        }
                                                    ])
                                                    actions.setSubServiceDetailSubs([]);
                                                }
                                            };
                                            return this._renderService(item, i);
                                        })}
                                    </View>
                                </CollapsibleIntro>
                                {sep()}
                                <CollapsibleIntro
                                    titleCenter
                                    hasMore
                                    onMore={() => {
                                    }}
                                    titleStyle={{paddingTop: 10}}
                                    title={"导师资料"} style={{paddingBottom: 0}}>
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务特色"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务承诺"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务流程"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="Offer榜"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                </CollapsibleIntro>
                            </View>
                        </View>
                        <View tabLabel="用户评价">

                        </View>
                    </ScrollTab>
                </ScrollView>
                <BottomBtns
                    lefts={[{text: "收藏"}, {text: "客服"}]} mainText={"去付款"}
                    onMainPress={() => {
                        const mapService = ({price, name, ...r}, i) => ({
                            ...r, price, rightText: '¥'+price,
                            leftText: name,// type: "topic"
                        });
                        actions.setAbroadExpertFormItems(services.map(mapService));
                        actions.setAbroadExpertFormThumbnail(null);
                        actions.setAbroadExpertFormName(null);
                        actions.abroadExpertBuyFormModalOpen();
                    }}
                />
            </View>
        )
    }

    _renderService(data, i) {
        const icon = <Entypo name="chevron-thin-right" size={15} color="#a1a1a1"/>;
        return (
            <CollapsibleService
                append="起"
                collapsible={false} key={i} {...data} downIcon={icon} upIcon={icon}
            />
        )
    }
}

export default ServiceDetailPage;
