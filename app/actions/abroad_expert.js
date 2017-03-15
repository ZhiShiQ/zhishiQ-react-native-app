/**
 * Created by moyu on 2017/2/26.
 */
import {stringify} from 'querystring'
import {_t, _debugger} from '../helpers';
import * as $ from '../constant';
import * as U from '../helpers/remote-urls';



export const fetchAbroadExpert = (page=1, opts={}) => {
    const {reset, resetList} = opts;
    return (emit, getState) => {
        const { hasMore, filters } = getState().abroad_expert;
        const params = computedFilterParams(filters);
        if (!hasMore && !reset && !resetList) {
            return;
        }
        if (resetList || reset) {
            emit([
                setAbroadExpertList([]),
                setAbroadExpertHasMore(false)
            ])
        }
        return emit(setAbroadExpertIsFetching(true)) &&
            fetch(U.abroadExpertURL + '?' + stringify({page: page, ...params}), {
                headers: {'Content-Type': 'application/json'}
            })
                .then(r => r.json())
                .then(json => {
                    json.list = json.list.map(({average_rate, ...rest}) => ({
                        ...rest, average_rate: Number(Number(average_rate).toFixed(1))
                    }));
                    if (reset) {
                        json.filters.degrees.unshift({id: -1, name: '不限'});
                        json.filters.nations.unshift({id: -1, name_zh: '全球'});
                        json.filters.domains.unshift({id: -1, name: '不限'});
                    }
                    emit([
                        setAbroadExpertHasMore(json.hasMoreInNextPage),
                        setAbroadExpertIsFetching(false),
                        getState().abroad_expert.firstMount && setAbroadExpertFirstMount(false),
                        (reset && json.filters) && setAbroadExpertFilter(mapFilters(json.filters)),
                        (page <= 1) ? setAbroadExpertList(json.list.map(mapItem)) : appendAbroadExpertList(json.list.map(mapItem)),
                        setAbroadExpertCurrent(json.currentPage)
                    ]);
                }).catch(ex => {
                _debugger(ex);
                emit([
                    setAbroadExpertIsFetching(false),
                    setAbroadExpertFirstMount(true)
                ]);
            })
    }
};


const computedFilterParams = ({ways, nations, degrees, domains, waySelectedIndex, nationSelectedIndex, orders, domainSelectedIndex, domainSubSelectedIndex, degreeSelectedIndex, sortSelectedIndex}) => {
    const params = {};
    if (waySelectedIndex != 0) {
        const { id } = ways[waySelectedIndex];
        params.taxonomy = id;
    }
    if (domainSelectedIndex != 0) {
        const {id} = domains[domainSelectedIndex];
        params.root_major = id;
        if (domainSubSelectedIndex != 0) {
            params.major = domains[domainSelectedIndex].categories[domainSubSelectedIndex].id;
        }
    }
    if (degreeSelectedIndex != 0) {
        params.degree = degrees[degreeSelectedIndex].id;
    }
    if (nationSelectedIndex != 0) {
        params.nation = nations[nationSelectedIndex].id;
    }

    params.order = orders[sortSelectedIndex].id;
    return params;
}

const mapFilters = ({degrees, nations, domains}) => {
    return {
        domains: domains.map(({name, sub_domains, ...r}) => {
            sub_domains && sub_domains.unshift({id: -1, name: '不限'})
            return ({
                ...r, title: name,
                categories: sub_domains
                && sub_domains.map(({name, ...r})=>({...r, title: name}))
            })
        }),
        degrees: degrees.map(({name, ...r}) => ({...r, title: name})),
        nations: nations.map(({name_zh, ...r}) => ({...r, title: name_zh}))
    }
};

const mapItem = ({avatar, brief, advisor_name, name, tags, client_count, review_count, average_rate, ...rest}, i) =>
    ({
        ...rest, tags, title: name, content: brief/*.slice(0, 80)+'...'*/,
        thumbnail: {uri: avatar}, brief, points: advisor_name,
        mark: average_rate, clients: client_count, appointNum: review_count,
        intro: brief
    });



export const setAbroadExpertIsFetching = (fetching) => _t($.ABROAD_EXPERT_FETCHING_SET, {fetching})
export const setAbroadExpertFirstMount = (first) => _t($.ABROAD_EXPERT_FIRST_SET, {first})
export const setAbroadExpertHasMore = (hasMore) => _t($.ABROAD_EXPERT_HAS_MORE_SET, {hasMore})
export const setAbroadExpertList = (list) => _t($.ABROAD_EXPERT_LIST_SET, {list})
export const setAbroadExpertCurrent = (current) => _t($.ABROAD_EXPERT_CURRENT_SET, {current})
export const appendAbroadExpertList = (list) => _t($.ABROAD_EXPERT_LIST_APPEND, {list})

export const setAbroadExpertFilter = (filters) => _t($.ABROAD_EXPERT_FILTER_SET, {filters})
export const setAbroadExpertFilterNationSelectedIndex = (nationSelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {nationSelectedIndex})
export const setAbroadExpertFilterNationTitle = (nationTitle) => _t($.ABROAD_EXPERT_FILTER_SET, {nationTitle})
export const setAbroadExpertFilterDomainSelectedIndex = (domainSelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {domainSelectedIndex})
export const setAbroadExpertFilterDomainSubSelectedIndex = (domainSubSelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {domainSubSelectedIndex})
export const setAbroadExpertFilterDomainTitle = (domainTitle) => _t($.ABROAD_EXPERT_FILTER_SET, {domainTitle})
export const setAbroadExpertFilterDegreeSelectedIndex = (degreeSelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {degreeSelectedIndex})
export const setAbroadExpertFilterDegreeTitle = (degreeTitle) => _t($.ABROAD_EXPERT_FILTER_SET, {degreeTitle})
export const setAbroadExpertFilterSortSelectedIndex = (sortSelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {sortSelectedIndex})
export const setAbroadExpertFilterSortTitle = (sortTitle) => _t($.ABROAD_EXPERT_FILTER_SET, {sortTitle})
export const setAbroadExpertFilterWaySelectedIndex = (waySelectedIndex) => _t($.ABROAD_EXPERT_FILTER_SET, {waySelectedIndex})

