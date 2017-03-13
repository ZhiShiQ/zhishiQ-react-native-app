/**
 * Created by moyu on 2017/2/26.
 */
import {stringify} from 'querystring'
import {_t, _debugger} from '../helpers';
import * as $ from '../constant';
import * as U from '../helpers/remote-urls';



export const fetchForeignTeacher = (page=1, opts={}) => {
    const {reset} = opts;
    return (emit, getState) => {
        if (!getState().foreign_teacher.hasMore) {
            return;
        }
        return emit(setForeignTeacherIsFetching(true)) &&
            fetch(U.foreignTeacherURL + '?' + stringify({page: page}), {
                headers: {'Content-Type': 'application/json'}
            })
            .then(r => r.json())
            .then(json => {
                json.list = json.list.map(({average_rate, ...rest}) => ({
                    ...rest, average_rate: Number(Number(average_rate).toFixed(1))
                }))
                emit([
                    setForeignTeacherIsFetching(false),
                    getState().foreign_teacher.firstMount && setForeignTeacherFirstMount(false),
                    setForeignTeacherHasMore(json.hasMoreInNextPage),
                    (page <= 1 || reset) && setForeignTeacherFilter(json.filters),
                    (page <= 1 || reset) ? setForeignTeacherList(json.list.map(mapItem)) : appendForeignTeacherList(json.list.map(mapItem)),
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

const mapItem = ({avatar, brief, name, tags, client_count, review_count, average_rate, ...rest}, i) =>
    ({
        ...rest, tags, title: name, content: brief.slice(0, 80)+'...',
        thumbnail: {uri: avatar}, brief,
        bottomValues: [average_rate, client_count],
        rate: average_rate, clients: client_count, reviews: review_count
    })



export const setForeignTeacherIsFetching = (fetching) => _t($.FOREIGN_TEACHER_FETCHING_SET, {fetching})
export const setForeignTeacherFirstMount = (first) => _t($.FOREIGN_TEACHER_FIRST_SET, {first})
export const setForeignTeacherHasMore = (hasMore) => _t($.FOREIGN_TEACHER_FETCHING_SET, {hasMore})
export const setForeignTeacherList = (list) => _t($.FOREIGN_TEACHER_LIST_SET, {list})
export const setForeignTeacherCurrent = (current) => _t($.FOREIGN_TEACHER_CURRENT_SET, {current})
export const appendForeignTeacherList = (list) => _t($.FOREIGN_TEACHER_LIST_APPEND, {list})

export const setForeignTeacherFilter = (filters) => _t($.FOREIGN_TEACHER_FILTER_SET, {filters})

