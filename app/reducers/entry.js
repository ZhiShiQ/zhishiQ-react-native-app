/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    activeIndex: 'login',
    isChecked: false,
    reg: {
        phone: '',
        verify: '',
        pwd: '',
        src: '',

        isVerifySent: false,
        leftSecond: 60,
        isFetching: false
    },
    login: {
        user: "13240261691",
        pwd: '111111',

        isFetching: false
    }
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_ENTRY_ROOT:
            return fromJS(newState).setIn(rest.keys, rest.data).toJS();
        case $.SET_ENTRY_ACTIVE_INDEX:
            return {...newState, activeIndex: rest.index}
        case $.SET_ENTRY_REG:
            return {...newState, reg: {...newState.reg, ...rest}}
        case $.SET_ENTRY_LOGIN:
            return {...newState, login: {...newState.login, ...rest}}
        default:
            return newState;
    }
}
