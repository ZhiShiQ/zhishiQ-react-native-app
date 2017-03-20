/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    id: -1,
    topic: '',
    price: '',
    want: '',
    qq: '',
    skype: '',
    freeTime: ''
};

export default function (state=initialState, action) {
    let newState = fromJS(state);
    const {type, ...rest} = action;
    switch (type) {
        case $.ORDER_CONFIRM_ROOT_SET:
            return newState.merge(rest).toJS();
        default:
            return newState.toJS();
    }
}
