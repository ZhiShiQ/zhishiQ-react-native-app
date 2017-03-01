/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
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

import TabIcon from './components/TabIcon';
import NavigationDrawer from './components/NavigationDrawer';
import TitleDropdown from './components/TitleDropdown';
import Modal from './components/Modal';
import CirImageWithText from './components/CirImageWithText';

import * as $ from './constant';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

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


@autobind
class AppContainer extends React.Component {
    extendProps(Component, props) {
        return <Component {...props} {...this.props}/>
    }

    render() {
        const {store, actions} = this.props;

        return (
            <View style={{flex: 1}}>
                {this._renderRouter()}
                {/*公用组件放路由下面*/}
                {this._renderModal()}
            </View>
        )
    }

    _renderModal() {
        const {extendProps, store, actions} = this;

        return (
            <Modal
                isOpen={false}
                buttons={[{
                    title: "已打开网址，点击扫描"
                }]}
                onClose={() => {}}
                height={442}
            >
                <CirImageWithText
                    size={120}
                    text={['亲爱的用户，可用电脑浏览器打开网址', '进行更多操作哦：', 'address']}
                />
            </Modal>
        )
    }

    _renderRouter() {
        const {extendProps} = this;
        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene hideTabBar key="login" component={(props) => <LoginPage {...props} {...this.props}/>} title="Login"
                       type={ActionConst.REPLACE}/>
                <Scene key="tabbar" component={(props) => <NavigationDrawer {...props} {...this.props} />}>
                    <Scene
                        key="tab_main"
                        tabs
                        tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                        <Scene key="tab_home" component={extendProps.bind(this, HomePage)}
                               title="首页"
                               navigationBarStyle={{}}
                               titleStyle={{}}
                               onLeft={(a) => alert(JSON.stringify(a))}
                               leftTitle="搜索"
                               onRight={(a) => alert(JSON.stringify(a))}
                               rightTitle="消息"
                               icon={TabIcon}/>
                        <Scene key="tab_service" component={extendProps.bind(this, ServicePage)}
                               rightTitle="消息"
                               onRight={() => alert()}
                               title="服务" icon={TabIcon}/>
                        <Scene key="tab_cart" component={extendProps.bind(this, CartPage)} title="购物车"
                               onRight={() => alert()}
                               rightTitle="编辑"
                               icon={TabIcon}/>
                        <Scene key="tab_mine_main" title="我的"
                               icon={TabIcon}>
                            <Scene key="tab_mine" component={extendProps.bind(this, MinePage)} title="我的"
                                   navigationBarStyle={{borderBottomColor: 'transparent'}}
                                   onLeft={() => alert()}
                                   hideTabBar={false}
                                   leftTitle="设置"
                                   onRight={() => alert()}
                                   rightTitle="消息"/>
                        </Scene>

                    </Scene>
                </Scene>

                <Scene key="totalOrder" component={extendProps.bind(this, TotalOrderPage)}
                       hideTabBar
                       getTitle={() =>
                           <TitleDropdown
                               title="所有服务"
                               onSelect={null}
                               selectedIndex={0}
                               options={[
                                   '所有服务', '单项服务', '一站式申请', '留学行家咨询', '全套文书服务',
                                   '国际快递', '留学文书免费试改', '雅思写作评阅服务', '简历', '学术文章'
                               ]}
                           />
                       }
                       backTitle="返回"/>

                <Scene key="myInformation"
                       backTitle="返回"
                       title="我的资料"
                       hideTabBar
                       rightTitle="网页版"
                       onRight={() => alert()}
                       component={extendProps.bind(this, MyInformationPage)}
                />


                <Scene
                    title="留学意向"
                    backTitle="返回"
                    key="studyAbroadIntention"
                    component={extendProps.bind(this, StudyAbroadIntentionPage)}
                />
                <Scene
                    title="申请学校"
                    backTitle="取消"
                    rightText="确定"
                    onRight={() => {
                    }}
                    key="applySchool"
                    component={extendProps.bind(this, ApplySchoolPage)}
                />
                <Scene
                    backTitle="返回"
                    key="wayOfContact"
                    titile="联系方式"
                    component={extendProps.bind(this, WayOfContactPage)}
                />
                <Scene
                    key="timezoneAndFreeTime"
                    titile="时区与空闲时间"
                    backTitle="返回"
                    component={extendProps.bind(this, TimezoneNFreeTimePage)}
                />
                <Scene
                    key="myBasicInfo_main"
                    hideTabBar
                >
                    <Scene
                        clone
                        title="基本资料"
                        backTitle="返回"
                        key="myBasicInfo"
                        component={extendProps.bind(this, MyBasicInfoPage)}
                    />
                    <Scene
                        title="当前院校"
                        backTitle="取消"
                        onRight={() => alert()}
                        rightTitile="确定"
                        key="setMySchool"
                        component={extendProps.bind(this, SetSchoolPage)}
                    />
                    <Scene
                        title="经历"
                        backTitle="取消"
                        onRight={() => alert()}
                        rightTitile="确定"
                        key="myExperience"
                        component={extendProps.bind(this, MyExperiencePage)}
                    />
                </Scene>
                <Scene
                    backTitle="取消"
                    title="考试" key="examination"
                    rightTitle="添加"
                    onRight={() => alert(1)}
                    component={extendProps.bind(this, ExaminationPage)}
                />
                <Scene
                    getTitle={({params}) => (params ? params.title : '')}
                    key="examinationDetail"
                    rightTitle="确认"
                    onRight={() => alert(1)}
                    component={extendProps.bind(this, ExaminationDetailPage)}
                />

                <Scene key="myCollection"
                       initial
                       title="我的收藏"
                       hideTabBar
                       onRight={() => alert()}
                       component={extendProps.bind(this, MyCollectionPage)}
                />

            </Router>
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

function MapStateToProps(state) {
    return {
        store: state
    }
}

function MapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(require('./actions').default, dispatch)
    }
}


export default connect(
    MapStateToProps,
    MapDispatchToProps
)(AppContainer)
