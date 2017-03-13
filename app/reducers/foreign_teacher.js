/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,
    isCommentFetching: false,
    firstMount: true,
    currentPage: 1,
    totalPage: 10,
    hasMore: true,

    filters: {
        prices: [],
        domains: []
    },

    filterZone: [{
        title: "地区1"
    }, {
        title: "地区2"
    }, {
        title: "地区3"
    }, {
        title: "地区4"
    }, {
        title: "地区5"
    }, {
        title: "地区6"
    }],


    filterPro: [{
        val: "1-1",
        title: "商学与管理",
        categories: [{
            val: "1-1-1",
            title: "管理学"
        }, {
            title: "金融学"
        }, {
            title: "会计学"
        }, {
            title: "金融工程"
        }, {
            title: "市场营销学"
        }, {
            title: "创业学"
        }]
    }, {
        title: "BBBB"
    }, {
        title: "AAAA"
    }, {
        title: "BBBB"
    }, {
        title: "AAAA"
    }, {
        title: "BBBB"
    }],


    list: []
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.FOREIGN_TEACHER_FETCHING_SET:
            return {...newState, isFetching: rest.fetching};
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_FETCHING_SET:
            return {...newState, isCommentFetching: rest.fetching};
        case $.FOREIGN_TEACHER_HAS_MORE_SET:
            return {...newState, hasMore: rest.hasMore};
        case $.FOREIGN_TEACHER_FIRST_SET:
            return {...newState, firstMount: rest.first};
        case $.FOREIGN_TEACHER_CURRENT_SET:
            return {...newState, currentPage: rest.current};
        case $.FOREIGN_TEACHER_FILTER_SET:
            return {...newState, filters: rest.filters};
        case $.FOREIGN_TEACHER_LIST_SET:
            return {...newState, list: rest.list};
        case $.FOREIGN_TEACHER_LIST_APPEND:
            return {...newState, list: fromJS(newState.list).push(...rest.list).toJS()};
        default:
            return newState;
    }
}
