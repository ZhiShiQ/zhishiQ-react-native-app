/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,
    // isCommentFetching: false,
    firstMount: true,
    currentPage: 1,
    totalPage: 10,
    hasMore: true,

    filters: {
        priceSelectedIndex: 0,

        domainSelectedIndex: 0,
        domainSubSelectedIndex: 0,

        otherSelectedIndex: 0,
        sortSelectedIndex: 0,

        priceTitle: '价格',
        domainTitle: '专业',
        otherTitle: '其它服务',
        sortTitle: '排序',

        others: [{
            title: "不限",
            id: -1
        }, {
            title: "全套文书导师",
            id: 'package_editor'
        }, {
            title: "模拟面试",
            id: 'interviewer'
        }, {
            title: '一站式申请',
            id: 'one_stop'
        }],

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

        prices: [],
        // 专业
        domains: []
    },

    list: []
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.FOREIGN_TEACHER_FETCHING_SET:
            return {...newState, isFetching: rest.fetching};
        case $.FOREIGN_TEACHER_HAS_MORE_SET:
            return {...newState, hasMore: rest.hasMore};
        case $.FOREIGN_TEACHER_FIRST_SET:
            return {...newState, firstMount: rest.first};
        case $.FOREIGN_TEACHER_CURRENT_SET:
            return {...newState, currentPage: rest.current};
        case $.FOREIGN_TEACHER_FILTER_SET:
            if (rest.filters)
                return {...newState, filters: {...newState.filters, ...rest.filters}};
            else
                return {...newState, filters: {...newState.filters, ...rest}};
        case $.FOREIGN_TEACHER_LIST_SET:
            return {...newState, list: rest.list};
        case $.FOREIGN_TEACHER_LIST_APPEND:
            return {...newState, list: fromJS(newState.list).push(...rest.list).toJS()};
        default:
            return newState;
    }
}
