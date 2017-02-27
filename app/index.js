/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {bindActionCreators, applyMiddleware, createStore} from "redux";
import {connect, Provider} from "react-redux";
import multi from "redux-multi";
import thunkMiddleware from "redux-thunk";
import AppContainer from './AppContainer'


const store = createStore(
    require('./reducers').default,
    applyMiddleware(
        // routerMiddleware(browserHistory),
        multi,
        thunkMiddleware, // 允许我们 dispatch() 函数
    )
);

export default class extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <AppContainer />
            </Provider>
        )
    }

}