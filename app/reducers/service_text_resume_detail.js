/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: true,
    isCommentFetching: true,
    isCommentFirst: true,

    isFirst: true,

    base: {
        cover: {},
        clients: 994,
        rate: 4.9,
        reviews: 141
    },

    detail: {
        serviceTitle: "服务方案",

        services: [{
            name: "2018Fall硕士申请",
            price: 160,
            type: "oneStepApply" // 申请
        }, {
            name: "2018Fall本科申请",
            price: 284,
            type: "oneStepApply"
        }, {
            name: "2018Fall博士申请",
            price: 872,
            type: "oneStepApply"
        }],

        teacherInfo: {
            cover: {},
        },
        character: {
            cover: {},
        },
        promise: {
            cover: {},
        },
        process: {
            cover: {},
        },
        offerRank: {
            cover: {},
        }
    },

    comment: {
        total: 113,
        average: 4.9,
        summary: {
            all: 5,
            attitude: 5,
            professional: 5,
            timely: 5
        },
        levels: ['89.6%', '7.8%', '2.5%', '0%'],
        hasMore: true,
        currentPage: 1,
        comments: []
    }
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SERVICE_TEXT_RESUME_SERVICE_DETAIL_ROOT_SET:
            return {...newState, [rest.key]: rest.data};
        case $.SERVICE_TEXT_RESUME_SERVICE_DETAIL_INNER_SET:
            return fromJS(newState).setIn(rest.keys, rest.data).toJS();
        default:
            return newState;
    }
}
