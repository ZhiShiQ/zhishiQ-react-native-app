/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    titleIndex: 0,
    activeIndex: 0,
    isFirst: true,
    isFetching: true,
    isRefreshing: false,
    currentPage: 1,
    hasMore: true,


    filters: [
        {title: '所有服务', params: {}},
        {title: '单项服务', params: {service_type: 'ServiceText', service_sub_type: 'graduate'}},
        {title: '一站式申请', params: {service_type: 'ServiceFullPackage'}},
        {title: '留学行家咨询', params: {service_type: 'ServiceTalk', service_sub_type: 'consult-course'}},
        {title: '全套文书服务', params: {service_type: 'ServiceTextPackage'}},
        {title: '国际快递', params: {service_type: 'ServiceExpress'}},
        {title: '留学文书免费试改', params: {service_type: 'ServiceTextAssess', service_sub_type: '201611'}},
        {title: '雅思写作评阅服务', params: {service_type: 'ServiceTextAssess', service_sub_type: 'ielts'}},
        {title: '简历', params: {service_type: 'ServiceText', service_sub_type: 'resume'}},
        {title: '学术文章', params: {service_type: 'ServiceText', service_sub_type: 'academic'}},
        {title: '模拟面试', params: {service_type: 'ServiceTalk', service_sub_type: 'interview'}},
        {title: '翻译', params: {service_type: 'ServiceText', service_sub_type: 'translate'}},
        {title: '申请档案套餐', params: {service_type: 'ServiceAdmitProfile',}},
        {title: '英国硕士免费申请', params: {service_type: 'ServiceApplicationAssistant', service_sub_type: 'uk_master_free'}},
        {title: 'VIP签证服务', params: {service_type: 'ServiceVisa'}}
    ],
    menus: [
        {name: "全部", id: ""},
        {name: "待付款", id: "unpaid"},
        {name: "处理中", id: "handling"},
        {name: "待反馈", id: "feedback"},
        {name: "已结束", id: "finished"},
        {name: "待评价", id: "wait_review"},
        {name: "已取消", id: "canceled"},
    ],

    all_items: [{
        title: 'sds', thumbnail: {},
        state: 'ing', prompt: '2016-09-12', disCount: 300,
        price: 99999,
        content: 'CONTENT',
        onPress: null, onBtnPress: null, btnDisabled: true
    }, {
        title: 'sds', thumbnail: {},
        state: 'ing', prompt: '2016-09-12', disCount: 300,
        price: 99999, content: 'CONTENT'
    }, {
        title: 'sds', thumbnail: {},
        state: 'wait', prompt: '2016-09-12', disCount: 300,
        price: 99999, content: 'CONTESss', onBtnPress: () => {
            // actions.setRefererTarget("target");
            // actions.refererModalOpen();
        }
    }]
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_MY_ACTIVE_TOTAL_ORDER_TITLE_INDEX:
            return {...newState, titleIndex: rest.index}
        case $.MY_TOTAL_ORDER_INNER_SET:
            return fromJS(newState).setIn(rest.keys, rest.data).toJS();
        case $.MY_TOTAL_ORDER_ROOT_SET:
            return {...newState, [rest.key]: rest.data};
        default:
            return newState;
    }
}
