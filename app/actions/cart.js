/**
 * Created by moyu on 2017/2/26.
 */
import {_t, getTokenJson, _debugger} from '../helpers';
import {cartGetURL} from '../helpers/remote-urls';
import * as $ from '../constant'
import {stringify} from 'querystring'

const _setRootThin = (key, data) => _t($.SET_CART_ITEM_ROOT, {key, data})

export const fetchCarts = () =>
    (emit, getState) => {
        emit([setCartFetching(true), setCartFirst(false)]);
        return getTokenJson().then(token =>
            fetch(cartGetURL + '?', {
                headers: {...token}
            })
        ).then(r => r.json())
        .then(o => {
            // _debugger(o.data);
        }).catch(ex => _debugger(ex))
        .then(x=> emit(setCartFetching(false)))
    }

export const setCartFetching = (isFetching) => _setRootThin('isFetching', isFetching)
export const setCartRefreshing = (isRefreshing) => _setRootThin('isRefreshing', isRefreshing)
export const setCartFirst = (isFirst) => _setRootThin('isFirst', isFirst)
export const delCartItemByIndex = (index) => _t($.DEL_CART_ITEM_BY_INDEX, {index})
export const setCartItemSelectedByIndex = (index, selected) => _t($.SET_CART_ITEM_SELECTED_BY_INDEX, {index, selected})
export const setAllCartItemSelected = (selected = true) => _t($.SET_ALL_CART_ITEM_SELECTED, {selected})
