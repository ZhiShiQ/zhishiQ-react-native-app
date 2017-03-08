/**
 * Created by moyu on 2017/2/26.
 */
import {uint} from './helpers'


/* UI related */

export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 52;
export const PADDING_SIZE = 15;
export const SWIPE_BLOCK_WIDTH = 75;
export const DURATION = 300;

/* UI related end */

/* start of my common' logic related */
export const SET_COMMON_MODAL_OPEN = uint();
export const SET_COMMON_MODAL_TYPE = uint();
export const ABROAD_EXPERT_FORM_SELECT = uint();
/* end of my common' logic related */

/* start of entry's logic related */
export const SET_ENTRY_ACTIVE_INDEX = uint();
export const SET_ENTRY_REG = uint();
export const SET_ENTRY_LOGIN = uint();

export const SET_RESET_PWD_BY_PHONE = uint();
export const SET_RESET_PWD_BY_MAIL = uint();
/* end of entry's logic related */

/* start of foreign_teacher_detail's logic related */
export const FOREIGN_TEACHER_DETAIL_BASE_SET = uint();
/* end of foreign_teacher_detail's logic related */

/* start of abroad_expert_detail's logic related */
export const ABROAD_EXPERT_DETAIL_BASE_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_COMMENTS_SET = uint();
/* end of abroad_expert_detail's logic related */

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
