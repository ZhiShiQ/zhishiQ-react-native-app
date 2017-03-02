/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {bindActionCreators, applyMiddleware, createStore, compose} from "redux";
import {connect, Provider} from "react-redux";
import multi from "redux-multi";
import thunkMiddleware from "redux-thunk";
import {Router,Scene,Reducer,Actions} from 'react-native-router-flux';
import {
    Dimensions,
    Button,
    StyleSheet,
} from 'react-native';

import Routers from './Routers';
import MyCollectionPage from './pages/MyCollectionPage';
import * as $ from './constant';

const MapStateToProps = (state)  => ({store: state})

const MapDispatchToProps = (dispatch) => ({actions: bindActionCreators(require('./actions').default, dispatch)})

const RouterWithRedux = connect(MapStateToProps, MapDispatchToProps)(Router);

const store = compose(
    applyMiddleware(
        // routerMiddleware(browserHistory),
        multi,
        thunkMiddleware, // 允许我们 dispatch() 函数
    )
)(createStore)(require('./reducers').default);

const scenes = Actions.create(
    <Scene key="myCollection"
           initial
           title="我的收藏"
           hideTabBar
           onRight={() => alert()}
           component={connect(MapStateToProps, MapDispatchToProps)(MyCollectionPage)}
    />
)

export default class extends React.Component {
    extendProps(Component, props) {
        return <Component {...props} {...this.props}/>
    }
    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            this.props.dispatch(action)
            return defaultReducer(state, action);
        };
    }
    renderRouter() {
        return (
            <Router
                scences={scenes}
                createReducer={this.reducerCreate} getSceneStyle={getSceneStyle}
            />
        )
    }

    render() {
        return (
            <Provider store={store} >
                <Routers />
            </Provider>
        )
    }

}

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

