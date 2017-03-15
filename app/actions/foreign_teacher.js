/**
 * Created by moyu on 2017/2/26.
 */
import {stringify} from 'querystring'
import {_t, _debugger} from '../helpers';
import * as $ from '../constant';
import * as U from '../helpers/remote-urls';



export const fetchForeignTeacher = (page=1, opts={}) => {
    const {reset, resetList} = opts;
    return (emit, getState) => {
        const { hasMore, filters } = getState().foreign_teacher;
        const params = computedFilterParams(filters);
        if (!hasMore && !reset && !resetList) {
            return;
        }
        if (resetList || reset) {
            emit([
                setForeignTeacherList([]),
                setForeignTeacherHasMore(false)
            ])
        }
        return emit(setForeignTeacherIsFetching(true)) &&
            fetch(U.foreignTeacherURL + '?' + stringify({page: page, ...params}), {
                headers: {'Content-Type': 'application/json'}
            })
            .then(r => r.json())
            .then(json => {
                json.list = json.list.map(({average_rate, ...rest}) => ({
                    ...rest, average_rate: Number(Number(average_rate).toFixed(1))
                }));
                if (reset) {
                    json.filters.prices.unshift({min_price: 0, max_price: -1, name: '不限'})
                    json.filters.domains.unshift({id: -1, name: '不限'})
                }
                emit([
                    setForeignTeacherHasMore(json.hasMoreInNextPage),
                    setForeignTeacherIsFetching(false),
                    getState().foreign_teacher.firstMount && setForeignTeacherFirstMount(false),
                    (reset) && setForeignTeacherFilter(mapFilters(json.filters)),
                    (page <= 1) ? setForeignTeacherList(json.list.map(mapItem)) : appendForeignTeacherList(json.list.map(mapItem)),
                    setForeignTeacherCurrent(json.currentPage)
                ]);
            }).catch(ex => {
            _debugger(ex);
            emit([
                setForeignTeacherIsFetching(false),
                setForeignTeacherFirstMount(true)
            ]);
        })
    }
};


const computedFilterParams = ({prices, domains, priceSelectedIndex, orders, domainSelectedIndex, others, domainSubSelectedIndex, otherSelectedIndex, sortSelectedIndex}) => {
    const params = {};
    if (priceSelectedIndex != 0) {
        const { max_price, min_price } = prices[priceSelectedIndex];
        params.max_price = max_price;
        params.min_price = min_price;
    }
    if (domainSelectedIndex != 0) {
        const {id} = domains[domainSelectedIndex];
        params.root_service_domain_id = id;
        if (domainSubSelectedIndex != 0) {
            params.service_domain_id = domains[domainSelectedIndex].categories[domainSubSelectedIndex].id;
        }
    }
    if (otherSelectedIndex != 0) {
        params.role = others[otherSelectedIndex].id;
    }
    params.order = orders[sortSelectedIndex].id;
    return params;
}

const mapFilters = ({prices, domains}) => ({
    domains: domains.map(({name, sub_domains, ...r}) => {
        sub_domains && sub_domains.unshift({id: -1, name: '不限'})
        return ({
            ...r, title: name,
            categories: sub_domains
                && sub_domains.map(({name, ...r})=>({...r, title: name}))
        })
    }),
    prices: prices.map(({name, ...r}) => ({...r, title: name}))
});

const mapItem = ({avatar, brief, name, tags, client_count, review_count, average_rate, ...rest}, i) =>
    ({
        ...rest, tags, title: name, content: brief/*.slice(0, 80)+'...'*/,
        thumbnail: {uri: avatar}, brief,
        bottomValues: [average_rate, client_count],
        rate: average_rate, clients: client_count, reviews: review_count
    })



export const setForeignTeacherIsFetching = (fetching) => _t($.FOREIGN_TEACHER_FETCHING_SET, {fetching})
export const setForeignTeacherFirstMount = (first) => _t($.FOREIGN_TEACHER_FIRST_SET, {first})
export const setForeignTeacherHasMore = (hasMore) => _t($.FOREIGN_TEACHER_HAS_MORE_SET, {hasMore})
export const setForeignTeacherList = (list) => _t($.FOREIGN_TEACHER_LIST_SET, {list})
export const setForeignTeacherCurrent = (current) => _t($.FOREIGN_TEACHER_CURRENT_SET, {current})
export const appendForeignTeacherList = (list) => _t($.FOREIGN_TEACHER_LIST_APPEND, {list})

export const setForeignTeacherFilter = (filters) => _t($.FOREIGN_TEACHER_FILTER_SET, {filters})
export const setForeignTeacherFilterPriceSelectedIndex = (priceSelectedIndex) => _t($.FOREIGN_TEACHER_FILTER_SET, {priceSelectedIndex})
export const setForeignTeacherFilterPriceTitle = (priceTitle) => _t($.FOREIGN_TEACHER_FILTER_SET, {priceTitle})
export const setForeignTeacherFilterDomainSelectedIndex = (domainSelectedIndex) => _t($.FOREIGN_TEACHER_FILTER_SET, {domainSelectedIndex})
export const setForeignTeacherFilterDomainSubSelectedIndex = (domainSubSelectedIndex) => _t($.FOREIGN_TEACHER_FILTER_SET, {domainSubSelectedIndex})
export const setForeignTeacherFilterDomainTitle = (domainTitle) => _t($.FOREIGN_TEACHER_FILTER_SET, {domainTitle})
export const setForeignTeacherFilterOtherSelectedIndex = (otherSelectedIndex) => _t($.FOREIGN_TEACHER_FILTER_SET, {otherSelectedIndex})
export const setForeignTeacherFilterOtherTitle = (otherTitle) => _t($.FOREIGN_TEACHER_FILTER_SET, {otherTitle})
export const setForeignTeacherFilterSortSelectedIndex = (sortSelectedIndex) => _t($.FOREIGN_TEACHER_FILTER_SET, {sortSelectedIndex})
export const setForeignTeacherFilterSortTitle = (sortTitle) => _t($.FOREIGN_TEACHER_FILTER_SET, {sortTitle})

