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
import * as URLS from '../../helpers/remote-urls';
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
import Comments from '../../components/Comments';
import CommentStar from '../../components/CommentStar';
import Loading from '../../components/Loading';

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

    mapUrl = {
        onestep_detail: {
            view: URLS.oneStepViewURL,
            comment: URLS.oneStepCommentURL,
        },
        service_text_detail: {
            view: URLS.serviceTextViewURL,
            comment: URLS.serviceTextCommentURL
        },
        service_text_package_detail: {
            view: URLS.serviceTextPackViewURL,
            comment: URLS.serviceTextPackCommentURL,
        },
        service_text_resume_detail: {
            view: URLS.serviceResumeViewURL,
            comment: URLS.serviceResumeCommentURL,
        }
    };

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const source = this.source;
        const {
            actions,
            store: {
                [source]: {
                    isFirst
                }
            }
        } = this.props;
        const {[source]: innerAction} = actions;
        const url = this.mapUrl[source] && this.mapUrl[source].view;
        if (url && isFirst) {
            setTimeout(async function () {
                innerAction.setServiceDetailFetching(true);
                innerAction.setServiceDetailFirst(false);
                const response = await fetch(url, {
                    headers: {
                        // ...HELPER.getTokenJsonSync()
                    }
                });
                const o = await response.json();
                if (!o.success) {
                    alert(o.message);
                } else {
                    innerAction.setServiceDetailBase({
                        reviews: o.data.review_count,
                        rate: o.data.rank,
                        clients: o.data.user_count,
                        cover: {uri: o.data.cover_image}
                    });
                    innerAction.setServiceDetailInnerServices(
                        o.data.service_plan.map(({detail, ...x}) => (
                            {...x, argv: detail}
                        ))
                    );
                    innerAction.setServiceDetailInnerTeacherInfo({cover: {uri: o.data.advisor_image}});
                    innerAction.setServiceDetailInnerCharacter({cover: {uri: o.data.feature_image}});
                    innerAction.setServiceDetailInnerPromise({cover: {uri: o.data.promise_image}});
                    innerAction.setServiceDetailInnerProcess({cover: {uri: o.data.process_image}});
                    innerAction.setServiceDetailInnerOfferRank({cover: {uri: o.data.offers_image}});
                }
                innerAction.setServiceDetailFetching(false);
            }, 0);
        } else {
            innerAction.setServiceDetailFetching(false);
        }
    }

    async fun() {
        const response = await fetch(mapObj[source], {headers: {}});
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

    /**
     * enum(service_detail(default), onestep_detail, service_text, service_text_package)
     * @returns {string}
     */
    get source() {
        const {params = {}} = this.props;
        const {source = "service_detail"} = params;
        return source;
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 60;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    get type() {
        return this._getType(this.source);
    }

    _getType(key = this.source) {
        return {
            'onestep_detail': 'oneStepApply',
            'onestep': 'oneStepApply',
            'service_text_detail': 'singlePaper',
            'service_text': 'singlePaper',
            'service_text_package_detail': 'completePaper',
            'service_text_package': 'completePaper',
            'text_package': 'completePaper',
            'service_text_resume_detail': 'resume',
            'service_text_resume': 'resume',
            'resume': 'resume'
        }[key];
    }

    get commentList() {
        const source = this.source;
        const {
            store: {
                [source]: {
                    isFetching, isCommentFirst, isCommentFetching,
                    comment: {hasMore, average, levels, comments, currentPage},
                    base: {id}
                }
            }, actions
        } = this.props;
        return (
            <Comments
                noScroll
                ref="myList"
                items={comments}
                onEndReachedThreshold={100}
                onEndReached={(evt) => {
                    // !isCommentFetching && actions.fetchForeignTeacherCommentDetail(id, +currentPage+1)
                }}
                renderFooter={() => {
                    if (isCommentFetching) {
                        return hasMore ? <Loading /> :
                            <View style={{marginVertical: 20, alignItems: 'center'}}><Text>没有更多了</Text></View>
                    }
                }}
            />
        )
    }

    render() {
        const source = this.source;
        const {
            actions, store: {
            [source]: {
                isFetching, isCommentFetching, isCommentFirst, base,
                detail: {
                    services, teacherInfo, serviceTitle = "套餐类型",
                    character, promise, process, offerRank
                },
                comment: {
                    currentPage
                }
            }
        }
        } = this.props;
        // 针对不同服务的各自的action（统一命名/统一交互）
        const {[source]: innerAction} = actions;
        if (isFetching) {
            return <Loading/>;
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    style={sty.main}
                    scrollEventThrottle={100}
                    onScroll={({nativeEvent}) => {
                        if (this._activeTab == 1 && this.isCloseToBottom(nativeEvent)) {
                            if (!isCommentFetching) {
                                innerAction.fetchServiceCommentDetail({
                                    page: +currentPage + 1,
                                    url: this.mapUrl[source].comment,
                                    source
                                });
                            }
                        } else if (this._activeTab == 1) {
                        }
                    }}
                >
                    <TeacherBasicInfo
                        style={{paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 15}}
                        listValues={[base.clients, base.rate, base.reviews]}
                        listKeys={["用户数", "评分", "评价数"]}
                    >
                        <View style={{flex: 0, height: 210, alignSelf: 'stretch'}}>
                            <Image source={base.cover} style={{flex: 1, backgroundColor: '#eee'}}
                                   resizeMode={"cover"}/>
                        </View>
                    </TeacherBasicInfo>
                    <ScrollTab
                        style={{}}
                        onChangeTab={({i}) => {
                            this._activeTab = +i;
                            if (i == 1 && isCommentFirst) {
                                innerAction.setServiceDetailCommentFetching(true);
                                setTimeout(() => {
                                    innerAction.setServiceDetailCommentFetching(false);
                                    innerAction.fetchServiceCommentDetail({url: this.mapUrl[source].comment, source});
                                }, 0);
                            }
                        }}
                        tabContainerStyle={{flex: 1, alignItems: 'center',}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40,}}
                        initialPage={0}
                    >
                        <View tabLabel="服务详情">
                            <View style={{flex: 1}}>
                                {sep()}
                                <CollapsibleIntro title={serviceTitle} style={{paddingBottom: 0}}>
                                    <View style={{marginHorizontal: -15}}>
                                        {services.map((item, i) => {
                                            item.onPress = () => {
                                                // alert(item.id+":"+this._getType(item.id));
                                                actions.setSubServiceDetailType(this._getType(item.id));
                                                if (source != 'onestep_detail') {
                                                    Actions.subServiceDetail({
                                                        params: {
                                                            title: item.name,
                                                        }
                                                    });
                                                    actions.setSubServiceDetailSubs([{
                                                        title: "套餐外可额外加购服务",
                                                        contents: item.argv.extra
                                                    }]);
                                                    actions.setSubServiceDetailItems(
                                                        item.argv.list.map(({per_word, price, ...rest}) => ({
                                                            ...rest, bottom: {
                                                                price,
                                                                tip: `（超过部分¥${per_word}/单词）`
                                                            }
                                                        }))
                                                    );
                                                    actions.setSubServiceDetailBase({
                                                        image: {uri: item.argv.image},
                                                        description: item.argv.basic
                                                    })
                                                    /*[{
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
                                                     }]*/
                                                } else {
                                                    Actions.subServiceDetail({
                                                        params: {
                                                            data: {degree: item.degree.id},
                                                            title: item.name,
                                                        }
                                                    });
                                                    actions.setSubServiceDetailItems(
                                                        item.argv.map(({price, content, ...rest}) => ({
                                                            ...rest,
                                                            contents: content,
                                                            bottom: {
                                                                price: price.zh,
                                                                addon: false,
                                                                infoBtn: true,
                                                                btnText: "免费测评",
                                                                subBtnText: "查看详情",
                                                            }
                                                        }))
                                                    )
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
                                    <Image style={{backgroundColor: '#eee', height: 280}} source={teacherInfo.cover}/>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务特色"
                                >
                                    <Image style={{backgroundColor: '#eee', height: 280}} source={character.cover}/>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务承诺"
                                >
                                    <Image style={{backgroundColor: '#eee', height: 280}} source={promise.cover}/>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务流程"
                                >
                                    <Image style={{backgroundColor: '#eee', height: 280}} source={process.cover}/>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="Offer榜"
                                >
                                    <Image style={{backgroundColor: '#eee', height: 280}} source={offerRank.cover}/>
                                </CollapsibleIntro>
                            </View>
                        </View>
                        <View tabLabel="用户评价">
                            <View style={{flex: 1}}>
                                {isCommentFetching && isCommentFirst ? <Loading style={{flex: 1}}/> :
                                    <View>
                                        {sep()}
                                        {this.commentList}
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollTab>
                </ScrollView>
                <BottomBtns
                    lefts={[{
                        text: "收藏",
                        iconName: 'collection',
                        onPress: null
                    }, {
                        text: "客服",
                        iconName: 'customer_service',
                        onPress: null
                    }]}
                    subText="加入购物车"
                    mainText={"去付款"}
                    onMainPress={() => {
                        const mapService = ({price, name, ...r}, i) => ({
                            ...r, price, rightText: '¥' + price,
                            leftText: name, type: this._getType(r.id)
                        });
                        actions.setAbroadExpertFormItems(services.map(mapService));
                        actions.setAbroadExpertFormThumbnail(null);
                        actions.setAbroadExpertFormName(null);
                        actions.abroadExpertBuyFormModalOpen();
                    }}
                    onSubPress={() => {
                        const mapService = ({price, name, ...r}, i) => ({
                            ...r, price, rightText: '¥' + price,
                            leftText: name, type: this._getType(r.id)
                        });
                        actions.setAbroadExpertFormItems(services.map(mapService));
                        actions.setAbroadExpertFormThumbnail(null);
                        actions.setAbroadExpertFormName(null);
                        actions.abroadExpertCartFormModalOpen();
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
