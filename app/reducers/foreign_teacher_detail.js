/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: true,
    isCommentFetching: true,
    isCommentFirst: true,
    isFullFetch: false,

    base: {
        avatar: {uri: ""},
        name: "",
        brief: "",
        tags: [],
        clients: 994,
        rate: 4.9,
        reviews: 141
    },

    detail: {
        educations: [],
        experiences: [],
        summary: '',
        description: '',
        services: []
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
        case $.FOREIGN_TEACHER_DETAIL_FETCHING_SET:
            return fromJS(newState).set('isFetching', rest.fetching).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_FETCHING_SET:
            return fromJS(newState).set('isCommentFetching', rest.fetching).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_AVERAGE_SET:
            return fromJS(newState).setIn(['comment', 'average'], rest.average).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_LEVELS_SET:
            return fromJS(newState).setIn(['comment', 'levels'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_SUMMARY_SET:
            return fromJS(newState).setIn(['comment', 'summary'], rest.summary).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_TOTAL_SET:
            return fromJS(newState).setIn(['comment', 'total'], rest.total).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENTS_SET:
            if (!rest.append)
                return fromJS(newState).setIn(['comment', 'comments'], rest.list).toJS();
            else {
                var o = fromJS(newState).setIn(['comment', 'comments'], fromJS(newState.comment.comments).push(...rest.list) ).toJS();
                return o;
            }
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_HASMORE_SET:
            return fromJS(newState).setIn(['comment', 'hasMore'], rest.hasmore).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_CURR_SET:
            return fromJS(newState).setIn(['comment', 'currentPage'], rest.current).toJS();
        case $.FOREIGN_TEACHER_DETAIL_BASE_SET:
            return fromJS(newState).mergeIn(['base'], rest.base).toJS();
        case $.FOREIGN_TEACHER_DETAIL_SUMMARY_SET:
            return fromJS(newState).setIn(['detail', 'summary'], rest.summary).toJS();
        case $.FOREIGN_TEACHER_DETAIL_DESCRIPTION_SET:
            return fromJS(newState).setIn(['detail', 'description'], rest.description).toJS();
        case $.FOREIGN_TEACHER_DETAIL_EDUC_SET:
            return fromJS(newState).setIn(['detail', 'educations'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_EXPERIENCE_SET:
            return fromJS(newState).setIn(['detail', 'experiences'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_SERVICES_SET:
            return fromJS(newState).setIn(['detail', 'services'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_FIRST_SET:
            return fromJS(newState).set('isCommentFirst', rest.first).toJS();
        case $.ABROAD_EXPERT_FULL_FETCHING_SET:
            return fromJS(newState).set('isFullFetch', rest.isFullFetch).toJS();
        default:
            return newState;
    }
}
