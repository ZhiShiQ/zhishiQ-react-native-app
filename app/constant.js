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
export const badgeStyle = {
    flex: 0, paddingHorizontal: 4.5, borderRadius: 8.5, fontSize: 14,
    color: '#fff', backgroundColor: '#fc6d34',
    overflow: 'hidden', paddingVertical: .5,
};

/* UI related end */

/* start of sub service detail's logic related */
export const SUB_SERVICE_DETAIL_ROOT_SET = uint();
export const SUB_SERVICE_DETAIL_INNER_SET = uint();
export const ONE_STEP_SUB_SERVICE_DETAIL_ROOT_SET = uint();
export const ONE_STEP_SUB_SERVICE_DETAIL_INNER_SET = uint();
/* end of sub service detail's logic related */

/* start of service detail's logic related */
export const SERVICE_DETAIL_ROOT_SET = uint();
export const SERVICE_DETAIL_INNER_SET = uint();
export const ONE_STEP_SERVICE_DETAIL_ROOT_SET = uint();
export const ONE_STEP_SERVICE_DETAIL_INNER_SET = uint();
export const SERVICE_TEXT_SERVICE_DETAIL_ROOT_SET = uint();
export const SERVICE_TEXT_SERVICE_DETAIL_INNER_SET = uint();
export const SERVICE_TEXT_PACK_SERVICE_DETAIL_ROOT_SET = uint();
export const SERVICE_TEXT_PACK_SERVICE_DETAIL_INNER_SET = uint();
export const SERVICE_TEXT_RESUME_SERVICE_DETAIL_ROOT_SET = uint();
export const SERVICE_TEXT_RESUME_SERVICE_DETAIL_INNER_SET = uint();
/* end of service detail's logic related */

/* start of mine' logic related */
export const MINE_ROOT_SET = uint();
export const MINE_INNER_SET = uint();
/* end of mine' logic related */

/* start of my common' logic related */
export const SET_COMMON_MODAL_OPEN = uint();
export const SET_COMMON_MODAL_TYPE = uint();
export const ABROAD_EXPERT_FORM_SET = uint();
export const MODAL_REFERER_SET = uint();
export const MODAL_TIME_RANGE_SET = uint();
export const MODAL_PICKER_SET = uint();
/* end of my common' logic related */

/* start of weekly_day's related */
export const WEEKLY_DAY_ITEM_SET = uint();
/* end of weekly_day's related */

/* start of entry's home related */
export const HOME_PAGE_SET = uint();
/* end of entry's home related */

/* start of entry's logic related */
export const SET_ENTRY_ROOT = uint();
export const SET_ENTRY_ACTIVE_INDEX = uint();
export const SET_ENTRY_REG = uint();
export const SET_ENTRY_LOGIN = uint();

export const SET_RESET_PWD_BY_PHONE = uint();
export const SET_RESET_PWD_BY_MAIL = uint();
/* end of entry's logic related */

/* start of order_confirm's logic related */
export const ORDER_CONFIRM_ROOT_SET = uint();
/* end of order_confirm's logic related */


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

export const ABROAD_EXPERT_DETAIL_FETCHING_SET = uint();
export const ABROAD_EXPERT_DETAIL_AWARD_SET = uint();
export const ABROAD_EXPERT_DETAIL_SERVICES_SET = uint();
export const ABROAD_EXPERT_DETAIL_EDUC_SET = uint();
export const ABROAD_EXPERT_DETAIL_SUMMARY_SET = uint();
export const ABROAD_EXPERT_DETAIL_DESCRIPTION_SET = uint();
export const ABROAD_EXPERT_DETAIL_EXPERIENCE_SET = uint();

export const ABROAD_EXPERT_DETAIL_COMMENT_FETCHING_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_FIRST_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_LEVELS_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_TOTAL_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENTS_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_SUMMARY_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_HASMORE_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_AVERAGE_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_CURR_SET = uint();

export const ABROAD_EXPERT_FULL_FETCHING_SET = uint();
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

export const FOREIGN_TEACHER_FULL_FETCHING_SET = uint();
/* end of foreign_teacher_detail's logic related */

/* start of abroad_expert_detail's logic related */
export const ABROAD_EXPERT_DETAIL_BASE_SET = uint();
export const ABROAD_EXPERT_DETAIL_COMMENT_COMMENTS_SET = uint();
/* end of abroad_expert_detail's logic related */

/* start of my total order's logic related */
export const SET_MY_ACTIVE_TOTAL_ORDER_TITLE_INDEX = uint();
export const MY_TOTAL_ORDER_ROOT_SET = uint();
export const MY_TOTAL_ORDER_INNER_SET = uint();

/* end of my total order's logic related */

/* start of my collections' logic related */
export const SET_MY_ACTIVE_COLLECTION_TAB = uint();
export const MY_COLLECTION_PEOPLE_REMOVE_BY_INDEX = uint();
export const MY_COLLECTION_SERVICES_REMOVE_BY_INDEX = uint();
export const MY_COLLECTION_SERVICES_SET = uint();
export const MY_COLLECTION_PEOPLE_SET = uint();

/* end of my collections' logic related */

/* start of cart's logic related */
export const SET_CART_ITEM_ROOT = uint();

export const DEL_CART_ITEM_BY_INDEX = uint();
export const SET_CART_ITEM_SELECTED_BY_INDEX = uint();
export const SET_ALL_CART_ITEM_SELECTED = uint();

/* end of cart's logic related */

/* start of service test's logic related*/
export const SERVICE_TEST_ROOT_SET = uint();
/* end of service test's logic related*/
