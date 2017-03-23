/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken, alert} from '../helpers';
import * as $ from '../constant'
import {getVerifyURL, resetPwdURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';

let timer = null;

export const fetchResetPwdVerify = () => {
    return (emit, getState) => {
        const {reset_pwd_by_phone: {
            isVerifySent, phone
        }} = getState();
        if (isVerifySent) {
            return Promise.resolve(false);
        }
        if (!phone) {
            alert("请输入手机号");
            return Promise.resolve(false);
        }
        return fetch(getVerifyURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({type: "reset-password", telephone: phone})
        })
            .then(r => r.json())
            .then(json => {
                if (json.success == false) {
                    alert(json.message);
                    return false;
                } else {
                    if (timer!=null) {
                        clearTimeout(timer);
                    }
                    emit(resetResetPwdVerify());

                    timer = setTimeout(function () {
                        const {reset_pwd_by_phone: {
                            isVerifySent, phone, leftSecond
                        }} = getState();
                        if (leftSecond === 0 && timer!=null) {
                            clearTimeout(timer);
                            timer = null;
                            emit(resetResetPwdVerify());
                            return;
                        }
                        emit(setResetPwdByPhone_LeftSecondDecrease())
                        timer = setTimeout(arguments.callee, 1000);
                    }, 1000);

                    emit([
                        resetResetPwdVerify(),
                        setResetPwdByPhone_IsVerifySent(true)
                    ]);
                    return true;
                }
            }).catch(ex => {
                _debugger(ex);

            })
    }
};

export const fetchResetPwd = () =>
    (emit, getState) => {
        const {reset_pwd_by_phone: {
            isVerifySent, phone, verify, newPwd, confirmPwd,
        }} = getState();

        if (!phone || !verify || !newPwd || !confirmPwd) {
            alert("信息不能为空");
            return Promise.resolve(false);
        }
        if (confirmPwd !== newPwd) {
            alert("两次密码不相同");
            return Promise.resolve(false);
        }
        emit(setResetPwdByPhone_IsFetching(true))
        return fetch(resetPwdURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({
                mobile_phone: phone.trim(),
                sms_verification_code: verify.trim(),
                password: newPwd.trim()
            })
        }).then(r => r.json())
            .then(json => {
                if (json.success == false) {
                    alert(json.message);
                } else {
                    if (timer!=null) {
                        clearTimeout(timer);
                        emit(resetResetPwdVerify());
                    }
                    return setToken(JSON.stringify({auth_key: json.data.auth_key, id: json.data.id}))
                        .then((a) => {
                            emit(setResetPwdByPhone_IsFetching(false))
                            return true;
                        });
                }
            })
            .catch(ex => {
                _debugger(ex);
                return false;
            })
    }

const resetResetPwdVerify = () => (emit) => emit([setResetPwdByPhone_IsVerifySent(false), setResetPwdByPhone_LeftSecond(60)])


export const setResetPwdByPhone_Phone = phone => _t($.SET_RESET_PWD_BY_PHONE, {phone});
export const setResetPwdByPhone_IsVerifySent = isVerifySent => _t($.SET_RESET_PWD_BY_PHONE, {isVerifySent});
export const setResetPwdByPhone_LeftSecond = leftSecond => _t($.SET_RESET_PWD_BY_PHONE, {leftSecond});
export const setResetPwdByPhone_Verify = verify => _t($.SET_RESET_PWD_BY_PHONE, {verify});
export const setResetPwdByPhone_NewPwd = newPwd => _t($.SET_RESET_PWD_BY_PHONE, {newPwd});
export const setResetPwdByPhone_ConfirmPwd = confirmPwd => _t($.SET_RESET_PWD_BY_PHONE, {confirmPwd});
export const setResetPwdByPhone_IsFetching = isFetching => _t($.SET_RESET_PWD_BY_PHONE, {isFetching});

export const setResetPwdByPhone_LeftSecondDecrease = () =>
    (emit, getState) => {
        const {reset_pwd_by_phone: {
            isVerifySent, phone, leftSecond
        }} = getState();
        emit(setResetPwdByPhone_LeftSecond(leftSecond-1));
    }
