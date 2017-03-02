/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    school: "南京师范大学",
    grade: "大二",
    speciality: "计算机",
    experienceNum: 7,
    examNum: 2
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        default:
            return newState;
    }
}
