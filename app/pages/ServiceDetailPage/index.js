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
            actions, store: {
            service_detail: {
                base,
                detail: {
                    services, teacherInfo,
                    character, promise, process, offerRank
                }
            }
        }
        } = this.props;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={sty.main}>

                    <TeacherBasicInfo
                        style={{paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 15}}
                        listValues={[base.clients, base.rate, base.reviews]}
                        listKeys={["用户数", "评分", "评价数"]}
                    >
                        <View style={{flex: 0, height: 210, alignSelf: 'stretch'}}>
                            <Image source={base.source} style={{flex: 1, backgroundColor: '#eee'}} resizeMode={"cover"}/>
                        </View>
                    </TeacherBasicInfo>

                    <ScrollTab
                        onChangeTab={({i}) => {
                        }}
                        tabContainerStyle={{flex: 1, alignItems: 'center'}}
                        tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                        tabBarStyle={{height: 40}}
                        initialPage={0}
                    >
                        <View tabLabel="服务详情">
                            <View style={{flex: 1}}>
                                {sep()}
                                <CollapsibleIntro title={"套餐类型"} style={{paddingBottom: 0}}>
                                    <View style={{marginHorizontal: -15}}>
                                        {services.map((item, i) => {
                                            item.onPress = function () {
                                                actions.setSubServiceDetailType(item.type);
                                                Actions.subServiceDetail({params: {title: item.name}});
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
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务特色"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务承诺"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="服务流程"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                    {HR}
                                </CollapsibleIntro>
                                <CollapsibleIntro
                                    titleCenter
                                    title="Offer榜"
                                >
                                    <View style={{backgroundColor: '#eee', height: 280}}></View>
                                </CollapsibleIntro>
                            </View>
                        </View>
                        <View tabLabel="用户评价">
                            <View style={{flex:1}}>
                                {sep()}
                            </View>
                        </View>
                    </ScrollTab>
                </ScrollView>
                <BottomBtns
                    lefts={[{text: "收藏"}, {text: "客服"}]} mainText={"去付款"}
                    onMainPress={() => {
                        const mapService = ({price, name, ...r}, i) => ({
                            ...r, price, rightText: '¥'+price,
                            leftText: name,// type: "topic"
                        });
                        actions.setAbroadExpertFormItems(services.map(mapService));
                        actions.setAbroadExpertFormThumbnail(null);
                        actions.setAbroadExpertFormName(null);
                        actions.abroadExpertBuyFormModalOpen();
                    }}
                />
            </View>
        )
    }

    _renderService(data, i) {
        const icon = <Entypo name="chevron-thin-right" size={15} color="#a1a1a1"/>;
        return (
            <CollapsibleService collapsible={false} key={i} {...data} downIcon={icon} upIcon={icon}/>
        )
    }
}

export default ServiceDetailPage;
