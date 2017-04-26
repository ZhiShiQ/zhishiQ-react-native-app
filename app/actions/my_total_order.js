/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, getTokenJson} from '../helpers';
import {orderListURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant'

const _setRoot = (key, data) => _t($.MY_TOTAL_ORDER_ROOT_SET, {key, data});
const _setInner = (keys, data) => _t($.MY_TOTAL_ORDER_INNER_SET, {keys, data});

const mapOrder = ({name, price, date, image, status, ...rest}) => ({
    ...rest, title: name, prompt: date, state: status,
    price: price.zh, thumbnail: {uri: image}
})

export const resetMyTotalOrderFirst = () =>
    (emit, getState) => {
        const {my_total_order} = getState();
        const {
            activeIndex, menus
        } = my_total_order;
        let {id} = menus[activeIndex];
        const {
            [id + '_currentPage']: currentPage,
            [id + '_items']: items=[],
            [id + '_isRefreshing']: isRefreshing,
            [id + '_isFirst']: isFirst=true,
            [id + '_hasMore']: hasMore,
            [id + '_isFetching']: isFetching,
        } = my_total_order;

        emit(
            menus.map(({id}) =>
                setMyTotalOrderFirst(id, true)
                // && setMyTotalOrderRefreshing(id, true)
            )
        )
    }

export const fetchMyTotalOrder = (action = "reset", opt={}) =>
    (emit, getState) => {
        const {ID} = opt;
        const {my_total_order} = getState();
        const {
            activeIndex, menus, filters, titleIndex
        } = my_total_order;
        let {id} = menus[activeIndex];
        const {params} = filters[titleIndex];
        id = ID || id;
        const {
            [id + '_currentPage']: currentPage,
            [id + '_items']: items=[],
            [id + '_isRefreshing']: isRefreshing,
            [id + '_isFirst']: isFirst,
            [id + '_hasMore']: hasMore,
            [id + '_isFetching']: isFetching,
        } = my_total_order;
        const isAppend = action == 'append';
        const isRefresh = action == 'refresh';
        const isReset = action == 'reset';

        const DEFAULT_SIZE = 20;
        const page = isAppend ? currentPage + 1 : 1;
        const pageSize = isRefresh ? Math.max(items.length, DEFAULT_SIZE) : DEFAULT_SIZE;

        if (!isReset && isFetching) {
            return;
        }

        emit([
            setMyTotalOrderFetching(id, true),
            isRefresh && setMyTotalOrderRefreshing(id, isRefresh),
            isReset && setMyTotalOrderItems(id, [])
        ]);
        return getTokenJson().then(header =>
            fetch(orderListURL + '?' + stringify({status: id, page, pageSize, ...params}), {
                headers: {...header}
            })
        ).then(r => r.json())
        .then(o => {
            if (o.success) {
                o = o.data;
                emit([
                    setMyTotalOrderHasMore(id, o.hasMoreInNextPage),
                    setMyTotalOrderCurrentPage(id, page),
                    setMyTotalOrderItems(id, o.services.map(mapOrder)),
                ])
            } else {
                _debugger(o.message);
            }
        }).catch(ex => {
            _debugger(ex);
            emit([setMyTotalOrderHasMore(id, false)])
        })
        .then(() => emit([
            setMyTotalOrderFetching(id, false), setMyTotalOrderFirst(id, false),
            isRefresh && setMyTotalOrderRefreshing(id, false)
        ]))
    }

const setMyTotalOrderItems = (prefix, items) => _setRoot(prefix + '_items', items)

const setMyTotalOrderFetching = (prefix, fetching) => _setRoot(prefix + '_isFetching', fetching)
const setMyTotalOrderFirst = (prefix, first) => _setRoot(prefix + '_isFirst', first)
const setMyTotalOrderRefreshing = (prefix, isRefreshing) => _setRoot(prefix + '_isRefreshing', isRefreshing)
const setMyTotalOrderHasMore = (prefix, hasMore) => _setRoot(prefix + '_hasMore', hasMore)
const setMyTotalOrderCurrentPage = (prefix, currentPage) => _setRoot(prefix + '_currentPage', currentPage)

export const setMyActiveTotalOrderTitleIndex = (index) => _t($.SET_MY_ACTIVE_TOTAL_ORDER_TITLE_INDEX, {index})
export const setMyTotalOrderIndex = (index) => _setRoot('activeIndex', index)
