/**
 * Created by moyu on 2017/2/26.
 */
import {uint} from './helpers'


/* UI related */

export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 50;
export const PADDING_SIZE = 15;
export const SWIPE_BLOCK_WIDTH = 75;

/* UI related end */

/* start of my common' logic related */
export const SET_COMMON_MODAL_OPEN = uint();
export const SET_COMMON_MODAL_TYPE = uint();

/* end of my common' logic related */



/* start of my total order's logic related */
export const SET_MY_ACTIVE_TOTAL_ORDER_TITLE_INDEX = uint();

/* end of my total order's logic related */

/* start of my collections' logic related */
export const SET_MY_ACTIVE_COLLECTION_TAB = uint();

/* end of my collections' logic related */

/* start of cart's logic related */
export const DEL_CART_ITEM_BY_INDEX = uint();
export const SET_CART_ITEM_SELECTED_BY_INDEX = uint();
export const SET_ALL_CART_ITEM_SELECTED = uint();

/* end of cart's logic related */
