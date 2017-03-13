/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger} from '../helpers';
import {foreignTeacherDetailURL, foreignTeacherDetailCommentURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant'

export const fetchForeignTeacherDetail = (id) => {
    return (emit, getState) => {
        // if (getState().foreign_teacher_detail.isFetching) {
        //     return;
        // }
        emit(setForeignTeacherDetailFetching(true));
        fetch(foreignTeacherDetailURL+'?'+stringify({id}))
            .then(r => r.json())
            .then(o => {
                if (o.success == false) {
                    alert(o.message);
                } else {
                    emit([
                        setForeignTeacherDetailExperiences(o.experiences),
                        setForeignTeacherDetailEducations(o.educations),
                        setForeignTeacherDetailServices(o.services)
                    ]);
                }
                emit(setForeignTeacherDetailFetching(false));
            })
            .catch(e => {
                _debugger(e);
                emit(setForeignTeacherDetailFetching(false));
            })
    }
}


export const fetchForeignTeacherCommentDetail = (id, page=1, opts={}) => {
    const {rest, setFirst} = opts;
    return (emit, getState) => {
        id = id || getState().foreign_teacher_detail.base.id;
        emit(setForeignTeacherDetailCommentFetching(true));
        fetch(foreignTeacherDetailCommentURL+'?'+stringify({id, page}))
            .then(r => r.json())
            .then(o => {
                if (o.success == false) {
                    alert(o.message);
                } else {
                    emit([
                        !setFirst && getState().foreign_teacher_detail.isCommentFirst && setForeignTeacherDetailCommentFirst(false),
                        setFirst && setForeignTeacherDetailCommentFirst(true),
                        setForeignTeacherDetailCommentHasMore(o.hasMoreInNextPage),
                        setForeignTeacherDetailCommentCurrent(o.currentPage),
                        setForeignTeacherDetailCommentLevels(statistics2Levels(o.statistics)),
                        setForeignTeacherDetailCommentAverage(Number(o.averageRate).toFixed(1)),
                        (page<=1 || rest)
                            ? setForeignTeacherDetailCommentList(o.reviews.map(mapComment))
                            : setForeignTeacherDetailCommentList(
                                getState().foreign_teacher_detail.comment.comments.concat(o.reviews.map(mapComment))
                            )
                    ]);
                }
                emit(setForeignTeacherDetailCommentFetching(false));
            })
            .catch(e => {
                _debugger(e);
                emit(setForeignTeacherDetailCommentFetching(false));
            })
    }
}

const statistics2Levels = (statistics) => {
    const statis = statistics;
    const sum = +statis['1'] + +statis['2'] + +statis['3'] + +statis['4'] + +statis['5']
    return [
        ((+statis['5']/sum)*100).toFixed(1), ((+statis['4']/sum)*100).toFixed(1),
        ((+statis['3']/sum)*100).toFixed(1), ((+statis['2']/sum)*100).toFixed(1),
        ((+statis['1']/sum)*100).toFixed(1),
    ]
}

const mapComment = ({name, content, avatar, created_at, ...rest}, i) => ({
    ...rest, title: name, comment: content, time: created_at,
    thumbnail: {uri: avatar}
})


export const setForeignTeacherDetailFetching = (fetching) => _t($.FOREIGN_TEACHER_DETAIL_FETCHING_SET, {fetching})
export const setForeignTeacherDetailCommentFetching = (fetching) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_FETCHING_SET, {fetching})
export const setForeignTeacherDetailCommentAverage = (average) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_AVERAGE_SET, {average})
export const setForeignTeacherDetailCommentLevels = (list) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_LEVELS_SET, {list})
export const setForeignTeacherDetailCommentList = (list) => _t($.FOREIGN_TEACHER_DETAIL_COMMENTS_SET, {list})
export const setForeignTeacherDetailCommentHasMore = (hasmore) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_HASMORE_SET, {hasmore})
export const setForeignTeacherDetailCommentCurrent = (current) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_CURR_SET, {current})
export const setForeignTeacherDetailCommentFirst = (first) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_FIRST_SET, {first})

export const setForeignTeacherDetailBase = (base) => _t($.FOREIGN_TEACHER_DETAIL_BASE_SET, {base})
export const setForeignTeacherDetailExperiences = (list) => _t($.FOREIGN_TEACHER_DETAIL_EXPERIENCE_SET, {list})
export const setForeignTeacherDetailEducations = (list) => _t($.FOREIGN_TEACHER_DETAIL_EDUC_SET, {list})
export const setForeignTeacherDetailServices = (list) => _t($.FOREIGN_TEACHER_DETAIL_SERVICES_SET, {list})
