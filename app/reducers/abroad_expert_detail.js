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
        content: "2016.9 - 2017.7 ESSEC Business School, Master of Finance; 2016.1 - 2016.4 ESC Rennes, Exchange student; 2012.9 - 2016.7 Nankai University, Bachelor of Economics",
        tags: ['文书导师', '全套文书导师', '一站式申请'],
        appointNum: 400,
        average: 4.5,
        commentNum: 112
    },

    detail: {
        intro: ["研究生申请，我也曾同你一样一筹莫展。在面对把哥大统计当做金字招牌大肆宣传自己水平的中介时，在面对范文中把calculus-based",
            "probabilty当做calculus +",
            "probabilty得文书机构时，我选择了相信自己。不靠论坛上流传的空穴来风，不轻信所谓前辈的内幕消息，运用逻辑来分析申请中得每一个环节和条件，通过教授的论文了解录取委员会的预期。一年前我以3.66总体水平一般的GPA，克服了单学期GPA1.77，缺少实习的不利条件，进入哈佛大学，同时也取得了录取率只有6%",
            "NYU金融数学的青睐。我相信，申请的重点在于发挥长处突出自身和项目的契合。我对MFE, Data Science各个主流项目都有较深入的了解，对于文书的结构和内容也…"].join('\n'),
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
        case $.ABROAD_EXPERT_DETAIL_BASE_SET:
            return fromJS(newState).set('base', rest.base).toJS();
        case $.ABROAD_EXPERT_DETAIL_COMMENT_COMMENTS_SET:
            return fromJS(newState).setIn(['comment', 'comments'], rest.comments).toJS();
        default:
            return newState;
    }
}
