/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    Actions,
    ActionConst,
    DefaultRenderer,
    Router,
    Reducer,
    Scene
} from 'react-native-router-flux';

import {
    View,
    Platform,
    Text,
    Dimensions,
    Button,
    ListView,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import autobind from 'autobind-decorator';
const {height, width} = Dimensions.get('window');

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MinePage from './pages/MinePage';
import CartPage from './pages/CartPage';
import ServicePage from './pages/ServicePage';
import TotalOrderPage from './pages/TotalOrderPage';
import MyInformationPage from './pages/MyInformationPage';
import MyBasicInfoPage from './pages/MyBasicInfoPage';
import ExaminationPage from './pages/ExaminationPage';
import ExaminationDetailPage from './pages/ExaminationDetailPage';
import SetSchoolPage from './pages/SetSchoolPage';
import MyExperiencePage from './pages/MyExperiencePage';
import StudyAbroadIntentionPage from './pages/StudyAbroadIntentionPage';
import ApplySchoolPage from './pages/ApplySchoolPage';
import TimezoneNFreeTimePage from './pages/TimezoneNFreeTimePage';
import WayOfContactPage from './pages/WayOfContactPage';
import MyCollectionPage from './pages/MyCollectionPage';
import MyDiscountCouponPage from './pages/MyDiscountCouponPage';
import InviteFriendPage from './pages/InviteFriendPage';
import RecentSkimPage from './pages/RecentSkimPage';
import ForeignTeacherPage from './pages/ForeignTeacherPage';
import AbroadExpertPage from './pages/AbroadExpertPage';
import AbroadExpertDetailPage from './pages/AbroadExpertDetailPage';
import BoughtDonePage from './pages/BoughtDonePage';
import MessagesPage from './pages/MessagesPage';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import EntryPage from './pages/EntryPage';
import ResetPwdByPhonePage from './pages/ResetPwdByPhonePage';
import ForeignTeacherDetailPage from './pages/ForeignTeacherDetailPage';
import ResetPwdByMailPage from './pages/ResetPwdByMailPage';
import ServiceClausePage from './pages/ServiceClausePage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import SettingPage from './pages/SettingPage';
import QRCodePage from './pages/QRCodePage';
import WeeklyDayPage from './pages/WeeklyDayPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SubServiceDetailPage from './pages/SubServiceDetailPage';
import OrderConfirmDetailPage from './pages/OrderConfirmDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import OneStepServiceDetailPage from './pages/OneStepServiceDetailPage';

import ServiceTestPage from './pages/ServiceTestPage';
import SubmitSuccessPage from './pages/SubmitSuccessPage';

// import QRCodeScreen from './components/QRCodeScreen';
import TabIcon from './components/TabIcon';
import NavigationDrawer from './components/NavigationDrawer';
import Modal from './components/Modal';
import LinkItem from './components/LinkItem';
import HrFlexLayout from './components/HrFlexLayout';
import LinkItems from './components/LinkItems';
import CirImageWithText from './components/CirImageWithText';
import CirImage from './components/CirImage';
import ReduxTitleDropdown from './components/ReduxTitleDropdown';
import SearchTitle from './components/SearchTitle';
import Hr from './components/Hr';
import BlockButton from './components/BlockButton';
import ModalPicker from './components/ModalPicker';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import * as $ from './constant';
import {BACK_ICON, shareIcon, moreIcon, searchIcon} from './helpers/resource';
const Alipay = require('react-native-yunpeng-alipay').default;

const MapStateToProps = (state) => ({store: state})
const MapDispatchToProps = (dispatch) => ({
    __dispatch: dispatch,
    actions: bindActionCreators(require('./actions').default, dispatch)
})
const conn = (Component) => connect(MapStateToProps, MapDispatchToProps)(Component)
const TITLE = "芝士圈留学";
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    navigationBarStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tabBarStyle: {
        backgroundColor: '#fff',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#fff',
    },
    titleWrapper: {
        marginTop: 10,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 5,
            },
            windows: {
                top: 5,
            },
        }),
        left: 0,
        right: 0,
    },
});
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#F7F7F7',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : $.NAV_BAR_HEIGHT;
        style.marginBottom = computedProps.hideTabBar ? 0 : $.TAB_BAR_HEIGHT;
    }
    return style;
};


