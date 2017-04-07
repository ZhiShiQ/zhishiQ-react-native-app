/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    titleIndex: 0,

    isFetching: false,
    isRefreshing: false,
    hasMore: true,

    items: [{
        title: 'sds', thumbnail: {},
        state: 'ing', prompt: '2016-09-12', disCount: 300,
        price: 99999,
        content: 'CONTENT',
        onPress: null, onBtnPress: null, btnDisabled: true
    }, {
        title: 'sds', thumbnail: {},
        state: 'ing', prompt: '2016-09-12', disCount: 300,
        price: 99999, content: 'CONTENT'
    }, {
        title: 'sds', thumbnail: {},
        state: 'wait', prompt: '2016-09-12', disCount: 300,
        price: 99999, content: 'CONTESss', onBtnPress: () => {
            actions.setRefererTarget("target");
            actions.refererModalOpen();
        }
    }]
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
