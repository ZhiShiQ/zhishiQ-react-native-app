/**
 * Created by moyu on 2017/2/26.
 */
import ReducerHelper from './reducer-helper';

export const _t = (type, obj) => ({type, ...obj})

export const uint = () => {
    uint._i_ = uint._i_ || 0;
    return uint._i_++;
}
/**
 * 将字符串分割成显示的与隐藏的两部分。
 * @param text
 * @returns {{showText: string, hideText: *}}
 */
export const splitText = (text='', limit=50) => {
    let showText = '', hideText = '';
    if (typeof text === 'string') {
        return {
            showText: text.substr(0, limit),
            hideText: text.slice(limit)
        }
    }
    Array.from(text).some((char, i) => {
        if (char === '\n') {
            if (showText.length >= limit) {
                hideText = text.slice(i+1);
                return true;
            }
        }
        showText += char;
    });

    return {
        showText,
        hideText: !!hideText ? hideText : null
    }
}

export const reducerHelper = ReducerHelper;
export const _debugger = (obj) => {
    const __DEBUG__ = true;
    if (!__DEBUG__) {
        return;
    }
    const prefix = "[ERROR]: ";
    if (obj instanceof Error) {
        alert(prefix+obj.message+'\n'+obj.stack);
    } else if (typeof obj === 'string') {
        alert(prefix+obj);
    } else {
        alert(prefix+JSON.stringify(obj));
    }
};




import React from 'react';
import {View, StyleSheet} from 'react-native';

export const sep = (noBorder, style) => {
    return <View style={[{
        height: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5'
    }, noBorder ? {borderColor: 'transparent'} : {}, style]}></View>
}

import {set, get, remove} from './storage';

export async function setToken (token) {
    return await set('@token', token);
}
export async function getToken () {
    return await get('@token');
}
export async function removeToken (token) {
    return await remove('@token');
}
export async function checkSigned () {
    const t = await getToken();
    return !!t;
}
export async function getTokenHeader() {
    return {
        authorization: await getToken()
    };
}
