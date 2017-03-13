/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: true,
    isCommentFetching: true,
    isCommentFirst: true,

    base: {
        avatar: {uri: ""},
        name: "November M",
        brief: "Public Health and Health Economics Researcher",
        tags: ['文书导师', '全套文书导师', '一站式申请'],
        clients: 994,
        rate: 4.9,
        reviews: 141
    },

    detail: {
        educations: [{
            school_name: "ESSEC Business School",
            degree: "Master",
            major: "IT",
            from_date: "2016-09",
            to_date: "2017-07",
            description: "",
            thumbnail: ""
        }],
        experiences: [

        ],

        services: []

    },

    comment: {
        total: 113,
        average: 4.9,
        levels: ['89.6%', '7.8%', '2.5%', '0%'],
        hasMore: true,
        currentPage: 1,
        comments: [{
            title: '刘泽方 Zephyr Lewis',
            tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
            comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
            time: "2015/11/13 23:21",
            thumbnail: {uri: 'https://facebook.github.io/react-native/img/header_logo.png'}
        }, {
            title: '刘泽方 Zephyr Lewis',
            tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
            comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
            time: "2015/11/13 23:21",
            thumbnail: {uri: 'http://blog.moyuyc.xyz/head.jpg'}
        }, {
            title: '刘泽方 Zephyr Lewis',
            tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
            comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
            time: "2015/11/13 23:21"
        }]
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
        case $.FOREIGN_TEACHER_DETAIL_COMMENTS_SET:
            return fromJS(newState).setIn(['comment', 'comments'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_HASMORE_SET:
            return fromJS(newState).setIn(['comment', 'hasMore'], rest.hasmore).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_CURR_SET:
            return fromJS(newState).setIn(['comment', 'currentPage'], rest.current).toJS();
        case $.FOREIGN_TEACHER_DETAIL_BASE_SET:
            return fromJS(newState).set('base', rest.base).toJS();
        case $.FOREIGN_TEACHER_DETAIL_EDUC_SET:
            return fromJS(newState).setIn(['detail', 'educations'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_EXPERIENCE_SET:
            return fromJS(newState).setIn(['detail', 'experiences'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_SERVICES_SET:
            return fromJS(newState).setIn(['detail', 'services'], rest.list).toJS();
        case $.FOREIGN_TEACHER_DETAIL_COMMENT_FIRST_SET:
            return fromJS(newState).set('isCommentFirst', rest.first).toJS();
        default:
            return newState;
    }
}
