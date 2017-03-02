/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    items: [{
        title: 'Abby R',
        tags: [
            'ABC', 'XXX',' IKH', 'XSW'
        ],
        numerator: 4.5,
        deNumerator: 5,
        thumbnail: {},
        serviceTimes: 1000
    }, {
        title: '课程',
        content: '10分钟免费墨尔本大学行前指导 Free 10-minute guidance for new unimelb students',
        numerator: 4.5,
        deNumerator: 5,
        thumbnail: {},
        serviceTimes: 1000
    }, {
        title: 'Abby R',
        tags: [
            'ABC', 'XXX',' IKH', 'XSW'
        ],
        numerator: 4.5,
        deNumerator: 5,
        thumbnail: {},
        serviceTimes: 1000
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
