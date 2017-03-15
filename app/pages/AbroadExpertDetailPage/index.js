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
import Loading from '../../components/Loading';


EXPEND_HEIGHT = 250;

@autobind
class AbroadExpertDetailPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {
            store: {
                abroad_expert_detail: {isFetching, base: {avatar, id, name, content, tags, clients, rate, reviews}, detail, service, comment}
            }, actions
        } = this.props;
        actions.fetchAbroadExpertDetail(id);
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
        const {actions} = this.props;
        actions.setForeignTeacherDetailCommentFirst(true);
    }

    static defaultProps = {}
    state = {
        starCollapsed: true,
        scrollEnable: true
    }
    static propTypes = {}
    _activeTab = 0;

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 60;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    render() {
        const {
            store: {
                abroad_expert_detail: {
                    isFetching, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews},
                    detail, comment: {currentPage, hasMore}}
            }, actions
        } = this.props;
        return (
            <View>
                <ScrollView
                    scrollEnable={this.state.scrollEnable}
                    scrollEventThrottle={100}
                    onScroll={({nativeEvent}) => {
                        if (this._activeTab == 1 && this.isCloseToBottom(nativeEvent)) {
                            if (!isCommentFetching) {
                                actions.fetchAbroadExpertCommentDetail(id, +currentPage+1);
                            }
                        } else if (this._activeTab == 1) {
                        }
                    }}
                    contentContainerStyle={[sty.main, {paddingBottom: 45}]}
                >
                    {this.header}
                    <ScrollTab
                        onChangeTab={({i}) => {
                            this._activeTab = +i;
                            i == 1 && isCommentFirst && actions.fetchAbroadExpertCommentDetail(id);
                        }}
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40}}
                        initialPage={0}
                    >
                        <View tabLabel="导师详情">

                            {isFetching ? <Loading style={{flex: 1}}/> :
                                <View>
                                    {this.sep()}
                                    {this.intro}
                                </View>
                            }
                        </View>
                        <View tabLabel={"用户评价"}>
                            {isCommentFetching && isCommentFirst ? <Loading style={{flex: 1}}/> :
                                <View>
                                    {this.sep()}
                                    {this.comments}
                                    {this.commentList}
                                </View>
                            }
                        </View>
                    </ScrollTab>
                </ScrollView>
                {isFetching ? null: this.fixBottom}
            </View>
        )
    }

    get intro() {
        const {
            store: {
                abroad_expert_detail: {detail: {summary, description, educations, experiences, services}}
            }, actions
        } = this.props;
        const selfIntroObj = splitText(description);

        return (
            <View>
                {this.topic}
                {this.sep()}
                <CollapsibleIntro
                    title={"自我介绍"}
                    showTexts={selfIntroObj.showText}
                    hideTexts={selfIntroObj.hideText}
                />
                {this.sep()}
                {this.educ}
                {this.sep()}
                {this.experience}
                {this.sep()}
                {this.honor}
            </View>
        )
    }

    get header() {
        const {
            store: {
                abroad_expert_detail: {
                    isFetching, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews, listKeys},
                    detail, comment: {currentPage, hasMore}}
            }, actions
        } = this.props;
        return (
            <View style={{flex: 1}}>
                <TeacherBasicInfo
                    style={{alignItems: 'center'}}
                    tags={tags}
                    name={name}
                    content={content}
                    thumbnail={avatar}
                    listKeys={listKeys || ["Clients", "Rate", "Reviews"]}
                    listValues={[clients, rate, reviews]}
                />
                <Hr marginBottom={0} color={'#e5e5e5'}/>
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
        const {
            store: {
                abroad_expert_detail: {detail: {summary, description, educations, experiences, services}}
            }, actions
        } = this.props;
        const items = services;

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

        const items = experiences;

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
