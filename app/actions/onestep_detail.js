/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {signInURL, getVerifyURL, signUpURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

const _setRoot = (key, data) => _t($.SERVICE_DETAIL_ROOT_SET, {key, data});
const _setInner = (keys, data) => _t($.SERVICE_DETAIL_INNER_SET, {keys, data});

export const setServiceDetailFetching = (isFetching) => _setRoot('isFetching', isFetching);
export const setServiceDetailBase = (base) => _setRoot('base', base);

export const setServiceDetailInnerServices = (services) => _setInner(['detail', 'services'], services);
export const setServiceDetailInnerTeacherInfo = (teacherInfo) => _setInner(['detail', 'teacherInfo'], teacherInfo);
export const setServiceDetailInnerCharacter = (character) => _setInner(['detail', 'character'], character);
export const setServiceDetailInnerPromise = (promise) => _setInner(['detail', 'promise'], promise);
export const setServiceDetailInnerProcess = (process) => _setInner(['detail', 'process'], process);
export const setServiceDetailInnerOfferRank = (offerRank) => _setInner(['detail', 'offerRank'], offerRank);
