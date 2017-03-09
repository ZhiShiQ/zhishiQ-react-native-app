import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import sty from './style';
import {splitText} from '../../helpers';
import {upIcon, downIcon, starIcon} from '../../helpers/resource';

import TeacherBasicInfo from '../../components/TeacherBasicInfo';
import ScrollTab from '../../components/ScrollTab';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import CollapsibleItem from '../../components/CollapsibleItem';
import HrFlexLayout from '../../components/HrFlexLayout';
import LinkItem from '../../components/LinkItem';
import Educations from '../../components/Educations';
import BottomBtns from '../../components/BottomBtns';
import Comments from '../../components/Comments';
import CommentStar from '../../components/CommentStar';
import Hr from '../../components/Hr';

@autobind
class ForeignTeacherDetailPage extends Component {
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
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {}
    state = {
        starCollapsed: true,
    };
    static propTypes = {}

    render() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, base: {avatar, name, brief, tags, clients, rate, reviews}, detail, service, comment
                }
            }, actions
        } = this.props;

        return (
            <View>
                <ScrollView contentContainerStyle={[sty.main, {paddingBottom: 45}]}>
                    <TeacherBasicInfo
                        style={{alignItems: 'center'}}
                        tags={tags}
                        name={name}
                        content={brief}
                        listKeys={["Clients", "Rate", "Reviews"]}
                        listValues={[clients, rate, reviews]}
                    />
                    {this.sep()}
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40}}
                        initialPage={0}
                    >
                        <View tabLabel="导师详情">
                            {this.sep()}
                            {this.intro}
                        </View>
                        <View tabLabel={"用户评价"}>
                            {this.sep()}
                            {this.comments}
                        </View>
                    </ScrollTab>
                </ScrollView>
                {this.fixBottom}
            </View>
        )
    }


    get packageService() {
        const items = [{
            name: '单项留学文书服务',
            rSubText: '最低',
            price: 319,
            detail: {
                head: ['服务等级', '300单词以下', '超出300单词'],
                body: [
                    ['语言润色', '￥192', '￥0.638 / 单词'],
                    ['语言润色', '￥192', '￥0.638 / 单词'],
                    ['语言润色', '￥192', '￥0.638 / 单词']
                ]
            }
        }, {
            name: '单项留学文书服务',
            price: 319
        }, {
            name: '单项留学文书服务',
            price: 319
        }, {
            name: '单项留学文书服务',
            price: 319
        }];

        return (
            <CollapsibleIntro title={"套餐类型"}>
                <View style={{marginHorizontal: -15}}>
                    {items.map((item, i) => this._renderService(item, i))}
                </View>
            </CollapsibleIntro>
        )
    }

    _renderService({name, rSubText, price, detail}, i) {
        return (
            <CollapsibleItem
                key={i}
                style={{
                    backgroundColor: '#fff', borderTopWidth: .5, borderColor: '#e5e5e5'
                }}
                control={
                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center', padding: 15, paddingRight: 0,
                        }}
                    >
                        <Text style={{fontSize: 15, color: '#4a4a4a'}}>{name}</Text>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Text style={{color: '#a1a1a1', fontSize: 12}}>{rSubText}</Text>
                            <Text style={{marginLeft: 4, color: '#ea5502', fontSize: 15}}>¥{price}</Text>
                        </View>
                    </View>
                }
            >
                <View style={{
                    backgroundColor: '#fbfbfb',
                    paddingHorizontal: 15,
                    borderTopWidth: .5,
                    borderColor: '#e5e5e5'
                }}>
                    {detail &&
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: .5,
                            borderBottomColor: '#e5e5e5'
                        }}>
                            {detail.head.map((x, i, a) =>
                                <View key={i} style={{flex: 1, paddingVertical: 12,}}>
                                    <Text style={[{
                                        color: '#848484',
                                        fontSize: 13.5
                                    }, i == a.length - 1 ? {textAlign: 'right'} : {}]}>{x}</Text>
                                </View>
                            )}
                        </View>
                        {detail.body.map((row, i, a) =>
                            <View key={i} style={[{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }, i != a.length - 1 ? {borderBottomWidth: .5, borderBottomColor: '#e5e5e5'} : {}]}>
                                {row.map((x, i, a) =>
                                    <View key={i} style={[{flex: 1, paddingVertical: 12}]}>
                                        <Text style={[{
                                            fontSize: 13.5,
                                            color: i == 0 ? '#4a4a4a' : '#ea5502'
                                        }, i == a.length - 1 ? {textAlign: 'right'} : {}]}>{x}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                }}
                                style={{
                                    paddingVertical: 10, paddingHorizontal: 20,
                                    borderRadius: 4, marginBottom: 10,
                                    backgroundColor: '#ea5502', alignSelf: 'center'
                                }}
                            >
                                <Text style={{color: '#fff', fontSize: 13}}>立即预约</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
            </CollapsibleItem>
        )
    }

    get intro() {
        const {
            store: {
                foreign_teacher_detail: {
                    detail: {intro, selfIntro, educations, experiences}
                }
            }, actions
        } = this.props;
        const selfIntroObj = splitText(selfIntro);
        return (
            <View>
                {this.packageService}
                {this.sep()}
                <CollapsibleIntro title={"个人简介"}
                                  showTexts={intro}/>
                {this.sep()}
                <CollapsibleIntro
                    title={"自我介绍"}
                    showTexts={selfIntroObj.showText}
                    hideTexts={selfIntroObj.hideText}
                />
                {this.sep()}
                <CollapsibleIntro title={"教育背景"}>
                    <Educations
                        noScroll
                        style={{alignItems: 'stretch'}}
                        items={educations}
                    />
                </CollapsibleIntro>
                {this.sep()}
                {this.teacherExperience}
                {this.sep()}
                <LinkItem leftComponent={CollapsibleIntro.getHead("获奖 & 荣誉", true)}/>
                {this.sep()}
                <LinkItem leftComponent={CollapsibleIntro.getHead("发表的文章", true)}/>
                {this.sep()}
                <LinkItem leftComponent={CollapsibleIntro.getHead("各项能力", true)}/>
                {this.sep(true)}
                {this.sep(true)}
                {this.sep(true)}
                {this.sep(true)}
            </View>
        )
    }

    get teacherExperience() {
        const items = [{
            title: "Global Health Economics and Outcomes Research Consultant",
            origination: 'Amgen, Inc.',
            date_from: '2007-08',
            date_to: '2015-05',
            words: [
                'Designed and managed health economic research studies (e.g., budget impact, cost per response, cost-effectiveness, disease burden, secondary claims, patient-reported outcomes and instrument development, treatment patterns, etc.)',
                'Presented findings at scientific and professional meetings (9 published/presen',
                'Prepared, reviewed, and/or edited study protocols, manuscripts, and abstracts for department or Internal Peer Review Group'
            ]
        }, {
            title: "Global Health Economics and Outcomes Research Consultant",
            origination: 'Amgen, Inc.',
            date_from: '2007-08',
            date_to: '2015-05',
            words: [
                'Designed and managed health economic research studies (e.g., budget impact, cost per response, cost-effectiveness, disease burden, secondary claims, patient-reported outcomes and instrument development, treatment patterns, etc.)',
                'Presented findings at scientific and professional meetings (9 published/presen',
                'Prepared, reviewed, and/or edited study protocols, manuscripts, and abstracts for department or Internal Peer Review Group'
            ]
        }]

        return (
            <CollapsibleIntro
                title={"导师经历"}
                hideComponent={
                    <ListView
                        renderHeader={()=>this._renderExperienceSep(1, [])}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(items)
                        }
                        renderRow={(data, s, i) => this._renderExperience(data, i, items)}
                        renderSeparator={(a, i) => this._renderExperienceSep(i, items)}
                        renderScrollComponent={(p)=><View {...p}/>}
                    />
                }
            >
                {this._renderExperience(items[0], 0)}
            </CollapsibleIntro>
        )
    }

    _renderExperienceSep(i, a) {
        if (i!=a.length-1)
            return (
                <View style={{backgroundColor: '#e5e5e5', height: .5, alignSelf: 'stretch'}}></View>
            )
    }

    _renderExperience({title, origination, date_from, date_to, words = []}, i, a) {
        return (
            <View key={i} style={{paddingVertical: 15, justifyContent: 'flex-start'}}>
                <Image style={{width: 40, height: 40, borderRadius: 5, backgroundColor: '#ccc'}}/>
                <Text style={{
                    marginVertical: 3,
                    fontSize: 14,
                    lineHeight: 18,
                    fontWeight: 'bold',
                    color: '#4a4a4a'
                }}>{title}</Text>
                <Text style={{color: '#4a4a4a', marginBottom: 8}}>{origination}｜{date_from} ~ {date_to}</Text>
                {words.map((w, i, a) =>
                    <Text style={{color: '#848484', lineHeight: 17, fontSize: 14}} key={i}>• {w}</Text>
                )}
            </View>

        )
    }

    get comments() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, detail, service,
                    comment: {total, average, levels, comments}
                }
            }, actions
        } = this.props;
        const {starCollapsed} = this.state;
        const s = {
            item: {
                paddingVertical: 15,
                alignItems: 'center'
            },
            tip: {
                marginTop: 5,
                fontSize: 12,
                color: '#848484'
            },
            text: {
                fontSize: 15,
                color: '#4a4a4a'
            }
        }
        return (
            <View>
                {/*<HrFlexLayout style={{backgroundColor: '#fff', justifyContent: 'space-around'}}>*/}
                {/*<View style={s.item}>*/}
                {/*<View><Text style={s.text}>{4.9}</Text></View>*/}
                {/*<View><Text style={s.tip}>均分</Text></View>*/}
                {/*</View>*/}
                {/*<View style={s.item}>*/}
                {/*<View><Text style={s.text}>{levels[0]}</Text></View>*/}
                {/*<View><Text style={s.tip}>5星</Text></View>*/}
                {/*</View>*/}
                {/*<View style={s.item}>*/}
                {/*<View><Text style={s.text}>{levels[1]}</Text></View>*/}
                {/*<View><Text style={s.tip}>4星</Text></View>*/}
                {/*</View>*/}
                {/*<View style={s.item}>*/}
                {/*<View><Text style={s.text}>{levels[2]}</Text></View>*/}
                {/*<View><Text style={s.tip}>3星</Text></View>*/}
                {/*</View>*/}
                {/*<View style={s.item}>*/}
                {/*<View><Text style={s.text}>{levels[3]}</Text></View>*/}
                {/*<View><Text style={s.tip}>1-2星</Text></View>*/}
                {/*</View>*/}
                {/*</HrFlexLayout>*/}
                <CommentStar
                    collapsed={true}
                    levels={[100, 7.8, 0.5, .4, 0]}
                    speed={5}
                    quality={3.5}
                    pro={4}
                    manner={1}
                    commentNum={259}
                    rate={4}
                />
                {this.sep()}
                <Comments
                    noScroll
                    items={comments}
                />
            </View>
        )
    }

    get fixBottom() {
        const {actions} = this.props;
        return (
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
                onSubPress={() => actions.abroadExpertCartFormModalOpen()}
                mainText={"立即预约"}
                onMainPress={() => actions.abroadExpertBuyFormModalOpen()}
            />
        )
    }

    sep(noBorder) {
        return <View style={[{
            height: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e5e5e5'
        }, noBorder ? {borderColor: 'transparent'} : {}]}></View>
    }
}

export default ForeignTeacherDetailPage;
