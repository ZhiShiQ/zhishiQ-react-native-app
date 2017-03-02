/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    futureDevelopment: ["学术", "创业"],
    degree: "博士",
    country: ["欧洲", "美国"],
    schoolNum: 3
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        default:
            return newState;
    }
}
