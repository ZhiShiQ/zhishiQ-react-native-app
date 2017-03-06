/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const setResetPwdByPhone_Phone = phone => _t($.SET_RESET_PWD_BY_PHONE, {phone});
export const setResetPwdByPhone_Verify = verify => _t($.SET_RESET_PWD_BY_PHONE, {verify});
export const setResetPwdByPhone_NewPwd = newPwd => _t($.SET_RESET_PWD_BY_PHONE, {newPwd});
export const setResetPwdByPhone_ConfirmPwd = confirmPwd => _t($.SET_RESET_PWD_BY_PHONE, {confirmPwd});
