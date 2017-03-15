/**
 * Created by moyu on 2017/3/2.
 */
import {_debugger} from './index';
import {AsyncStorage} from 'react-native';

export async function get (key) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (ex) {
        _debugger(ex);
    }
}

export async function set (key, value) {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (ex) {
        _debugger(ex);
    }
}

export async function remove (key) {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (ex) {
        _debugger(ex);
    }
}
