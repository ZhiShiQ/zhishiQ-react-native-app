/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,
    firstMount: true,
    currentPage: 1,
    totalPage: 10,
    hasMore: true,

    filters: {
        nationSelectedIndex: 0,

        domainSelectedIndex: 0,
        domainSubSelectedIndex: 0,

        degreeSelectedIndex: 0,
        sortSelectedIndex: 0,
        waySelectedIndex: 0,

        nationTitle: '地区',
        domainTitle: '专业',
        degreeTitle: '学位',
        sortTitle: '排序',


        orders: [{
            title: "综合排序",
            id: 'ranking_score'
        }, {
            title: "评分最高",
            id: 'review_rate'
        }, {
            title: "服务次数最多",
            id: 'service_count:desc'
        }, {
            title: '价格从高到低',
            id: 'price:desc'
        }, {
            title: '价格从低到高',
            id: 'price:asc'
        }],

        // 专业
        domains: [],
        nations: [],
        degrees: [],

        ways: [{
            id: -1,
            title: '所有'
        }, {
            id: 3,
            title: '备考'
        }, {
            id: 6,
            title: '背景提升',
        }, {
            id: 9,
            title: '选校'
        }, {
            title: '网申',
            id: 4
        }, {
            title: '面试',
            id: 8
        }, {
            title: '签证',
            id: 2
        }, {
            title: '求职',
            id: 10
        }, {
            title: '生活',
            id: 11
        }, {
            title: '其他',
            id: 12
        }]
    },

    list: []
};

export default function (state=initialState, action) {
    let newState = fromJS(state);
    const {type, ...rest} = action;
    switch (type) {
        case $.ABROAD_EXPERT_FETCHING_SET:
            return newState.set('isFetching', rest.fetching).toJS();
        case $.ABROAD_EXPERT_HAS_MORE_SET:
            return newState.set('hasMore', rest.hasMore).toJS();
        case $.ABROAD_EXPERT_FIRST_SET:
            return newState.set('firstMount', rest.first).toJS();
        case $.ABROAD_EXPERT_CURRENT_SET:
            return newState.set('currentPage', rest.current).toJS();
        case $.ABROAD_EXPERT_FILTER_SET:
            if (rest.filters)
                return newState.mergeIn(['filters'], rest.filters).toJS();
            else
                return newState.mergeIn(['filters'], rest).toJS();
        case $.ABROAD_EXPERT_LIST_SET:
            return newState.set('list', rest.list).toJS();
        case $.ABROAD_EXPERT_LIST_APPEND:
            return newState.update('list', list => List(list).concat(rest.list) ).toJS()
        default:
            return newState.toJS();
    }
}
