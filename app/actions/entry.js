/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const setEntryActiveIndex = (index) => _t($.SET_ENTRY_ACTIVE_INDEX, {index})
export const setEntryRegPhone = (phone) => _t($.SET_ENTRY_REG, {phone})
export const setEntryRegVerify = (verify) => _t($.SET_ENTRY_REG, {verify})
export const setEntryRegPwd = (pwd) => _t($.SET_ENTRY_REG, {pwd})
export const setEntryRegSrc = (src) => _t($.SET_ENTRY_REG, {src})

export const setEntryLoginPwd = (pwd) => _t($.SET_ENTRY_LOGIN, {pwd})
export const setEntryLoginUser = (user) => _t($.SET_ENTRY_LOGIN, {user})
