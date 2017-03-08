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
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import autobind from 'autobind-decorator';

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
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import * as $ from './constant';
import {BACK_ICON} from './helpers/resource';

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

    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            this.props.__dispatch(action)
            return defaultReducer(state, action);
        };
    }

    static propTypes = {
        __dispatch: React.PropTypes.func,
    };


    _mapModalProps() {
        const {store: {common: {openModal, modalType}}, actions} = this.props;
        switch (modalType) {
            case 'referer':
                return {buttons: [{title: "已打开网址，点击扫描"}], height: 442};
            case 'discount':
                return {buttons: [{title: "查看我的优惠券"}, {title: "取消／确定"}], height: 470}
            case 'abroadExpert':
                return {
                    buttons: [{
                        title: "确定",
                        onPress: () => {
                            actions.setCommonModalIsOpen(false);
                            Actions.orderConfirm();
                        }
                    }], height: 440
                }
            case 'simplePay':
                return {buttons: [], height: 300}
        }
    }

    _renderModal() {
        const {store: {common: {openModal, modalType}}, actions} = this.props;
        return (
            <Modal
                isOpen={openModal}
                onClosed={() => actions.setCommonModalIsOpen(false)}
                {...this._mapModalProps()}
            >
                {
                    modalType === 'referer' &&
                    <CirImageWithText
                        size={120}
                        text={['亲爱的用户，可用电脑浏览器打开网址', '进行更多操作哦：', 'address']}
                    />
                }
                {modalType === 'discount' && <Text>我的优惠券</Text>}
                {modalType === 'abroadExpert' && this.abroadExpertForm}
                {modalType === 'simplePay' && this.simplePlay}
            </Modal>
        )
    }

    get simplePlay() {
        return (
            <View style={{alignItems: 'center', backgroundColor: '#fff', flex: 1}}>
                <Text style={{marginBottom: 8, marginTop: 35, fontSize: 17, fontWeight: 'bold', color: '#4a4a4a'}}>感谢您选择
                    芝士圈留学 的服务！</Text>
                <Text style={{marginBottom: 13.5, fontSize: 12, color: '#a1a1a1'}}>PO号码：<Text selectable>PO12345</Text></Text>
                <Text style={{marginBottom: 2, fontSize: 14, color: '#4a4a4a'}}>订单总价：</Text>
                <Text style={{marginBottom: 28.5, fontSize: 16, color: '#ea5502'}}>￥532.00 RMB</Text>
                <Hr marginBottom={0} style={{alignSelf: 'stretch'}} borderColor={"#e5e5e5"}/>
                <LinkItem onPress={null} showBorder={""} style={{paddingHorizontal: $.PADDING_SIZE, paddingVertical: 4}}
                          leftComponent={<HrFlexLayout style={{alignItems: 'center'}}><CirImage style={{marginRight: 12}}
                              size={32}/><Text>微信支付</Text></HrFlexLayout>} borderColor={"#e5e5e5"}/>
                <Hr marginBottom={0} style={{alignSelf: 'stretch', marginHorizontal: $.PADDING_SIZE}}/>
                <LinkItem onPress={null} showBorder={""} style={{paddingHorizontal: $.PADDING_SIZE, paddingVertical: 4}}
                          leftComponent={<HrFlexLayout style={{alignItems: 'center'}}><CirImage style={{marginRight: 12}}
                              size={32}/><Text>支付宝支付</Text></HrFlexLayout>}/>
                <Hr marginBottom={0} style={{alignSelf: 'stretch', marginHorizontal: $.PADDING_SIZE}}/>
            </View>
        )
    }

    get abroadExpertForm() {
        const {
            store: {
                common: {
                    abroadExpertForm: {
                        items, index, name
                    }
                }
            }, actions
        } = this.props;
        return (
            <View style={{marginTop: 20}}>
                <View style={{alignItems: 'center'}}>
                    <CirImage size={100} source={{}}/>
                    <Text style={{fontSize: 18, fontWeight: '600', marginTop: 6}}>{name}</Text>
                </View>

                <ScrollView style={{marginTop: 20}}>
                    {
                        items.map((x, i) => (
                            <TouchableHighlight
                                style={{marginVertical: 6, marginHorizontal: 15, borderRadius: 6, overflow: 'hidden'}}
                                onPress={() => {
                                    actions.abroadExpertFormModalSelect(i);
                                }}
                            >
                                <View style={[{
                                    padding: 10
                                }, i == index ? {backgroundColor: '#fc6d34'} : {
                                        backgroundColor: '#fafafa',
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor: '#e5e5e5'
                                    }]}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={[i == index ? {color: '#fff'} : {}]}>{x.leftText}</Text>
                                        </View>
                                        <View style={{flex: 0, marginLeft: 15}}>
                                            <Text style={[i == index ? {color: '#fff'} : {}]}>{x.rightText}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>)
                        )
                    }
                </ScrollView>
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
        return (
            <Scene key="Root" backButtonImage={backIcon} navigationBarStyle={styles.navigationBarStyle}>
                <Scene hideTabBar key="entry" component={conn(EntryPage)} title={TITLE}/>

                <Scene key="resetPwdByPhone" component={conn(ResetPwdByPhonePage)} title={'重置密码'}/>
                <Scene key="resetPwdByMail" component={conn(ResetPwdByMailPage)} title={'重置密码'}/>
                <Scene initial key="tabbar" component={conn(NavigationDrawer)}>
                    <Scene
                        initial
                        key="tab_main"
                        tabs
                        backButtonImage={backIcon}
                        tabBarIconContainerStyle={{height: $.TAB_BAR_HEIGHT}}
                        tabBarStyle={[styles.tabBarStyle, {height: $.TAB_BAR_HEIGHT}]}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                        <Scene key="search" component={conn(SearchPage)}
                               navigationBarStyle={styles.navigationBarStyle}
                               title="我是输入框"
                               backTitle="取消"
                        />

                        <Scene backButtonImage={backIcon} initial key="tab_home_main"
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
                        </Scene>
                        <Scene backButtonImage={backIcon} key="tab_service_main" navigationBarStyle={styles.navigationBarStyle}
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
                                   onRight={() => alert()}/>
                            <Scene key="abroadExpertDetail" component={conn(AbroadExpertDetailPage)}
                                   hideTabBar
                                   type={ActionConst.PUSH_OR_POP}
                                   getTitle={({params}) => (params ? params.title : '')}
                                   rightTitle="分享"
                                   onRight={() => alert()}/>
                            <Scene key="foreignTeacher" component={conn(ForeignTeacherPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="外籍文书顾问"
                                   rightTitle="搜索"
                                   onRight={() => alert()}
                                   backTitle=""/>

                            <Scene key="foreignTeacherDetail" component={conn(ForeignTeacherDetailPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title=""
                                   rightTitle="分享"
                                   onRight={() => alert()}
                            />

                            <Scene key="orderConfirm" component={conn(OrderConfirmPage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="确认订单"
                            />
                            <Scene key="serviceClause" component={conn(ServiceClausePage)}
                                   type={ActionConst.PUSH_OR_POP}
                                   hideTabBar
                                   title="服务条款"
                            />
                        </Scene>
                        <Scene key="tab_cart" component={conn(CartPage)} title="购物车"
                               navigationBarStyle={styles.navigationBarStyle}
                               onRight={() => alert()}
                               rightTitle="编辑"
                               iconName={"cart"}
                               icon={TabIcon}/>
                        <Scene key="tab_mine_main" title="我的"
                               iconName={"mine"}
                               navigationBarStyle={styles.navigationBarStyle}
                               icon={TabIcon}>
                            <Scene key="tab_mine" component={conn(MinePage)} title="我的"
                                   navigationBarStyle={{borderBottomColor: 'transparent'}}
                                   onLeft={() => alert()}
                                   hideTabBar={false}
                                   leftTitle="设置"
                                   onRight={() => alert()}
                                   rightTitle="消息"/>
                            <Scene key="totalOrder" component={conn(TotalOrderPage)}
                                   hideTabBar
                                   getTitle={(p) => {
                                       const ConnectedDrop = conn(ReduxTitleDropdown);
                                       return <ConnectedDrop {...p} />
                                   }}/>
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
                                key="timezoneAndFreeTime"
                                titile="时区与空闲时间"
                                backTitle=""
                                component={conn(TimezoneNFreeTimePage)}
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
                       title="消息"
                />


                <Scene key="boughtDone"
                       backTitle=""
                       title="预约/购买成功"
                       hideTabBar
                       component={conn(BoughtDonePage)}
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
