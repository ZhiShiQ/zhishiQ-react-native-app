/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {signInURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';


export const fetchSignIn = () => {
    return (emit, getState) => {
        let {entry: {login: {user, pwd}}} = getState();
        user = user.trim(); pwd = pwd.trim();
        if (!user || !pwd) {
            alert(' 用户名密码不能为空 ');
            return Promise.resolve(false);
        }
        return fetch(signInURL+'?'+stringify({username: user, password: pwd}))
            .then(r => r.json())
            .then(json => {
                if (!json.success) {
                    alert(json.message);
                    return false;
                } else {
                    return setToken(json.data.auth_key)
                        .then((a) => {
                            return true;
                        });
                }
            }).catch(ex => {
                _debugger(ex);
            })
    }
}

export const setEntryActiveIndex = (index) => _t($.SET_ENTRY_ACTIVE_INDEX, {index})
export const setEntryRegPhone = (phone) => _t($.SET_ENTRY_REG, {phone})
export const setEntryRegVerify = (verify) => _t($.SET_ENTRY_REG, {verify})
export const setEntryRegPwd = (pwd) => _t($.SET_ENTRY_REG, {pwd})
export const setEntryRegSrc = (src) => _t($.SET_ENTRY_REG, {src})

export const setEntryLoginPwd = (pwd) => _t($.SET_ENTRY_LOGIN, {pwd})
export const setEntryLoginUser = (user) => _t($.SET_ENTRY_LOGIN, {user})
