/**
 * Created by moyu on 2017/2/26.
 */
import {_t} from '../helpers';
import * as $ from '../constant'

export const setCommonModalIsOpen = (isOpen) => _t($.SET_COMMON_MODAL_OPEN, {isOpen})
export const setCommonModalType = (_type) => _t($.SET_COMMON_MODAL_TYPE, {_type})

export const refererModalOpen = () => (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('referer')])
export const discountModalOpen = () => (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('discount')])
export const timeRangeModalOpen = () => (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('timeRange')])
export const timeRangeModalDeletable = (enable) => (emit) => emit([])
export const abroadExpertBuyFormModalOpen = (index=0) => (emit) => emit([setCommonModalIsOpen(true), setAbroadExpertFormIndex(index), setCommonModalType('abroadExpertBuy')])
export const abroadExpertCartFormModalOpen = (index=0) => (emit) => emit([setCommonModalIsOpen(true), setAbroadExpertFormIndex(index), setCommonModalType('abroadExpertCart')])
export const simplePayModalOpen = () => (emit) => emit([setCommonModalIsOpen(true), setCommonModalType('simplePay')])

export const setAbroadExpertFormItems = (items) => _t($.ABROAD_EXPERT_FORM_SET, {items});
export const setAbroadExpertFormIndex = (index) => _t($.ABROAD_EXPERT_FORM_SET, {index});
export const setAbroadExpertFormName = (name) => _t($.ABROAD_EXPERT_FORM_SET, {name});
export const setAbroadExpertFormThumbnail = (thumbnail) => _t($.ABROAD_EXPERT_FORM_SET, {thumbnail});

export const setTimeRangeStart = (start) => _t($.MODAL_TIME_RANGE_SET, {keys: ["start"], data: start});
export const setTimeRangeEnd = (end) => _t($.MODAL_TIME_RANGE_SET, {keys: ["end"], data: end});
export const setTimeRangeDeletable = (deletable) => _t($.MODAL_TIME_RANGE_SET, {keys: ["deletable"], data: deletable});

export const setRefererTarget = (target) => _t($.MODAL_REFERER_SET, {keys: ['target'], data: target});

