/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    mail: ''
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_RESET_PWD_BY_MAIL:
            return {...newState, ...rest};
        default:
            return newState;
    }
}
