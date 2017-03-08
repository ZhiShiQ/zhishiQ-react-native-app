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
import Collapsible from 'react-native-collapsible';
import sty from './style';
import {splitText} from '../../helpers';

import TeacherBasicInfo from '../../components/TeacherBasicInfo';
import ScrollTab from '../../components/ScrollTab';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import HrFlexLayout from '../../components/HrFlexLayout';
import LinkItem from '../../components/LinkItem';
import Educations from '../../components/Educations';
import BottomBtns from '../../components/BottomBtns';
import Comments from '../../components/Comments';

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
                    {this.sep}
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40}}
                        page={0}
                    >
                        <View tabLabel="导师详情">
                            {this.sep}
                            {this.intro}
                        </View>
                        <View tabLabel={"用户评价(" + comment.total + ")"}>
                            {this.sep}
                            {this.comments}
                        </View>
                    </ScrollTab>
                </ScrollView>
                {this.fixBottom}
            </View>
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
                <CollapsibleIntro title={"个人简介"}
                                  showTexts={intro}/>
                {this.sep}
                <CollapsibleIntro
                    title={"自我介绍"}
                    showTexts={selfIntroObj.showText}
                    hideTexts={selfIntroObj.hideText}
                />
                {this.sep}
                <CollapsibleIntro title={"教育背景"}>
                    <Educations
                        noScroll
                        style={{alignItems: 'stretch'}}
                        items={educations}
                    />
                </CollapsibleIntro>
                {this.sep}
                <CollapsibleIntro title={"导师经历"}/>
                {this.sep}
                <LinkItem leftComponent={CollapsibleIntro.getHead("获奖 & 荣誉", true)}/>
                {this.sep}
                <LinkItem leftComponent={CollapsibleIntro.getHead("发表的文章", true)}/>
                {this.sep}
                <LinkItem leftComponent={CollapsibleIntro.getHead("各项能力", true)}/>
                {this.sep}
                {this.sep}
                {this.sep}
                {this.sep}
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
                <HrFlexLayout style={{backgroundColor: '#fff', justifyContent: 'space-around'}}>
                    <View style={s.item}>
                        <View><Text style={s.text}>{4.9}</Text></View>
                        <View><Text style={s.tip}>均分</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>{levels[0]}</Text></View>
                        <View><Text style={s.tip}>5星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>{levels[1]}</Text></View>
                        <View><Text style={s.tip}>4星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>{levels[2]}</Text></View>
                        <View><Text style={s.tip}>3星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>{levels[3]}</Text></View>
                        <View><Text style={s.tip}>1-2星</Text></View>
                    </View>
                </HrFlexLayout>
                {this.sep}
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
                onSubPress={() => alert()}
                mainText={"立即预约"}
                onMainPress={() => actions.abroadExpertFormModalOpen()}
            />
        )
    }

    get sep() {
        return <View style={{
            height: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e5e5e5'
        }}></View>
    }
}

export default ForeignTeacherDetailPage;
