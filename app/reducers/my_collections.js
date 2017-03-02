/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    activeIndex: 0
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_MY_ACTIVE_COLLECTION_TAB:
            alert("reducer"+rest.index)
            return {...newState, activeIndex: rest.index};
        default:
            return newState;
    }
}
