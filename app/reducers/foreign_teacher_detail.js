/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,

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
        intro: ["I am a public health, pharmaceutical, health economics, and outcomes researcher based in Los Angeles, California with many years of experience mentoring students applying to undergraduate and graduate programs (incluing reviewing and editing numerous applications and personal essays). Additionally, I have many years of experience in writing and editing of scientific journal articles and health policy briefs. My goals are to help you present yourself in the best light possible and to help you succeed in your academic and career aspirations."].join('\n'),
        selfIntro: "Greetings!\n\nI am a public health, pharmaceutical, health economics, and outcomes researcher based in Los Angeles, California. I fairly recently graduated with a PhD from the University of California, Los Angeles (UCLA) Fielding School of Public Health, so I have recent personal history in the hard work that goes into crafting a competitive personal statement, resume/CV, or application essay. I have many years of experience in mentoring students applying to undergraduate and graduate programs in the United States. This experience includes reviewing and editing applications and personal essays for undergraduate and graduate programs. My goal is to make sure that your passion and achievements really shine in your essay or resume/CV and that your application is attractive and competitive to the application committee.",
        educations: [{
            title: "ESSEC Business School",
            status: "Master Finance",
            date_from: "2016-09",
            date_to: "2017-07",
            thumbnail: {}
        }, {
            title: "ESSEC Business School",
            status: "Master Finance",
            date_from: "2016-09",
            date_to: "2017-07",
            thumbnail: {}
        }],
        experiences: [

        ]
    },

    service: {

    },

    comment: {
        total: 113,
        average: 4.9,
        levels: ['89.6%', '7.8%', '2.5%', '0%'],
        comments: [{
            title: '刘泽方 Zephyr Lewis',
            tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
            comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
            time: "2015/11/13 23:21",
            thumbnail: {}
        }, {
            title: '刘泽方 Zephyr Lewis',
            tags: ['会计、审计、金融管理', '留学文书润色 VIP文书辅导'],
            comment: "This is the fourth time that I work with her on my document (in another major). And just several days after submitting the application of one of my dream schools (in my former major), I have received the offer, using the ps and cv that she polished! I really appreciate her work!!!",
            time: "2015/11/13 23:21"
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
        case $.FOREIGN_TEACHER_DETAIL_BASE_SET:
            return fromJS(newState).set('base', rest.base).toJS();
        default:
            return newState;
    }
}
