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
        const {params = {}} = this.props
        const {title = "TITLE"} = params;

        return (
            <View>
                <ScrollView contentContainerStyle={[sty.main, {paddingBottom: 45}]}>
                    <TeacherBasicInfo
                        tags={["文书导师", "全套文书导师", "一站式申请"]}
                        name={title}
                        content={"2016.9 - 2017.7 ESSEC Business School, Master of Finance; 2016.1 - 2016.4 ESC Rennes, Exchange student; 2012.9 - 2016.7 Nankai University, Bachelor of Economics"}
                        appointNum={400}
                        average={4.5}
                        commentNum={112}
                    />
                    {this.sep}
                    <ScrollTab
                        /*onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}*/
                        tabContainerStyle={{flex: -1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 14}}
                        tabBarStyle={{height: 40}}
                    >
                        <View tabLabel="详情" style={{flex: 1}}>
                            <CollapsibleIntro
                                title={"自我介绍"}
                                showTexts={["研究生申请，我也曾同你一样一筹莫展。在面对把哥大统计当做金字招牌大肆宣传自己水平的中介时，在面对范文中把calculus-based",
                                    "probabilty当做calculus +",
                                    "probabilty得文书机构时，我选择了相信自己。不靠论坛上流传的空穴来风，不轻信所谓前辈的内幕消息，运用逻辑来分析申请中得每一个环节和条件，通过教授的论文了解录取委员会的预期。一年前我以3.66总体水平一般的GPA，克服了单学期GPA1.77，缺少实习的不利条件，进入哈佛大学，同时也取得了录取率只有6%",
                                    "NYU金融数学的青睐。我相信，申请的重点在于发挥长处突出自身和项目的契合。我对MFE, Data Science各个主流项目都有较深入的了解，对于文书的结构和内容也…"]}
                                hideTexts={["研究生申请，我也曾同你一样一筹莫展。在面对把哥大统计当做金字招牌大肆宣传自己水平的中介时，在面对范文中把calculus-based",
                                    "probabilty当做calculus +",
                                    "probabilty得文书机构时，我选择了相信自己。不靠论坛上流传的空穴来风，不轻信所谓前辈的内幕消息，运用逻辑来分析申请中得每一个环节和条件，通过教授的论文了解录取委员会的预期。一年前我以3.66总体水平一般的GPA，克服了单学期GPA1.77，缺少实习的不利条件，进入哈佛大学，同时也取得了录取率只有6%",
                                    "NYU金融数学的青睐。我相信，申请的重点在于发挥长处突出自身和项目的契合。我对MFE, Data Science各个主流项目都有较深入的了解，对于文书的结构和内容也…"]}

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
                        <View tabLabel="评价"></View>
                    </ScrollTab>


                </ScrollView>
                {this.fixBottom}
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

    get experience() {
        return (
            <View style={[sty.container]}>
                {this.getHead("经历")}
            </View>
        )
    }

    get educ() {
        return (
            <View style={[sty.container, {paddingHorizontal: 6}]}>
                {this.getHead("教育")}
                <Educations
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
