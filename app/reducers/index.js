/**
 * Created by moyu on 2017/2/26.
 */
import {combineReducers} from "redux";
export default combineReducers({
    switch: require('./switch').default,
    service: require('./service').default,
    cart: require('./cart').default
})