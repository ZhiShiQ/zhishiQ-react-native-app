/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import {UpdateAllList} from '../helpers/reducer-helper';
import * as $ from '../constant';

const initialState = {
    items: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ]
};

export default function (state = initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.WEEKLY_DAY_ITEM_SET:
            if (rest.items)
                return {...newState, items: rest.items}
            else
                return {
                    ...newState,
                    items: List(newState.items).update(rest.dayIndex, (times) => {
                        times[rest.timeIndex] = rest.data;
                        return times;
                    }).toJS()
                }
        default:
            return state;
    }
}
