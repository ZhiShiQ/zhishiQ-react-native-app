/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import {UpdateAllList} from '../helpers/reducer-helper';
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
        save: 200,
        thumbnail: {}
    }, {
        title: '模拟面试服务 ID:3195',
        content: '金融学、咨询、Andy D',
        price: 88,
        prompt: '使用优惠券',
        thumbnail: {}
    }, {
        title: 'VIP文书辅导 ID:99999',
        content: 'VIP、3个项目、金融学、Abby R',
        price: 99999,
        prompt: '使用优惠券',
        thumbnail: {}
    }, {
        title: '行家咨询 ID:3369',
        content: '10分钟免费墨尔本大学行前指导 Free 10-minute guidance for new unimelb students',
        price: 99999,
        save: 200,
        thumbnail: {}
    }, {
        title: '模拟面试服务 ID:3195',
        content: '金融学、咨询、Andy D',
        price: 88,
        prompt: '使用优惠券',
        thumbnail: {}
    }]
};

export default function (state=initialState, action) {
    let newState = fromJS(state);
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_CART_ITEM_SELECTED_BY_INDEX:
            return newState.setIn(['items', rest.index, 'selected'], rest.selected).toJS();
        case $.DEL_CART_ITEM_BY_INDEX:
            return newState.removeIn(['items', rest.index]).toJS();
        case $.SET_ALL_CART_ITEM_SELECTED:
            return newState.updateIn(['items'], list => List(list).map(x => Map(x).set('selected', rest.selected))).toJS();
        default:
            return newState.toJS();
    }
}
