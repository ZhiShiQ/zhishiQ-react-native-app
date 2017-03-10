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
import Educations from '../../components/Educations';
import SubMenu from '../../components/SubMenu';
import ScrollTab from '../../components/ScrollTab';
import BottomBtns from '../../components/BottomBtns';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import Comments from '../../components/Comments';
import CommentStar from '../../components/CommentStar';
import Hr from '../../components/Hr';


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
                            {this.sep()}
                            {this.sep()}
                            {this.sep()}
                        </View>
                        <View tabLabel="用户评价">
                            {this.comments}
                        </View>
                    </ScrollTab>


                </ScrollView>
                {this.fixBottom}
            </View>
        )
    }

    get comments() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {comment: {comments}} = abroad_expert_detail;

        return (
            <View>
                {this.sep()}
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

        return (
            <View style={[sty.container, {paddingVertical: 15}]}>
                {this.getHead("经历")}
            </View>
        )
    }

    get educ() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail: {educations}} = abroad_expert_detail;
        return (
            <View style={[sty.container, {paddingHorizontal: 6, paddingTop: 15}]}>
                <View style={{paddingHorizontal: 9}}>{this.getHead("教育")}</View>
                <Educations
                    noScroll
                    items={educations}
                />
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
