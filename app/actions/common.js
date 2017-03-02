/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const setCommonModalIsOpen = (isOpen) => _t($.SET_COMMON_MODAL_OPEN, {isOpen})
export const setCommonModalType = (_type) => _t($.SET_COMMON_MODAL_TYPE, {_type})

export const refererModalOpen = () =>
    (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('referer')])

export const discountModalOpen = () =>
    (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('discount')])
