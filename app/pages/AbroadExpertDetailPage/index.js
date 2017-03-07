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
import Educations from '../../components/Educations';
import SubMenu from '../../components/SubMenu';
import ScrollTab from '../../components/ScrollTab';
import BottomBtns from '../../components/BottomBtns';
import CollapsibleIntro from '../../components/CollapsibleIntro';
import Comments from '../../components/Comments';


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
        return (
            <View>
                <ScrollView contentContainerStyle={[sty.main, {paddingBottom: 45}]}>
                    <TeacherBasicInfo
                        thumbnail={base.avatar}
                        tags={base.tags}
                        name={base.name}
                        content={base.content}
                        appointNum={base.appointNum}
                        average={base.average}
                        commentNum={base.commentNum}
                    />
                    {this.sep}
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 14}}
                        tabBarStyle={{height: 40}}
                    >
                        <View tabLabel="详情">
                            <CollapsibleIntro
                                title={"自我介绍"}
                                showTexts={detail.intro.substr(0, 50)}
                                hideTexts={detail.intro.slice(50)}

                            />
                            {this.sep}
                            {this.educ}
                            {this.sep}
                            {this.experience}
                            {this.sep}
                            {this.sep}
                            {this.sep}
                            {this.sep}
                        </View>
                        <View tabLabel="服务"></View>
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
        const {store: {abroad_expert_detail}, actions} = this.props
        const {comment: {comments}} = abroad_expert_detail;

        return (
            <Comments
                noScroll
                items={comments}
            />
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

    get experience() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail: {experiences}} = abroad_expert_detail;

        return (
            <View style={[sty.container]}>
                {this.getHead("经历")}
            </View>
        )
    }

    get educ() {
        const {store: {abroad_expert_detail}, actions} = this.props
        const {base, detail: {educations}} = abroad_expert_detail;
        return (
            <View style={[sty.container, {paddingHorizontal: 6}]}>
                {this.getHead("教育")}
                <Educations
                    noScroll
                    items={educations}
                />
            </View>
        )
    }

    getHead(name) {
        return (
            <View style={{
                marginVertical: 10, alignItems: 'center'
            }}>
                <View style={{
                    borderBottomWidth: 2, paddingBottom: 3,
                    borderBottomColor: '#4a4a4a'
                }}>
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >{name}</Text>
                </View>
            </View>
        )
    }

    get collapse() {

    }

    get sep() {
        return <View style={{height: 10}}/>
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
