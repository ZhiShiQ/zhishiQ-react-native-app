/**
 * Created by moyu on 2017/2/26.
 */
import {uint} from './helpers'


/* UI related */

export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 52;
export const PADDING_SIZE = 15;
export const SWIPE_BLOCK_WIDTH = 65;
export const OPACITY_BG_CLR = 'rgba(0, 0, 0, .5)';
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

/* start of foreign_teacher's logic related */
export const FOREIGN_TEACHER_FETCHING_SET = uint();
export const FOREIGN_TEACHER_CURRENT_SET = uint();
export const FOREIGN_TEACHER_HAS_MORE_SET = uint();
export const FOREIGN_TEACHER_LIST_SET = uint();
export const FOREIGN_TEACHER_FILTER_SET = uint();
export const FOREIGN_TEACHER_FIRST_SET = uint();
export const FOREIGN_TEACHER_LIST_APPEND = uint();
/* end of foreign_teacher's logic related */

/* start of abroad_expert's logic related */
export const ABROAD_EXPERT_FETCHING_SET = uint();
export const ABROAD_EXPERT_CURRENT_SET = uint();
export const ABROAD_EXPERT_HAS_MORE_SET = uint();
export const ABROAD_EXPERT_LIST_SET = uint();
export const ABROAD_EXPERT_FILTER_SET = uint();
export const ABROAD_EXPERT_FIRST_SET = uint();
export const ABROAD_EXPERT_LIST_APPEND = uint();
/* end of abroad_expert's logic related */


/* start of foreign_teacher_detail's logic related */
export const FOREIGN_TEACHER_DETAIL_FETCHING_SET = uint();
export const FOREIGN_TEACHER_DETAIL_SERVICES_SET = uint();
export const FOREIGN_TEACHER_DETAIL_BASE_SET = uint();
export const FOREIGN_TEACHER_DETAIL_EDUC_SET = uint();
export const FOREIGN_TEACHER_DETAIL_SUMMARY_SET = uint();
export const FOREIGN_TEACHER_DETAIL_DESCRIPTION_SET = uint();
export const FOREIGN_TEACHER_DETAIL_EXPERIENCE_SET = uint();

export const FOREIGN_TEACHER_DETAIL_COMMENT_FETCHING_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_FIRST_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_LEVELS_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_TOTAL_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENTS_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_SUMMARY_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_HASMORE_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_AVERAGE_SET = uint();
export const FOREIGN_TEACHER_DETAIL_COMMENT_CURR_SET = uint();
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
export const MY_COLLECTION_PEOPLE_REMOVE_BY_INDEX = uint();
export const MY_COLLECTION_SERVICES_REMOVE_BY_INDEX = uint();
export const MY_COLLECTION_SERVICES_SET = uint();
export const MY_COLLECTION_PEOPLE_SET = uint();

/* end of my collections' logic related */

/* start of cart's logic related */
export const DEL_CART_ITEM_BY_INDEX = uint();
export const SET_CART_ITEM_SELECTED_BY_INDEX = uint();
export const SET_ALL_CART_ITEM_SELECTED = uint();

/* end of cart's logic related */
