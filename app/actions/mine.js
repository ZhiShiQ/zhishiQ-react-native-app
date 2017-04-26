/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {homeURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

const _setRoot = (key, data) => _t($.MINE_ROOT_SET, {key, data});
const _setInner = (keys, data) => _t($.MINE_INNER_SET, {keys, data});

export const setMyName = (name) => _setRoot('username', name);
export const setMyAvatar = (avatar) => _setRoot('avatar', avatar);
