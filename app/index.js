/**
 * Created by moyu on 2017/2/26.
 */
import React from 'react';
import {bindActionCreators, applyMiddleware, createStore, compose} from "redux";
import {connect, Provider} from "react-redux";
import multi from "redux-multi";
import thunkMiddleware from "redux-thunk";
import {
    Dimensions,
    Button,
    StyleSheet,
} from 'react-native';
import Routers from './Routers';
import * as $ from './constant';

const store = compose(
    applyMiddleware(
        multi,
        thunkMiddleware, // 允许我们 dispatch() 函数
    )
)(createStore)(require('./reducers').default);


export default class extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <Routers />
            </Provider>
        )
    }

}
