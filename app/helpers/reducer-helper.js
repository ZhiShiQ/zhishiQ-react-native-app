/**
 * Created by moyu on 2017/3/2.
 */
import {fromJS} from 'immutable';

export const UpdateAllList = (list, key, value) => {
    let newList = fromJS(list);
    newList.count()
    for (let i = 0; i < newList.count(); i++) {
        newList = newList.setIn([i, key], value);
    }
    return newList.toJS();
}
