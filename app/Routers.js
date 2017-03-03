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
    Text,
    Dimensions,
    Button,
    StyleSheet,
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

import TabIcon from './components/TabIcon';
import NavigationDrawer from './components/NavigationDrawer';
import Modal from './components/Modal';
import LinkItems from './components/LinkItems';
import CirImageWithText from './components/CirImageWithText';
import ReduxTitleDropdown from './components/ReduxTitleDropdown';

import * as $ from './constant';

const MapStateToProps = (state) => ({store: state})
const MapDispatchToProps = (dispatch) => ({
    __dispatch: dispatch,
    actions: bindActionCreators(require('./actions').default, dispatch)
})
const conn = (Component) => connect(MapStateToProps, MapDispatchToProps)(Component)

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
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
                return {buttons: [{title: "预约！",
                    onPress: () => {
                        actions.setCommonModalIsOpen(false);
                        Actions.boughtDone();
                    }
                }], height: 340}
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
                {
                    modalType === 'discount' && <Text>我的优惠券</Text>
                }
                {
                    modalType === 'abroadExpert' && this.abroadExpertForm
                }
            </Modal>
        )
    }

    get abroadExpertForm() {
        return (
            <View>
                <Text>表单</Text>
                <LinkItems
                    items={[{
                        leftText: "姓名"
                    }, {
                        leftText: "年龄"
                    }, {
                        leftText: "性别"
                    }]}
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
        return (
            <Scene key="Root">
                <Scene hideTabBar key="login" component={conn(LoginPage)} title="Login"
                       type={ActionConst.REPLACE}/>
                <Scene type={ActionConst.RESET} initial key="tabbar" component={conn(NavigationDrawer)}>
                    <Scene
                        initial
                        key="tab_main"
                        tabs
                        type={ActionConst.RESET}
                        tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                        <Scene key="tab_home" component={conn(HomePage)}
                               title="首页"
                               navigationBarStyle={{}}
                               titleStyle={{}}
                               onLeft={(a) => alert(JSON.stringify(a))}
                               leftTitle="搜索"
                               onRight={(a) => alert(JSON.stringify(a))}
                               rightTitle="消息"
                               icon={TabIcon}/>
                        <Scene initial key="tab_service" component={conn(ServicePage)}
                               rightTitle="消息"
                               onRight={() => alert()}
                               title="服务" icon={TabIcon}/>
                        <Scene key="tab_cart" component={conn(CartPage)} title="购物车"
                               onRight={() => alert()}
                               rightTitle="编辑"
                               icon={TabIcon}/>
                        <Scene key="tab_mine_main" title="我的"
                               icon={TabIcon}>
                            <Scene key="tab_mine" component={conn(MinePage)} title="我的"
                                   navigationBarStyle={{borderBottomColor: 'transparent'}}
                                   onLeft={() => alert()}
                                   hideTabBar={false}
                                   leftTitle="设置"
                                   onRight={() => alert()}
                                   rightTitle="消息"/>
                        </Scene>

                    </Scene>
                </Scene>

                <Scene key="totalOrder" component={conn(TotalOrderPage)}
                       hideTabBar
                       getTitle={(p) => {
                           const ConnectedDrop = conn(ReduxTitleDropdown);
                           return <ConnectedDrop {...p} />
                       }}
                       backTitle="返回"/>

                <Scene key="foreignTeacher" component={conn(ForeignTeacherPage)}
                       hideTabBar
                       title="外籍文书顾问"
                       rightTitle="搜索"
                       onRight={() => alert()}
                       backTitle="返回"/>

                <Scene key="abroadExpert" component={conn(AbroadExpertPage)}
                       hideTabBar
                       title="留学行家咨询"
                       rightTitle="搜索"
                       onRight={() => alert()}
                       backTitle="返回"/>

                <Scene key="abroadExpertDetail" component={conn(AbroadExpertDetailPage)}
                       hideTabBar
                       getTitle={({params}) => (params ? params.title : '')}
                       rightTitle="分享"
                       onRight={() => alert()}
                       backTitle="返回"/>

                <Scene key="myInformation"
                       backTitle="返回"
                       title="我的资料"
                       hideTabBar
                       rightTitle="网页版"
                       onRight={() => alert()}
                       component={conn(MyInformationPage)}
                />

                <Scene key="boughtDone"
                       backTitle="返回"
                       title="预约/购买成功"
                       hideTabBar
                       component={conn(BoughtDonePage)}
                />


                <Scene
                    title="留学意向"
                    backTitle="返回"
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
                    backTitle="返回"
                    key="wayOfContact"
                    titile="联系方式"
                    component={conn(WayOfContactPage)}
                />
                <Scene
                    key="timezoneAndFreeTime"
                    titile="时区与空闲时间"
                    backTitle="返回"
                    component={conn(TimezoneNFreeTimePage)}
                />
                {/*<Scene*/}
                    {/*key="myBasicInfo_main"*/}
                    {/*hideTabBar*/}
                {/*>*/}
                <Scene
                    title="基本资料"
                    backTitle="返回"
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
                {/*</Scene>*/}


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
                       backTitle="返回"
                       hideTabBar
                       component={conn(RecentSkimPage)}
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
