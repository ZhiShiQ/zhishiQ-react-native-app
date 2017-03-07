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
        const {...props} = this.props

        return (
            <View>
                <ScrollView contentContainerStyle={[sty.main, {paddingBottom: 45}]}>
                    <TeacherBasicInfo
                        style={{alignItems: 'center'}}
                        tags={["文书导师", "全套文书导师", "一站式申请"]}
                        name={"TITLE"}
                        content={"Public Health and Health Economics Researcher"}
                        listKeys={["Clients", "Rate", "Reviews"]}
                        listValues={[994, 4.9, 141]}
                    />
                    {this.sep}
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 14}}
                        tabBarStyle={{height: 40}}
                        page={2}
                    >
                        <View tabLabel="详情">
                            <CollapsibleIntro title={"简介"}
                                              showTexts={["I am a public health, pharmaceutical, health economics, and outcomes researcher based in Los Angeles, California with many years of experience mentoring students applying to undergraduate and graduate programs (incluing reviewing and editing numerous applications and personal essays). Additionally, I have many years of experience in writing and editing of scientific journal articles and health policy briefs. My goals are to help you present yourself in the best light possible and to help you succeed in your academic and career aspirations."]}/>
                            {this.sep}
                            <CollapsibleIntro title={"自我介绍"} showTexts={[
                                `Greetings!

I am a public health, pharmaceutical, health economics, and outcomes researcher based in Los Angeles, California. I fairly recently graduated with a PhD from the University of California, Los Angeles (UCLA) Fielding School of Public Health, so I have recent personal history in the hard work that goes into crafting a competitive personal statement, resume/CV, or application essay. I have many years of experience in mentoring students applying to undergraduate and graduate programs in the United States. This experience includes reviewing and editing applications and personal essays for undergraduate and graduate programs. My goal is to make sure that your passion and achievements really shine in your essay or resume/CV and that your application is attractive and competitive to the application committee.`]}
                                              hideTexts={[`During the course of working for a pharmaceutical company for almost eight years and in the health industry for roughly 15 years, I also gained skills in research and scientific writing of journal articles (3 accepted/published and 5 submitted), abstracts (9 published/presented), and health policy briefs (2 published).  I was part of the Internal Peer Review Group at the pharmaceutical company I worked for, which provided me with ample experience in editing manuscripts with the aim for acceptance at a scientific or professional journal.

I look forward to getting to know you and helping you to succeed in your academic and career aspirations.`]}
                            />
                            {this.sep}
                            <CollapsibleIntro title={"教育"}>
                                <Educations
                                    noScroll
                                    style={{alignItems: 'stretch'}}
                                    items={[{
                                        title: "ESSEC Business School",
                                        status: "Master Finance",
                                        date_from: "2016-09",
                                        date_to: "2017-07",
                                        thumbnail: {}
                                    }, {
                                        title: "ESSEC Business School",
                                        status: "Master Finance",
                                        date_from: "2016-09",
                                        date_to: "2017-07",
                                        thumbnail: {}
                                    }]}
                                />
                            </CollapsibleIntro>
                            {this.sep}
                            <CollapsibleIntro title={"经历"}/>
                            {this.sep}
                            <LinkItem leftText={"获奖 & 荣誉"}/>
                            {this.sep}
                            <LinkItem leftText={"发表的文章"}/>
                            {this.sep}
                            <LinkItem leftText={"各项能力"}/>
                            {this.sep}
                            {this.sep}
                            {this.sep}
                            {this.sep}
                        </View>
                        <View tabLabel="服务">

                        </View>
                        <View tabLabel="评价">
                            {this.comments}
                        </View>
                    </ScrollTab>
                </ScrollView>
                {this.fixBottom}
            </View>
        )
    }

    get comments() {

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
                        <View><Text style={s.text}>4.9</Text></View>
                        <View><Text style={s.tip}>均分</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>34%</Text></View>
                        <View><Text style={s.tip}>5星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>4.9%</Text></View>
                        <View><Text style={s.tip}>4星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>4.9%</Text></View>
                        <View><Text style={s.tip}>3星</Text></View>
                    </View>
                    <View style={s.item}>
                        <View><Text style={s.text}>4.9%</Text></View>
                        <View><Text style={s.tip}>1-2星</Text></View>
                    </View>
                </HrFlexLayout>
                {this.sep}
                <Comments
                    noScroll
                    items={[{
                        title: '刘泽方 Zephyr Lewis',
                        tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
                        comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
                        time: "2015/11/13 23:21",
                        thumbnail: {}
                    }, {
                        title: '刘泽方 Zephyr Lewis',
                        tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
                        comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
                        time: "2015/11/13 23:21"
                    }, {
                        title: '刘泽方 Zephyr Lewis',
                        tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
                        comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
                        time: "2015/11/13 23:21"
                    }]}
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
                    onPress: null
                }, {
                    text: "客服",
                    onPress: null
                }]}
                mainText={"立即预约"}
                onMainPress={() => actions.abroadExpertFormModalOpen()}
            />
        )
    }

    get sep() {
        return <View style={{height: 10}}/>
    }
}

export default ForeignTeacherDetailPage;
