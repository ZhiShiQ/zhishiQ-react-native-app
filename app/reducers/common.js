/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    openModal: false,
    modalType: 'referer'
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_COMMON_MODAL_OPEN:
            return {...newState, openModal: rest.isOpen}
        case $.SET_COMMON_MODAL_TYPE:
            return {...newState, modalType: rest._type}
        default:
            return newState;
    }
}
