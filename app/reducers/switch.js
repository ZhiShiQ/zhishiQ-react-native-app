/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as CONST from '../constant';

const initialState = {
    text: 'TEXT'
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case CONST.SWITCH_MAIN_TEXT:
            return {...newState, ...rest};
        default:
            return newState;
    }
}