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
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import sty from './style';
import {splitText} from '../../helpers';
import {NAV_BAR_HEIGHT} from '../../constant'
import {upIcon, downIcon, starIcon} from '../../helpers/resource';

import TeacherBasicInfo from '../../components/TeacherBasicInfo';
import ScrollTab from '../../components/ScrollTab';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import CollapsibleItem from '../../components/CollapsibleItem';
import HrFlexLayout from '../../components/HrFlexLayout';
import Loading from '../../components/Loading';
import LinkItem from '../../components/LinkItem';
import Educations from '../../components/Educations';
import BottomBtns from '../../components/BottomBtns';
import Comments from '../../components/Comments';
import CommentStar from '../../components/CommentStar';
import Hr from '../../components/Hr';
import Experience from '../../components/Experience';
import CollapsibleService from '../../components/CollapsibleService';

const SCROLL_TAB_HEIGHT = 40;
@autobind
class ForeignTeacherDetailPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        const {
            store: {
                foreign_teacher_detail: {isFetching, base: {avatar, id, name, content, tags, clients, rate, reviews}, detail, service, comment}
            }, actions
        } = this.props;
        actions.setForeignTeacherDetailFetching(true);
        setTimeout(() => {
            actions.fetchForeignTeacherDetail(id);
        }, 0);
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
        scrollEnable: true,
        tabSticky: false
    };
    static propTypes = {}

    _activeTab = 0;

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 60;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    _onScroll_fetchComment(nativeEvent) {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isFullFetch, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews},
                    detail, comment: {currentPage, hasMore}}
            }, actions
        } = this.props;

        if (this._activeTab == 1 && this.isCloseToBottom(nativeEvent)) {
            if (!isCommentFetching) {
                actions.fetchForeignTeacherCommentDetail(id, +currentPage+1);
            }
        } else if (this._activeTab == 1) {
        }
    }

    _onMeasureTabs() {
        const {tabSticky} = this.state;
        const HEIGHT = NAV_BAR_HEIGHT;

        /*this.refs.tabPos.measure && this.refs.tabPos.measure((ox, oy, width, height, px, py) => {
            if (py <= HEIGHT && this.state.tabSticky != true) {
                // alert('reached' + py);// reached
                this.setState({tabSticky: true});
            } else if (py > HEIGHT && this.state.tabSticky != false) {
                // alert('unreached' + py);
                // this.setState({tabSticky: false});
            }
        });*/
    }

    render() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isFullFetch, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews},
                    detail, comment: {currentPage, hasMore}}
            }, actions
        } = this.props;

        if (isFetching && isFullFetch) {
            return <Loading/>
        }
        const {tabSticky} = this.state;
        return (
            <View style={{flex: 1}}>
                {<ScrollView
                    /*renderScrollComponent={(p) => this.state.scrollEnable && !tabSticky? ScrollView.defaultProps.renderScrollComponent(p): <View {...p} />}*/
                    scrollEnable={this.state.scrollEnable/* && !tabSticky*/}
                    scrollEventThrottle={100}
                    onScroll={({nativeEvent}) => {
                        this._onScroll_fetchComment(nativeEvent);
                        this._onMeasureTabs();
                    }}
                    contentContainerStyle={[sty.main]}
                >
                    {this.header}
                    {this.scrollTabView}
                </ScrollView>}
                {isFetching ? null: this.fixBottom}

            </View>

        )
    }

    get scrollTabView() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isFullFetch, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews},
                    detail, comment: {currentPage, hasMore}}
            }, actions
        } = this.props;
        const {height, width} = Dimensions.get('window');
        const {tabSticky} = this.state;

        const Container = tabSticky? ScrollView : View;

        return (
            <View style={{flex: 1}}>
                <View ref="tabPos"></View>
                <ScrollTab
                    onChangeTab={({i}) => {
                        this._activeTab = +i;
                        if (i == 1 && isCommentFirst) {
                            actions.setForeignTeacherDetailCommentFetching(true);
                            setTimeout(() => {
                                actions.setForeignTeacherDetailCommentFetching(false);
                                actions.fetchForeignTeacherCommentDetail(id);
                            }, 0);
                        }
                    }}
                    tabContainerStyle={{flex: 1, alignItems: 'center'}}
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                    tabBarStyle={[{height: SCROLL_TAB_HEIGHT},
                        tabSticky && {
                            position: 'absolute',
                            top: SCROLL_TAB_HEIGHT, left: 0, right: 0,
                            zIndex: 10
                        }]}
                    initialPage={0}
                >
                    <View style={[tabSticky && {flex: 1}]} tabLabel="导师详情">
                        {isFetching ? <Loading style={{}}/> :
                            <Container
                                onScroll={({nativeEvent}) => {
                                    this._onMeasureTabs();
                                }}
                                style={[tabSticky  && { marginTop: SCROLL_TAB_HEIGHT, height: height-SCROLL_TAB_HEIGHT-NAV_BAR_HEIGHT }]}
                                scrollEventThrottle={100}
                                scrollEnable={tabSticky}>
                                {/*<View ref="tabPos"></View>*/}
                                {this.sep()}
                                {this.intro}
                            </Container>
                        }
                    </View>
                    <View style={[this.state.tabSticky && {marginTop: SCROLL_TAB_HEIGHT, }]} tabLabel={"用户评价"}>
                        {isCommentFetching && isCommentFirst ? <Loading style={{}}/> :
                            <Container
                                onScroll={({nativeEvent}) => {
                                    this._onScroll_fetchComment(nativeEvent);
                                    this._onMeasureTabs();
                                }}
                                style={[tabSticky  && { height: height-SCROLL_TAB_HEIGHT-NAV_BAR_HEIGHT }]}
                                scrollEventThrottle={100}
                                scrollEnable={tabSticky}>
                                {/*<View ref="tabPos"></View>*/}
                                {this.sep()}
                                {this.comments}
                                {this.commentList}
                            </Container>
                        }
                    </View>
                </ScrollTab>
            </View>
        )
    }

    get header() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isCommentFetching, isCommentFirst, base: {id, avatar, name, content, tags, clients, rate, reviews},
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
                listKeys={["Clients", "Rate", "Reviews"]}
                listValues={[clients, rate, reviews]}
            />
            <Hr marginBottom={0} color={'#e5e5e5'}/>
            </View>
        )
    }


    get packageService() {
        const {
            store: {
                foreign_teacher_detail: {base: {id}, detail: { intro='', selfIntro='', educations, experiences, services}}}, actions
        } = this.props;

        const items = services.map(({...r}, i) => ({
            ...r, onBtnPress: () => {
                this.initialModalForm();
                actions.abroadExpertBuyFormModalOpen(i);
            },
        }));

        return (
            <CollapsibleIntro title={"套餐类型"} style={{paddingBottom: 0}}>
                <View style={{marginHorizontal: -15}}>
                    {items.map((item, i) => this._renderService(item, i))}
                </View>
            </CollapsibleIntro>
        )
    }

    _renderService(data, i) {
        return (
            <CollapsibleService key={i} {...data} />
        )
    }

    get intro() {
        const {
            store: {
                foreign_teacher_detail: {detail: {intro='', selfIntro='', summary, description, educations, experiences, services}}
            }, actions
        } = this.props;
        const selfIntroObj = splitText(description);
        return (
            <View>
                {this.packageService}
                {this.sep()}
                <CollapsibleIntro title={"个人简介"}
                                  showTexts={summary}/>
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
        const {store: {foreign_teacher_detail: {detail: {experiences}}}} = this.props;
        const items = experiences;

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
                <View key={i} style={{backgroundColor: '#e5e5e5', height: .5, alignSelf: 'stretch'}}></View>
            )
    }

    _renderExperience(data, i, a) {
        return (
            <Experience {...data} key={i} />
        )
    }

    get comments() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isCommentFirst, isCommentFetching,
                    comment: {total, hasMore, average, levels, summary, comments, currentPage},
                    base: {id}
                }
            }, actions
        } = this.props;
        const {starCollapsed} = this.state;

        return (
            <View>
                <CommentStar
                    collapsed={true}
                    levels={levels}

                    speed={summary.timely}
                    quality={summary.all}
                    pro={summary.professional}
                    manner={summary.attitude}

                    commentNum={total}
                    rate={average}
                />
                {this.sep(true, {height: 1})}
            </View>
        )
    }

    get commentList() {
        const {
            store: {
                foreign_teacher_detail: {
                    isFetching, isCommentFirst, isCommentFetching,
                    comment: {total, hasMore, average, levels, comments, currentPage},
                    base: {id}
                }
            }, actions
        } = this.props;

        // alert(comments.length);

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
                        return hasMore ? <Loading /> : <View style={{marginVertical: 20, alignItems: 'center'}}><Text>没有更多了</Text></View>
                    }
                }}
            />
        )
    }

    initialModalForm() {
        const {actions, store: {
            foreign_teacher_detail: {detail: {services}, base: {avatar, name}}
        }} = this.props;
        const mapService = ({price, name, type, ...r}, i) => ({
            ...r, price, rightText: '¥'+price,
            leftText: name, type,
            items: type == 'singlePaper'
                && [{leftText: "PS／Essay／RL／SoP", type}, {leftText: "个人简历", type}, {leftText: "学术文章", type}]
        });

        // alert(JSON.stringify(services));
        actions.setAbroadExpertFormItems(services.map(mapService));
        actions.setAbroadExpertFormThumbnail(avatar);
        actions.setAbroadExpertFormName(name);
    }

    get fixBottom() {
        const {actions, store: {abroad_expert_detail: {base: {avatar, name}, detail: {services}}}} = this.props;
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
                onSubPress={() => {
                    this.initialModalForm();
                    // actions.setOrderConfirmType();
                    actions.abroadExpertCartFormModalOpen();
                }}
                mainText={"立即预约"}
                onMainPress={() => {
                    this.initialModalForm();
                    actions.abroadExpertBuyFormModalOpen();
                }}
            />
        )
    }

    sep(noBorder, style) {
        return <View style={[{
            height: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e5e5e5'
        }, noBorder ? {borderColor: 'transparent'} : {}, style]}></View>
    }
}

export default ForeignTeacherDetailPage;
