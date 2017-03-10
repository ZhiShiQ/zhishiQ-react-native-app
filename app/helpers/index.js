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
export const splitText = (text, limit=50) => {
    let showText = '', hideText = '';
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
