/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: true,

    isFullFetch: false,

    type: "",
    name: '',

    base: {
        description: "提供针对个人陈述/推荐信/简历/小文章等留学文书的点评、语言润色、深度修改、辅导撰写等服务，权威外籍导师一对一个性化指导，助你的文书脱颖而出。"
    },

    detail: {
        items: [{
            title: "语言润色",
            contents: [
                "适用于已有初稿并且希望着重提升语言表达的用户",
                "适用于除简历外所有留学文书",
                "一对一匹配顶级名校外籍老师",
                "1 稿 / 3 天",
                "每一稿完成 3 天内不限留言数",
                "文章压缩范围：±10%",
                "服务有效期：7 天"
            ],
            bottom: {
                price: 160,
                tip: "（超过部分¥0.53/单词）"
            }
        }, {
            title: "深度修改",
            contents: [
                "适用于已有初稿并且希望着重提升语言表达,结构逻辑，素材使用的用户",
                "适用于除简历、case study、writing sample等学术类文书外所有留学文书",
                "一对一匹配顶级名校外籍老师",
                "1 稿 / 3 天",
                "每一稿完成 3 天内不限留言数",
                "文章压缩范围：±10%",
                "服务有效期：7 天"
            ],
            bottom: {
                price: 284,
                tip: "（超过部分¥0.95/单词）"
            }
        }, {
            title: "VIP文书辅导",
            contents: [
                "适用于已有初稿并且希望着重提升语言表达的用户",
                "适用于除简历外所有留学文书",
                "一对一匹配顶级名校外籍老师",
                "1 稿 / 3 天",
                "每一稿完成 3 天内不限留言数",
                "文章压缩范围：±10%",
                "服务有效期：7 天"
            ],
            bottom: {
                price: 160,
                tip: "（超过部分¥0.53/单词）"
            }
        }],

        subs: [{
            title: "套餐外可额外加购服务",
            contents: [{
                title: '指定顾问',
                contents: [{
                    title: '指定特定顾问：',
                    contents: [
                        "将由该顾问完成您的文书修改",
                        '价格以顾问自己定价为准'
                    ]
                }, {
                    title: '指定顾问等级：',
                    contents: [
                        '顾问等级为平台依据专家组评分，用户评价，服务响应时间等标准综合评比确定',
                        {
                            title: '指定不同等级顾问价格如下：',
                            contents: [
                                '指定 level2 顾问＋总价 10%',
                                '指定 level3 顾问＋总价 30%',
                                '指定 level4 顾问＋总价 50%',
                                '指定 level5 顾问＋总价 100%'
                            ]
                        }
                    ]
                }, {
                    title: '不指定顾问：',
                    contents: [
                        '不指定特定顾问和顾问等级，文书将由本申请领域各等级顾问自由接单。'
                    ]
                }]
            }, {
                title: '翻译',
                contents: [{
                    contents: [
                        '72 小时, 180.84 元 / 千汉字（正常）',
                        '48 小时, 271.26 元 / 千汉字（加急）'
                    ]
                }]
            }]
        }]
    },

};

export default function (state = initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SUB_SERVICE_DETAIL_ROOT_SET:
            return {...newState, [rest.key]: rest.data};
        case $.SUB_SERVICE_DETAIL_INNER_SET:
            return fromJS(newState).setIn(rest.keys, rest.data).toJS();
        default:
            return newState;
    }
}
