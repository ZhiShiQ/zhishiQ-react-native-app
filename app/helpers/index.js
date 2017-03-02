/**
 * Created by moyu on 2017/2/26.
 */
import ReducerHelper from './reducer-helper';

export const _t = (type, obj) => ({type, ...obj})

export const reducerHelper = ReducerHelper;