@autobind
class Routers extends React.Component {
    extendProps(Component, props) {
        return <Component {...props} {...this.props}/>
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            this.props.__dispatch(action);
            return defaultReducer(state, action);
        };
    }

    static propTypes = {
        __dispatch: React.PropTypes.func,
    };


    state = {
        abroadExpertFormIndex: 0
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    _mapModalProps() {
        const {
            store: {
                common: {
                    openModal, modalType, abroadExpertForm: {items, thumbnail, name},
                    timeRange: {deletable, start, end}
                }
            }, actions
        } = this.props;

        const {abroadExpertFormIndex: index} = this.state;
        switch (modalType) {
            case 'referer':
                return {
                    buttons: [{
                        title: "已打开网址，点击扫描",
                        onPress: () => {
                            actions.setCommonModalIsOpen(false);
                            Actions.qrCode();
                        }
                    }], height: 442
                };
            case 'timeRange':
                return {
                    buttons: [{
                        title: "保存",
                        onPress: () => {
                            actions.setCommonModalIsOpen(false);
                        }
                    }, deletable ? {
                            title: "删除", onPress: () => {
                                actions.setCommonModalIsOpen(false);
                            }
                        } : undefined], height: 400 + (deletable ? 30 : 0)
                }
            case 'discount':
                return {
                    buttons: [{
                        title: "确定", full: false, onPrees: () => {
                        }
                    }], height: 470
                }
            case 'abroadExpertBuy':
                return {
                    buttons: [{
                        full: true,
                        title: "确定",
                        onPress: () => {

                            actions.setCommonModalIsOpen(false);
                            const {id, leftText: name, price, type} = items[index];
                            actions.setOrderConfirmType(type);
                            actions.setOrderConfirmTopic(name);
                            actions.setOrderConfirmPrice(price);
                            actions.setOrderConfirmId(id);
                            Actions.orderConfirm({params: {type: 'buy'}});
                        }
                    }], height: 450 //height - 50
                }
            case 'abroadExpertCart':
                return {
                    buttons: [{
                        full: true,
                        title: "加入购物车",
                        backgroundColor: '#ffb12e',
                        onPress: () => {
                            actions.setCommonModalIsOpen(false);
                            const {id, leftText: name, price, type} = items[index];
                            // alert(type+name);
                            actions.setOrderConfirmType(type);
                            actions.setOrderConfirmTopic(name);
                            actions.setOrderConfirmPrice(price);
                            actions.setOrderConfirmId(id);
                            Actions.orderConfirm({params: {type: 'cart'}});
                        }
                    }], height: 450 // height - 50
                }
            case 'simplePay':
                return {buttons: [], height: 320}
        }
    }

    _renderModal() {
        const {store: {common: {openModal, modalType}}, actions} = this.props;
        if (openModal && modalType === 'picker') {
            return this.modalPicker;
        }
        return (
            <Modal
                isOpen={openModal}
                onClosed={() => {
                    if (modalType === 'simplePay' && openModal) {
                    }
                    actions.setCommonModalIsOpen(false)
                    this.setState({abroadExpertFormIndex: 0});
                }}
                style={{backgroundColor: '#fff'}}
                {...this._mapModalProps()}
            >
                {
                    modalType === 'referer' &&
                    <CirImageWithText
                        size={120}
                        text={[
                            '亲爱的用户，移动端提交反馈功能正在开发中哦，',
                            '可用电脑浏览器打开网址操作：',
                            {text: 'www.zhishiq.com/sao', props: {selectable: true}}
                        ]}
                    />
                }
                {modalType === 'timeRange' && this.timeRange}
                {modalType === 'discount' && this.discount}
                {modalType === 'abroadExpertBuy' && this.abroadExpertForm}
                {modalType === 'abroadExpertCart' && this.abroadExpertForm}
                {modalType === 'simplePay' && this.simplePlay}
            </Modal>
        )
    }

    get discount() {
        const discounts = [
            {largeText: ''}, {largeText: ''}, {largeText: ''}, {largeText: ''},
            {largeText: ''}, {largeText: ''}, {largeText: ''}, {largeText: ''}
        ];

        // return this.abroadExpertForm;

        return (
            <View style={{padding: 10, paddingTop: 20, paddingBottom: 14, flex: 0}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#4a4a4a', fontSize: 16}}>选择优惠券</Text>
                </View>


                <ListView
                    style={{marginTop: 10, paddingTop: 10, marginBottom: 54}}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(discounts)
                    }
                    renderRow={(x) => (
                        <TouchableOpacity style={{
                            marginHorizontal: 20,
                            borderRadius: 6,
                            overflow: 'hidden',
                            height: 101, backgroundColor: '#ccc'}}/>
                    )}
                    renderSeparator={() => (<View style={{height: 10}}/>)}
                />
            </View>
        )
    }

    get timeRange() {
        const {store: {common: {timeRange: {deletable, start, end}}}, actions} = this.props;
        // TODO: DatePickerIOS => only ios
        const {DatePickerIOS} = require('react-native');
        return (
            <View style={{}}>
                <DatePickerIOS
                    textColor="#4a4a4a"
                    style={{fontSize: 14}}
                    date={start}
                    onDateChange={(date) => actions.setTimeRangeStart(date)}
                    mode={"time"}
                />
                <Text style={{alignSelf: 'center'}}>至</Text>
                <DatePickerIOS
                    textColor="red"
                    date={end}
                    onDateChange={(date) => actions.setTimeRangeEnd(date)}
                    mode={"time"}
                />
            </View>
        )
    }

    get simplePlay() {
        return (
            <View style={{alignItems: 'center', backgroundColor: '#fff', flex: 1}}>
                <Text style={{marginBottom: 8, marginTop: 35, fontSize: 17, fontWeight: 'bold', color: '#4a4a4a'}}>感谢您选择
                    芝士圈留学 的服务！</Text>
                <Text style={{marginBottom: 13.5, fontSize: 12, color: '#a1a1a1'}}>PO号码：<Text selectable>PO12345</Text></Text>
                <Text style={{fontSize: 13, color: '#4a4a4a', marginBottom: 6}}>即将支付</Text>
                <Text style={{marginBottom: 28.5, fontSize: 16, color: '#ea5502'}}>￥532.00 RMB</Text>
                <Hr marginBottom={0} style={{alignSelf: 'stretch'}} color={"#e5e5e5"}/>
                <LinkItem onPress={null} showBorder={null}
                          style={{paddingHorizontal: $.PADDING_SIZE, paddingVertical: 4}}
                          leftComponent={<HrFlexLayout style={{alignItems: 'center'}}><CirImage
                              style={{marginRight: 12}}
                              size={32}/><Text>微信支付</Text></HrFlexLayout>}
                />
                <Hr marginBottom={0} style={{alignSelf: 'stretch', marginHorizontal: $.PADDING_SIZE}}
                    color={"#e5e5e5"}/>
                <LinkItem onPress={() => {
                    let json = {
                        "alipay_sdk": "alipay-sdk-php-20161101",
                        "app_id": "2017032706426269",
                        "biz_content": "{\"subject\":\"IT\\u79d1\\u6280\\/IT\\u8f6f\\u4ef6\\u4e0e\\u670d\\u52a1\",\"total_amount\":0.1,\"body\":\"Iphone6 16G\",\"out_trade_no\":\"3a950804a18e86ad991644c4836a292c249a75e5\",\"product_code\":\"QUICK_MSECURITY_PAY\",\"passback_params\":\"merchantBizType%3d3C%26merchantBizNo%3d2016010101111\"}",
                        "charset": "UTF-8",
                        "format": "json",
                        "method": "alipay.trade.app.pay",
                        "sign_type": "RSA2",
                        "timestamp": "2017-04-06 07:56:41",
                        "version": "1.0",
                        "sign": "al9XDXpYW6WfCf9l7Ji10UaXJe/zkjpnLIZfA4+3F1samoNAf4ZGFlIGchOZf0yDNXuDq8EUz+0ptwc5DGuHdljfr2KI9ouMj695Ns9hpOzYPDC/SsFmMeOdEETBcpBbRiZVs/ghcDxgiMukUZ3dO+OOE9xh8SNUFr74i/B9cP+Kq/t0RT9c34UA7EaUTEWBLvXFnV1lnUIE+4/GAY+ZUgS0PPMXSPkhviJTBYNVRffUYCULbM+IRui2e9TTMn4I9DghIjydJObD5v57YEz8BpYePpLU2F6ZIBftYqMJZk6F1kdgx1kft/tgRDHod6At50uH1fHla1CDkqg3RhP3PQ=="
                    };
                    //for (let k in json) {
                    //    json[k] = encodeURIComponent(json[k]);
                    //}
                    let sign = require('querystring').stringify(json);
                    // sign = json.sign;
                    Alipay.pay(sign).then(alert, alert);
                }} showBorder={null}
                          style={{paddingHorizontal: $.PADDING_SIZE, paddingVertical: 4}}
                          leftComponent={<HrFlexLayout style={{alignItems: 'center'}}><CirImage
                              style={{marginRight: 12}}
                              size={32}/><Text>支付宝支付</Text></HrFlexLayout>}
                />
                <Hr marginBottom={0} color={'#e5e5e5'} style={{alignSelf: 'stretch', marginHorizontal: 0}}/>
                <View style={{alignItems: 'center', marginTop: 10, marginHorizontal: $.PADDING_SIZE}}>
                    <Text style={{color: '#a1a1a1', fontSize: 13, lineHeight: 17, textAlign: 'center'}}>遇到任何问题，您可以在“消息”中向主页妞咨询联系我们，或者拨打电话4009961931</Text>
                </View>
            </View>
        )
    }

    _openModalPicker() {
        this.refs.picker.open();
    }

    get modalPicker() {
        const {store: {common: {picker: {items}}}, actions} = this.props;

        return (
            <ModalPicker
                ref="picker" items={items}
                onClose={() => actions.setCommonModalIsOpen(false)}
            />
        )
    }

    get abroadExpertForm() {
        const {
            store: {
                common: {
                    abroadExpertForm: {
                        items, index, name, thumbnail
                    }
                }
            }, actions
        } = this.props;
        let {abroadExpertFormIndex} = this.state;
        abroadExpertFormIndex = abroadExpertFormIndex != null ? abroadExpertFormIndex : index;

        const renderRow = (x, i, opt = {}) => {
            const Container = opt.disabled ? View : TouchableOpacity;
            if (opt.active == null) {
                opt.active = (i == abroadExpertFormIndex) || (i == abroadExpertFormIndex + '-0');
            }
            return (
                <Container
                    key={i}
                    style={[{
                        marginHorizontal: 15,
                        borderRadius: 6,
                        overflow: 'hidden',
                        padding: 10
                    }, opt.active ? {backgroundColor: '#fc6d34'} : {
                            backgroundColor: '#fafafa',
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#e5e5e5'
                        }, opt.style]}
                    onPress={() => {
                        this.setState({abroadExpertFormIndex: i});
                        // actions.setAbroadExpertFormIndex(i);
                    }}
                >
                    <View style={[]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={[opt.active ? {color: '#fff'} : {}]}>{x.leftText}</Text>
                            </View>
                            <View style={{flex: 0, marginLeft: 15}}>
                                <Text style={[opt.active ? {color: '#fff'} : {}]}>{x.rightText}</Text>
                            </View>
                        </View>
                    </View>
                </Container>
            );
        }

        return (
            <View style={{paddingTop: 20, flex: 1, backgroundColor: '#fff'}}>
                <View style={{alignItems: 'center'}}>
                    <CirImage size={100} source={thumbnail}/>
                    <Text style={{fontSize: 18, fontWeight: '600', marginTop: 6}}>{name}</Text>
                </View>

                <ListView
                    style={{marginTop: 10, paddingTop: 10, marginBottom: 54}}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(items.map((x, i) => ({
                            ...x,
                            items: i == 0 ? null : null
                        })))
                    }
                    renderRow={(x, s, i) => {
                        const out = !x.items ? renderRow(x, i)
                            : <ListView
                                renderHeader={() => renderRow(x, -1, {
                                    style: {
                                        borderBottomLeftRadius: 2, borderBottomRightRadius: 2,
                                        backgroundColor: '#f1f1f1'
                                    }, disabled: true
                                }) }
                                dataSource={
                                    new ListView.DataSource({
                                        rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                                    }).cloneWithRows(x.items)
                                }
                                renderRow={(x, s, j) =>
                                    renderRow(x, +i + ('-') + (+j), {
                                        style: {borderRadius: 2, borderTopWidth: 0}
                                    })
                                }
                            />
                        return out;
                    }}
                    renderSeparator={() => <View style={{height: 12}}/>}
                />
            </View>
        )
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Router
                    getSceneStyle={getSceneStyle}
                    createReducer={this.reducerCreate.bind(this)}
                >
                    {this._renderScenes()}
                </Router>
                {this._renderModal()}
            </View>
        );
    }

    _renderScenes() {
        const {
            store: {
                common: {openModal},
                my_total_order: {titleIndex}
            },
            actions
        } = this.props;
        const backIcon = {uri: BACK_ICON};
        //const moreIcon = {uri: moreIcon};
        return (
            <Scene key="Root" backButtonImage={backIcon} navigationBarStyle={styles.navigationBarStyle}>

                <Scene hideTabBar key="weeklyDay" component={conn(WeeklyDayPage)} title={'每周空闲时间'}/>
                <Scene initial hideTabBar key="serviceTest" component={conn(ServiceTestPage)} title={'免费测评'}
                       backButtonImage={backIcon}
                />
                <Scene hideTabBar key="submitSuccess" component={conn(SubmitSuccessPage)} title={'提交成功'}
                       backButtonImage={backIcon}
                />

                <Scene hideTabBar key="projectDetail" component={conn(ProjectDetailPage)}
                       getTitle={({params = {}}) => {
                           const {title = "项目一"} = params;
                           return <Text>{title}</Text>
                       }}
                       backButtonImage={backIcon}
                       renderRightButton={() =>
                           <View>{moreIcon}</View>
                       }
                />

                <Scene hideTabBar key="entry" component={conn(EntryPage)} title={TITLE}/>
                <Scene hideTabBar key="oneStepDetail"
                       passProps params={{source: "onestep_detail"}}
                       component={conn(ServiceDetailPage)}
                       title={'一站式留学服务'}/>


                <Scene hideTabBar key="subServiceDetail" component={conn(SubServiceDetailPage)}
                       getTitle={({params = {}}) => {
                           const {title = ""} = params;
                           return <Text>{title}</Text>;
                       }}
                />
                {/*<Scene hideTabBar key="oneStepSubDetail" component={conn(SubServiceDetailPage)}*/}
                       {/*passProps params={{source: "onestep_sub_service_detail"}}*/}
                       {/*getTitle={({params = {}}) => {*/}
                           {/*const {title = ""} = params;*/}
                           {/*return <Text>{title}</Text>;*/}
                       {/*}}*/}
                {/*/>*/}

                <Scene hideTabBar key="serviceDetail" component={conn(ServiceDetailPage)} title={"留学文书修改服务"}/>

                <Scene hideTabBar key="orderConfirmDetail" component={conn(OrderConfirmDetailPage)}
                       getTitle={({params = {}}) => {
                           const {title = "确认订单"} = params;
                           return <Text>{title}</Text>;
                       }}/>

                <Scene key="orderConfirm" component={conn(OrderConfirmPage)}
                       type={ActionConst.PUSH_OR_POP}
                       hideTabBar
                       title="确认订单"
                />

                <Scene key="totalOrder" component={conn(TotalOrderPage)}
                       hideTabBar
                       backButtonImage={backIcon}
                       getTitle={(p) => {
                           const ConnectedDrop = conn(ReduxTitleDropdown);
                           return <ConnectedDrop {...p} />
                       }}/>

                <Scene key="abroadExpertDetail" component={conn(AbroadExpertDetailPage)}
                       hideTabBar
                       type={ActionConst.PUSH_OR_POP}
                       getTitle={({params}) => (params ? params.title : '')}
                       getRightTitle={() => shareIcon}
                       onRight={() => alert()}/>

                <Scene key="foreignTeacherDetail" component={conn(ForeignTeacherDetailPage)}
                       type={ActionConst.PUSH_OR_POP}
                       hideTabBar
                       title=""
                       rightTitle="分享"
                       onRight={() => alert()}/>

                <Scene key="resetPwdByPhone" component={conn(ResetPwdByPhonePage)} title={'重置密码'}/>
                <Scene key="resetPwdByMail" component={conn(ResetPwdByMailPage)} title={'重置密码'}/>
                <Scene key="tabbar" component={conn(NavigationDrawer)}>
                    <Scene
                        key="tab_main"
                        tabs
                        backButtonImage={backIcon}
                        tabBarIconContainerStyle={{height: $.TAB_BAR_HEIGHT}}
                        tabBarStyle={[styles.tabBarStyle, {height: $.TAB_BAR_HEIGHT}]}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                        <Scene backButtonImage={backIcon} key="tab_home_main"
                               navigationBarStyle={styles.navigationBarStyle}
                               iconName={"home"}
                               title="首页"
                               icon={TabIcon}
                        >
                            <Scene
                                renderTitle={(p) => {
                                    const ConnectedSerachTitle = conn(SearchTitle);
                                    return <ConnectedSerachTitle {...p}/>
                                }}
                                key="tab_home" component={conn(HomePage)}
                                /*onLeft={() => Actions.search()}*/
                                /*leftTitle="搜索"*/
                                onRight={() => Actions.messages()}
                                rightTitle="消息"
                            />

                            {/*duplicate*/}
                            <Scene key="homeAbroadExpertDetail" component={conn(AbroadExpertDetailPage)}
                                   hideTabBar
                                   type={ActionConst.PUSH_OR_POP}
                                   getTitle={({params}) => (params ? params.title : '')}
                                   getRightTitle={() => shareIcon}
                                   onRight={() => alert()}/>

                            <Scene key="homeForeignTeacherDetail" component={conn(ForeignTeacherDetailPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title=""
                                   rightTitle="分享"
                                   onRight={() => alert()}/>

                            <Scene key="homeAbroadExpert" component={conn(AbroadExpertPage)}
                                   hideTabBar
                                   type={ActionConst.PUSH_OR_POP}
                                   title="留学行家咨询"
                                   rightTitle="搜索"
                                   getRightTitle={() => searchIcon}
                                   onRight={() => alert()}/>

                            <Scene key="homeForeignTeacher" component={conn(ForeignTeacherPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="外籍文书顾问"
                                   rightTitle="搜索"
                                   getRightTitle={() => searchIcon}
                                   onRight={() => alert()}
                                   backTitle=""/>
                            {/*duplicate end*/}
                        </Scene>
                        <Scene key="search" component={conn(SearchPage)}
                               navigationBarStyle={styles.navigationBarStyle}
                               title="我是输入框"
                               backTitle="取消"
                        />
                        <Scene backButtonImage={backIcon} key="tab_service_main"
                               navigationBarStyle={styles.navigationBarStyle}
                               type={ActionConst.JUMP}
                               iconName={"service"}
                               title="服务" icon={TabIcon}>
                            <Scene key="tab_service" hideTabBar={false} component={conn(ServicePage)}
                                   navigationBarStyle={styles.navigationBarStyle}
                                   rightTitle="消息"
                                   onRight={() => Actions.messages()}
                                   title="服务" icon={TabIcon}/>
                            <Scene key="abroadExpert" component={conn(AbroadExpertPage)}
                                   hideTabBar
                                   type={ActionConst.PUSH_OR_POP}
                                   title="留学行家咨询"
                                   rightTitle="搜索"
                                   getRightTitle={() => searchIcon}
                                   onRight={() => alert()}/>

                            <Scene key="foreignTeacher" component={conn(ForeignTeacherPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="外籍文书顾问"
                                   rightTitle="搜索"
                                   getRightTitle={() => searchIcon}
                                   onRight={() => alert()}
                                   backTitle=""/>


                            <Scene key="serviceClause" component={conn(ServiceClausePage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="服务条款"
                            />


                        </Scene>
                        <Scene backButtonImage={backIcon} key="tab_cart" component={conn(CartPage)} title="购物车"
                               navigationBarStyle={styles.navigationBarStyle}
                               onRight={() => alert()}
                               rightTitle="编辑"
                               iconName={"cart"}
                               icon={TabIcon}/>
                        <Scene backButtonImage={backIcon} key="tab_mine_main" title="我的"
                               iconName={"mine"}
                               navigationBarStyle={styles.navigationBarStyle}
                               icon={TabIcon}>
                            <Scene key="tab_mine" component={conn(MinePage)} title="我的"
                                   navigationBarStyle={{borderBottomColor: 'transparent'}}
                                   hideTabBar={false}
                                   leftTitle="设置"
                                   onLeft={() => Actions.setting()}
                                   rightTitle="消息"
                                   onRight={() => {
                                   }}
                            />
                            <Scene key="myInformation"
                                   backTitle=""
                                   title="我的资料"
                                   hideTabBar
                                   rightTitle="网页版"
                                   onRight={() => alert()}
                                   component={conn(MyInformationPage)}
                            />
                            <Scene
                                title="留学意向"
                                backTitle=""
                                key="studyAbroadIntention"
                                component={conn(StudyAbroadIntentionPage)}
                            />
                            <Scene
                                title="申请学校"
                                backTitle="取消"
                                rightText="确定"
                                onRight={() => {
                                }}
                                key="applySchool"
                                component={conn(ApplySchoolPage)}
                            />
                            <Scene
                                backTitle=""
                                key="wayOfContact"
                                titile="联系方式"
                                component={conn(WayOfContactPage)}
                            />
                            <Scene
                                title="基本资料"
                                backTitle=""
                                key="myBasicInfo"
                                component={conn(MyBasicInfoPage)}
                            />
                            <Scene
                                title="当前院校"
                                backTitle="取消"
                                onRight={() => alert()}
                                rightTitile="确定"
                                key="setMySchool"
                                component={conn(SetSchoolPage)}
                            />
                            <Scene
                                title="经历"
                                backTitle="取消"
                                onRight={() => alert()}
                                rightTitile="确定"
                                key="myExperience"
                                component={conn(MyExperiencePage)}
                            />


                            <Scene
                                backTitle="取消"
                                title="考试" key="examination"
                                rightTitle="添加"
                                onRight={() => alert(1)}
                                component={conn(ExaminationPage)}
                            />
                            <Scene
                                getTitle={({params}) => (params ? params.title : '')}
                                key="examinationDetail"
                                rightTitle="确认"
                                onRight={() => alert(1)}
                                component={conn(ExaminationDetailPage)}
                            />

                            <Scene key="myCollection"
                                   title="我的收藏"
                                   hideTabBar
                                   component={conn(MyCollectionPage)}
                            />

                            <Scene key="myDiscountCoupon"
                                   title="优惠券"
                                   hideTabBar
                                   rightTitle="获取"
                                   onRight={() => actions.discountModalOpen(true) }
                                   component={conn(MyDiscountCouponPage)}
                            />

                            <Scene key="inviteFriend"
                                   title="邀请好友"
                                   hideTabBar
                                   rightTitle="获取"
                                   onRight={() => alert()}
                                   component={conn(InviteFriendPage)}
                            />

                            <Scene key="recentSkim"
                                   title="最近浏览"
                                   backTitle=""
                                   rightTitle="清空"
                                   onRight={() => {
                                   }}
                                   hideTabBar
                                   component={conn(RecentSkimPage)}
                            />
                        </Scene>
                    </Scene>
                </Scene>

                <Scene key="messages" component={conn(MessagesPage)}
                       hideTabBar
                       title="消息"
                       rightTitle="客服"
                       type={ActionConst.PUSH_OR_POP}
                       onRight={() => alert()}/>
                <Scene key="chat" component={conn(ChatPage)}
                       hideTabBar
                       type={ActionConst.PUSH_OR_POP}
                       getTitle={({params}) => (params ? params.name : '')}
                />

                <Scene key="setting" component={conn(SettingPage)}
                       hideTabBar
                       title="设置"
                />

                <Scene key="qrCode" component={conn(QRCodePage)}
                       hideTabBar
                       title="扫一扫"
                />

                <Scene key="boughtDone"
                       backTitle=""
                       title="预约/购买成功"
                       hideTabBar
                       component={conn(BoughtDonePage)}
                />

                <Scene
                    key="timezoneAndFreeTime"
                    title="时区与空闲时间"
                    backTitle=""
                    hideTabBar
                    component={conn(TimezoneNFreeTimePage)}
                />

            </Scene>
        )
    }
}

const style = StyleSheet.create({
    main: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default conn(Routers);
