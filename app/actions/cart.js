/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const delCartItemByIndex = (index) => _t($.DEL_CART_ITEM_BY_INDEX, {index})
export const setCartItemSelectedByIndex = (index, selected) => _t($.SET_CART_ITEM_SELECTED_BY_INDEX, {index, selected})
export const setAllCartItemSelected = (selected=true) => _t($.SET_ALL_CART_ITEM_SELECTED, {selected})
