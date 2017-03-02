/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    titleIndex: 0
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_MY_ACTIVE_TOTAL_ORDER_TITLE_INDEX:
            return {...newState, titleIndex: rest.index}
        default:
            return newState;
    }
}
