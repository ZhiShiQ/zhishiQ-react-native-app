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
    my_collections: require('./my_collections').default,
    common: require('./common').default,
    recent_skim: require('./recent_skim').default,
    my_total_order: require('./my_total_order').default,
    basic_info: require('./basic_info').default,
    abroad_intention: require('./abroad_intention').default,
})
