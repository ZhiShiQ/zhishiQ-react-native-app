/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {signInURL, getVerifyURL, signUpURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

const _setRoot = (key, data) => _t($.SUB_SERVICE_DETAIL_ROOT_SET, {key, data});
const _setInner = (keys, data) => _t($.SUB_SERVICE_DETAIL_INNER_SET, {keys, data});

export const setSubServiceDetailType = (type) => _setRoot('type', type);
