/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {signInURL, getVerifyURL, signUpURL} from '../helpers/remote-urls';
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
        emit(setEntryLoginIsFetching(true))
        return fetch(signInURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({username: user, password: pwd}),
        })
            .then(r => r.json())
            .then(json => {
                if (!json.success) {
                    alert(json.message);
                    emit(setEntryLoginIsFetching(false))
                    return false;
                } else {
                    if (timer!=null) {
                        clearTimeout(timer);
                        emit(resetEntryRegVerify())
                    }
                    return setToken(JSON.stringify({auth_key: json.data.auth_key, id: json.data.id}))
                        .then((a) => {
                            emit(setEntryLoginIsFetching(false))
                            return true;
                        });
                }
            }).catch(ex => {
                _debugger(ex);
            })
    }
};

export const fetchSignUp = () => {
    return (emit, getState) => {
        let {entry: {reg: {phone, pwd, verify}}} = getState();
        phone = phone.trim(); pwd = pwd.trim(); verify = verify.trim();
        if (!phone || !pwd || !verify) {
            alert(' 用户名密码验证码不能为空 ');
            return Promise.resolve(false);
        }
        emit(setEntryRegIsFetching(true))
        return fetch(signUpURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({telephone: phone, password: pwd, sms_verification_code: verify})
        })
            .then(r => r.json())
            .then(json => {
                if (!json.success) {
                    alert(json.message);
                    emit(setEntryRegIsFetching(false))
                    return false;
                } else {
                    if (timer!=null) {
                        clearTimeout(timer);
                        emit(resetEntryRegVerify());
                    }
                    return setToken(JSON.stringify({auth_key: json.data.auth_key, id: json.data.id}))
                        .then((a) => {
                            emit(setEntryRegIsFetching(false))
                            return true;
                        });
                }
            }).catch(ex => {
                _debugger(ex);
            })
    }
};

let timer = null;

export const fetchVerify = () =>
    (emit, getState) => {
        let {entry: {reg: {phone, pwd, verify}}} = getState();
        if (!phone) {
            alert('请输入手机号码');
            return Promise.resolve(false);
        }
        return fetch(getVerifyURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({type: 'verify-code', telephone: phone})
        })
            .then(r => r.json())
            .then(json => {
                if (!json.success) {
                    alert(json.message);
                    return false;
                } else {
                    if (timer!=null) {
                        clearTimeout(timer);
                    }
                    emit(resetEntryRegVerify())
                    timer = setTimeout(function () {
                        const {entry: { reg: {leftSecond} } } = getState();
                        if (leftSecond === 0 && timer!=null) {
                            clearTimeout(timer);
                            timer = null;
                            emit(resetEntryRegVerify());
                            return;
                        }
                        emit(setEntryRegLeftSecondDecrease());
                        timer = setTimeout(arguments.callee, 1000);
                    }, 1000);

                    emit([
                        resetEntryRegVerify(),
                        setEntryRegIsVerifySent(true)
                    ]);
                    return true;
                }
            }).catch(ex => {
                _debugger(ex);
            })
    }

export const setEntryActiveIndex = (index) => _t($.SET_ENTRY_ACTIVE_INDEX, {index})
export const setEntryRegPhone = (phone) => _t($.SET_ENTRY_REG, {phone})
export const setEntryRegVerify = (verify) => _t($.SET_ENTRY_REG, {verify})
export const setEntryRegPwd = (pwd) => _t($.SET_ENTRY_REG, {pwd})
export const setEntryRegSrc = (src) => _t($.SET_ENTRY_REG, {src})
export const setEntryRegIsVerifySent = (isVerifySent) => _t($.SET_ENTRY_REG, {isVerifySent})
export const setEntryRegIsFetching = (isFetching) => _t($.SET_ENTRY_REG, {isFetching})
export const setEntryRegLeftSecond = (leftSecond) => _t($.SET_ENTRY_REG, {leftSecond})
export const setEntryRegLeftSecondDecrease = () => (emit, getState) => {
    const {entry: { reg: {leftSecond} } } = getState();
    return emit(setEntryRegLeftSecond(leftSecond-1));
};

const resetEntryRegVerify = () => (emit, getState) => {
    return emit([setEntryRegIsVerifySent(false), setEntryRegLeftSecond(60)]);
}

export const setEntryLoginIsFetching = (isFetching) => _t($.SET_ENTRY_LOGIN, {isFetching})
export const setEntryLoginPwd = (pwd) => _t($.SET_ENTRY_LOGIN, {pwd})
export const setEntryLoginUser = (user) => _t($.SET_ENTRY_LOGIN, {user})

export const setEntryIsChecked = (isChecked) => _t($.SET_ENTRY_ROOT, {keys: ["isChecked"], data: isChecked})
