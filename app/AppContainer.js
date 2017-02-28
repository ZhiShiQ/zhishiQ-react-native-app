/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    Actions,
    Modal,
    ActionConst,
    DefaultRenderer,
    Router,
    Reducer,
    Scene
} from 'react-native-router-flux';
import {
    View,
    Text,
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

import TabIcon from './components/TabIcon';
import NavigationDrawer from './components/NavigationDrawer'


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
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
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
        const {extendProps} = this;
        const {store, actions} = this.props;

        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene key="login" component={(props) => <LoginPage {...props} {...this.props}/>} title="Login"
                       type={ActionConst.REPLACE}/>
                <Scene initial key="tabbar" component={(props) => <NavigationDrawer {...props} {...this.props} />}>
                    <Scene
                        key="tab_main"
                        tabs
                        initial
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
                        <Scene initial key="tab_mine_main" title="我的"
                               hideBackImage hideTabBar
                               icon={TabIcon}>
                            <Scene key="tab_mine" component={extendProps.bind(this, MinePage)} title="我的"
                                   navigationBarStyle={{borderBottomColor: 'transparent'}}
                                   onLeft={() => alert()}
                                   hideTabBar={false}
                                   leftTitle="设置"
                                   onRight={() => alert()}
                                   rightTitle="消息"/>
                            <Scene key="totalOrder" component={extendProps.bind(this, TotalOrderPage)} title="所有服务"
                                   backTitle="返回"/>
                            <Scene key="myInformation_main"
                                   initial
                                   backTitle="返回">
                                <Scene
                                    key="myInformation"
                                    title="我的资料"
                                    rightTitle="网页版"
                                    onRight={() => alert()}
                                    component={extendProps.bind(this, MyInformationPage)}
                                />
                                <Scene
                                    key="myBasicInfo_main"
                                    title="基本资料"
                                    backTitle="返回"
                                    hideTabBar
                                >
                                    <Scene
                                        key="myBasicInfo"
                                        component={extendProps.bind(this, MyBasicInfoPage)}
                                    />
                                    <Scene
                                        title="当前院校"
                                        backTitle="取消"
                                        onRight={()=>alert()}
                                        rightTitile="确定"
                                        key="setMySchool"
                                        component={extendProps.bind(this, SetSchoolPage)}
                                    />
                                </Scene>
                                <Scene initial hideTabBar backTitle="取消" title="考试" key="examination_main">
                                    <Scene
                                        key="examination"
                                        rightTitle="添加"
                                        onRight={() => alert(1)}
                                        component={extendProps.bind(this, ExaminationPage)}
                                    />
                                    <Scene
                                        initial
                                        key="examinationDetail"
                                        rightTitle="确认"
                                        onRight={() => alert(1)}
                                        component={extendProps.bind(this, ExaminationDetailPage)}
                                    />
                                </Scene>
                            </Scene>
                        </Scene>

                    </Scene>

                </Scene>

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
