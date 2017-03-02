/**
 * Created by moyu on 2017/2/26.
 */
import {combineReducers} from "redux";
import routes from './routes';


export default combineReducers({
    routes,
    service: require('./service').default,
    cart: require('./cart').default,
    mine: require('./mine').default,
    my_collections: require('./my_collections').default
})
