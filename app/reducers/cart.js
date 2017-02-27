/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    items: [{
        title: 'VIP文书辅导 ID:99999',
        content: 'VIP、3个项目、金融学、Abby R',
        price: 99999,
        prompt: '使用优惠券',
        thumbnail: {}
    }, {
        title: '行家咨询 ID:3369',
        content: '10分钟免费墨尔本大学行前指导 Free 10-minute guidance for new unimelb students',
        price: 99999,
        prompt: '已惠券200元',
        thumbnail: {}
    }, {
        title: '模拟面试服务 ID:3195',
        content: '金融学、咨询、Andy D',
        price: 88,
        prompt: '使用优惠券',
        thumbnail: {}
    }],
    selectedNum: 0,
    save: 900,
    sum: 999999
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.CART_SELECT_ITEM:

        default:
            return newState;
    }
}