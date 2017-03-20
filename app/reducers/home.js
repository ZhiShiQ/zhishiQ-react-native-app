/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';


const initialState = {
    isFetching: false,
    isRefreshing: false,
    isFirst: true,

    sliders: [
        {thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'}
    ],

    mainItems: [
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
        {name: '申请档案', thumbnail: {}, route: 'http://blog.moyuyc.xyz', type: 'url'},
    ],

    subItems: [{
        name: '外籍导师', thumbnail: {},
        route: 'http://blog.moyuyc.xyz', type: 'url'
    }, {
        name: '留学行家', thumbnail: {},
        route: 'http://blog.moyuyc.xyz', type: 'url'
    }],

    activities: [
        [{
            name: '外籍导师', thumbnail: {},
            route: 'http://blog.moyuyc.xyz', type: 'url'
        }, {
            name: '外籍导师', thumbnail: {},
            route: 'http://blog.moyuyc.xyz', type: 'url'
        }],
        [{
            name: '外籍导师', thumbnail: {},
            route: 'http://blog.moyuyc.xyz', type: 'url'
        }, {
            name: '外籍导师', thumbnail: {},
            route: 'http://blog.moyuyc.xyz', type: 'url'
        }]
    ],

    recommendTopics: [{
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }, {
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }, {
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }],

    singlePicture: {
        thumbnail: {},
        route: 'http://blog.moyuyc.xyz', type: 'url'
    },

    singlePicture2: {
        thumbnail: {},
        route: 'http://blog.moyuyc.xyz', type: 'url'
    },

    hotTeachers: [{
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }, {
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }, {
        title: "艺术与设计类申请咨询（英国）",
        tags: ["其他", "选校", "生活", "无效退款"],
        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
        bottomValues: [5, 30]
    }]
};

export default function (state = initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.HOME_PAGE_SET:
            return fromJS(newState).setIn(action.keys, action.data).toJS();
        default:
            return newState;
    }
}
