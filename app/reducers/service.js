/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    headers: ["热门服务", "更多服务"],
    groups: [
        ["外籍导师", "留学行家"], ["一站式服务", "全套文书", "国际优化快递", "单项文书", "简历", "模拟考试"]
    ]
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        default:
            return newState;
    }
}