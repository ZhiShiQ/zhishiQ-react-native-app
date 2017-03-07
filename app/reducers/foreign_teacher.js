/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching: false,

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

    list: [{
        thumbnail: {},
        title: "Ssssss",
        tags: ["1", "b", "x"],
        brief: "~ 2015/12 Texarkana Gazette | assistant city editor…",
        experience: "~ 2015/12 Texarkana Gazette | assistant city editor…",
        clients: 994,
        rate: 4.9,
        reviews: 141,
        dollar: 25.08
    }, {
        thumbnail: {},
        title: "Ssssss",
        tags: ["1", "b", "x"],
        experience: "~ 2015/12 Texarkana Gazette | assistant city editor…",
        education: "~ 2015/12 Texarkana Gazette | assistant city editor…",
        clients: 994,
        rate: 4.9,
        reviews: 141,
        dollar: 25.08
    }]
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        default:
            return newState;
    }
}
