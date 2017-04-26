/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    username: "我的用户名",
    avatar: {}
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.MINE_ROOT_SET:
            return {...newState, [rest.key]: rest.data};
        case $.MINE_INNER_SET:
            return fromJS(newState).setIn(rest.keys, rest.data).toJS();
        default:
            return newState;
    }
}
