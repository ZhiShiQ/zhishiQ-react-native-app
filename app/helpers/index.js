/**
 * Created by moyu on 2017/2/26.
 */
import ReducerHelper from './reducer-helper';

export const _t = (type, obj) => ({type, ...obj})

export const uint = () => {
    uint._i_ = uint._i_ || 0;
    return uint._i_++;
}

export const reducerHelper = ReducerHelper;
