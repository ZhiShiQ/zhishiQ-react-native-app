/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,
    firstMount: true,
    currentPage: 1,
    hasMore: true,

    messages: [{
        time: '12月20号12:12',
        content: '内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容',
        name: 'Ethan Andrews',
        avatar: {},
        active: true,
    }, {
        time: '12月20号12:12',
        content: '内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容',
        name: 'Ethan Andrews',
        avatar: {},
    }, {
        time: '12月20号12:12',
        content: '内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容内容是什么内容是什么内容是什么内容内容',
        name: 'Ethan Andrews',
        avatar: {},
    }]
};

export default function (state=initialState, action) {
    let newState = fromJS(state);
    const {type, ...rest} = action;
    switch (type) {
        default:
            return newState.toJS();
    }
}
