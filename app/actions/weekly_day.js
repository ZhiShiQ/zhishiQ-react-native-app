/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {homeURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

export const setWeeklyDayItems = (items) => _t($.WEEKLY_DAY_ITEM_SET, {items});
export const setWeeklyDayCell = (dayIndex, timeIndex, data) => _t($.WEEKLY_DAY_ITEM_SET, {data, dayIndex, timeIndex});
