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
    Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import sty from './style';
import {splitText} from '../../helpers';

import TeacherBasicInfo from '../../components/TeacherBasicInfo';
import Educations from '../../components/Educations';
import SubMenu from '../../components/SubMenu';
import ScrollTab from '../../components/ScrollTab';
import BottomBtns from '../../components/BottomBtns';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import CollapsibleService from '../../components/CollapsibleService';
import Comments from '../../components/Comments';
import CommentStar from '../../components/CommentStar';
import Hr from '../../components/Hr';
import Experience from '../../components/Experience';


EXPEND_HEIGHT = 250;

@autobind
class AbroadExpertDetailPage extends Component {
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
        const animate = (height) => {
            if (newState.expended)
                this.refs.expend.transitionTo({height: height})
            else
                this.refs.expend.transitionTo({height: 10})
        }

        /* if (newState.expended !== this.state.expended) {
         if (this.refs.expend.measure) {
         this.refs.expend.measure((ox, oy, width, height, px, py) => {
         animate(height);
         })
         } else {
         animate(EXPEND_HEIGHT);
         }
         } */
    }

    componentDidUpdate(oldProps, oldState, oldContext) {

    }

    componentWillUnmount() {
    }

    static defaultProps = {}
    state = {
        expended: false
    }
    static propTypes = {}

    render() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail} = abroad_expert_detail;
        const introObj = splitText(detail.intro);
        return (
            <View>
                <ScrollView contentContainerStyle={[sty.main, {paddingBottom: 45}]}>
                    <TeacherBasicInfo
                        contentCollapsible={true}
                        thumbnail={base.avatar}
                        tags={base.tags}
                        name={base.name}
                        content={base.content}
                        appointNum={base.appointNum}
                        average={base.average}
                        commentNum={base.commentNum}
                    />
                    <Hr marginBottom={0} color={'#e5e5e5'}/>
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 14}}
                        tabBarStyle={{height: 40}}
                    >
                        <View tabLabel="导师详情">
                            {this.sep()}
                            {this.topic}
                            {this.sep()}
                            <CollapsibleIntro
                                title={"自我介绍"}
                                showTexts={introObj.showText}
                                hideTexts={introObj.hideText}

                            />
                            {this.sep()}
                            {this.educ}
                            {this.sep()}
                            {this.experience}
                            {this.sep()}
                            {this.honor}
                            {this.sep(true)}
                            {this.sep(true)}
                            {this.sep(true)}
                            {this.sep(true)}
                        </View>
                        <View tabLabel="用户评价">
                            {this.sep()}
                            {this.comments}
                        </View>
                    </ScrollTab>


                </ScrollView>
                {this.fixBottom}
            </View>
        )
    }

    get honor() {
        return (
            <CollapsibleIntro title={"获奖 & 荣誉"}>
                <Experience style={{paddingTop: 0}}
                    thumbnail={null} title={'MCM Award M'}
                    noPoint
                    origination={'MCM'} words={['April 2012']}/>
            </CollapsibleIntro>
        )
    }

    get topic() {
        const items = [{
            name: '英国G5名校申请指导',
            price: 319,
        }, {
            name: '单项留学文书服务',
            price: 319,
            detail: {
                tags: ['其他'],
                contents: [
                    '课程简述: Data Science, Business Analysis, Information Systems 留学申请，包括转专业申请',
                    '适用用户: Data Science, Business Analysis, Information Systems 留学申请，包括转专业申请者',
                    'Data Science, Business Analysis, Information Systems 留学申请，包括转专业申请者',
                ]
            }
        }];

        return (
            <CollapsibleIntro title={"套餐类型"} style={{paddingBottom: 0}}>
                <View style={{marginHorizontal: -15}}>
                    {items.map((item, i) => this._renderService(item, i))}
                </View>
            </CollapsibleIntro>
        )
    }

    _renderService(item, i) {
        return (
            <CollapsibleService {...item} key={i} />
        )
    }

    get comments() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {comment: {comments}} = abroad_expert_detail;

        return (
            <View>
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
                {this.sep(true, {height: 1})}
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

    get experience() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail: {experiences}} = abroad_expert_detail;

        const items = [{
            title: "Global Health Economics and Outcomes Research Consultant",
            origination: 'Amgen, Inc.',
            date_from: '2007-08',
            thumbnail: {},
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
                title={"行家经历"}
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
                {this._renderExperience({...items[0], style: {paddingTop: 0}}, 0)}
            </CollapsibleIntro>
        )
    }

    _renderExperienceSep(i, a) {
        if (i!=a.length-1)
            return (
                <View style={{backgroundColor: '#e5e5e5', height: .5, alignSelf: 'stretch'}}></View>
            )
    }

    _renderExperience(data, i, a) {
        return (
            <Experience {...data} key={i} />
        )
    }

    get educ() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail: {educations}} = abroad_expert_detail;
        educations[0].style = {paddingTop: 0};
        return (
            <View style={[]}>
                <CollapsibleIntro title={"教育背景"}>
                    <Educations
                        noScroll
                        items={educations}
                    />
                </CollapsibleIntro>

            </View>
        )
    }

    getHead(name) {
        return (
            CollapsibleIntro.getHead(name, true)
        )
    }

    get collapse() {

    }

    sep(noBorder, style) {
        return <View style={[{
            height: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e5e5e5'
        }, noBorder ? {borderColor: 'transparent'} : {}, style]}></View>
    }

    get menu_1() {
        return (
            <View style={sty.menus}>
                <SubMenu style={sty.submenu}
                         title="详情"
                         active={true}
                         onPress={() => actions.setMyActiveCollectionTab(0)}
                />
                <SubMenu style={sty.submenu}
                         title="访问"
                         active={false}
                         onPress={() => actions.setMyActiveCollectionTab(0)}
                />
                <SubMenu style={sty.submenu}
                         title="评价"
                         active={false}
                         onPress={() => actions.setMyActiveCollectionTab(0)}
                />
            </View>
        )
    }
}

export default AbroadExpertDetailPage;
