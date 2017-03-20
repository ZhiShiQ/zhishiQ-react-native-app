/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    phone: '',
    verify: '',
    newPwd: '',
    confirmPwd: ''
};

export default function (state=initialState, action) {
    let newState = fromJS(state);
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_RESET_PWD_BY_PHONE:
            return newState.merge(rest).toJS();
        default:
            return newState.toJS();
    }
}
