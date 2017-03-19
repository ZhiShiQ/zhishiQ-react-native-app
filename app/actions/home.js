/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {homeURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

function _keys_data () {
    const args = Array.from(arguments);
    return _t($.HOME_PAGE_SET, {keys: args.slice(0, args.length-1), data: args[args.length-1]})
}

export const fetchHomePage = (opts={}) =>
    (emit, getState) => {
        const {refresh} = opts;
        const {isFetching, isFirst} = getState().home;
        if (isFetching) {
            return;
        }
        return emit([setHomeFetching(true)]) &&
            fetch(homeURL + '?')
                .then(r => r.json())
                .then(json => {
                    if (json.success == false) {
                        alert(json.message);
                    } else {

                    }
                    emit([
                        setHomeFetching(false),
                        isFirst && setHomeFirst(false)
                    ])
                })
                .catch(ex => {
                    _debugger(ex);
                    emit([setHomeFetching(false)])
                })
    }

export const setHomeFetching = isFetching => _keys_data('isFetching', isFetching);
export const setHomeRefreshing = isRefreshing => _keys_data('isRefreshing', isRefreshing);
export const setHomeFirst = isFirst => _keys_data('isRefreshing', isFirst);
