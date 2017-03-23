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
                        setForeignTeacherDetailBase({
                            name: o.name,
                            avatar: {uri: o.avatar},
                            tags: o.tags,
                            content: o.brief,
                            rate: o.average_rate,
                            reviews: o.review_count,
                            clients: o.client_count
                        }),
                        setForeignTeacherDetailExperiences(o.experiences.map(mapExperience)),
                        setForeignTeacherDetailEducations(o.educations.map(mapEduc)),
                        setForeignTeacherDetailSummary(o.summary),
                        setForeignTeacherDetailDescription(o.description),
                        setForeignTeacherDetailServices(o.services.map(mapService)),
                        setForeignTeacherFullFetch(false)
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

export const mapService = (({slug, head, price, price_per_hour, ...r}, i) => {
    const body = [], pre = "￥";
    let min = 0;
    if (slug === 'ServiceText_graduate') {
        if (price.l1_base!=null && price.l1_word!=null) {
            body.push(['语言润色', pre+price.l1_base, pre+price.l1_word])
        }
        if (price.l2_base!=null && price.l2_word!=null) {
            body.push(['深度修改', pre+price.l2_base, pre+price.l2_word])
        }
        if (price.l3_base!=null && price.l3_word!=null) {
            body.push(['VIP文书辅导', pre+price.l3_base, pre+price.l3_word])
        }
        min = Math.min(price.l1_base, price.l2_base, price.l3_base);
    } else if (slug === 'ServiceTextAssess_standard') {
        head = null;
        body.push(['服务价格', pre+price]);
        min = Math.min(price);
    } else if (slug === 'ServiceTextPackage_normal') {
        if (price.l2_u1!=null && price.l2_u2!= null && price.l2_u3!=null) {
            body.push(['深度修改套餐', {
                name: pre+price.l2_u1, align: 'center'
            }, {
                name: pre+price.l2_u2, align: 'center'
            }, pre+price.l2_u3]);
        }
        if (price.l3_u1!=null && price.l3_u2!= null && price.l3_u3!=null) {
            body.push(['VIP文书套餐',{
                name: pre+price.l3_u1, align: 'center'
            }, {
                name: pre+price.l3_u2, align: 'center'
            }, pre+price.l3_u3]);
        }
        head = head.map((name, i) => ({name, align: (i==1 || i==2) ? 'center' : null}))
        min = Math.min(price.l2_u1, price.l3_u1);
    } else if (slug === 'ServiceTalk_interview') {
        head = null;
        body.push(['服务价格', {
            name: pre+price_per_hour,
            append: ' / 60分钟'
        }]);
        min = Math.min(price_per_hour);
    }
    return {
        ...r, price: min, rSubText: '最低',
        table: {
            head,
            body
        }
    }
});


export const fetchForeignTeacherCommentDetail = (id, page=1, opts={}) => {
    const {rest, setFirst} = opts;
    return (emit, getState) => {
        id = id || getState().foreign_teacher_detail.base.id;
        if (page>1 && getState().foreign_teacher_detail.isFetching) {
            return;
        }
        emit([
            setForeignTeacherDetailCommentFetching(true)
        ]);
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
                        setForeignTeacherDetailCommentTotal(o.reviewCount),
                        setForeignTeacherDetailCommentLevels(statistics2Levels(o.statistics.distribution)),
                        setForeignTeacherDetailCommentSummary(o.statistics.summary),
                        setForeignTeacherDetailCommentAverage(Number(o.averageRate).toFixed(1)),
                        (page<=1 || rest)
                            ? setForeignTeacherDetailCommentList(o.reviews.map(mapComment))
                            : setForeignTeacherDetailCommentList(
                                o.reviews.map(mapComment), true
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

const mapExperience = ({organization_name, organization_logo, from_date, to_date, description, ...rest}) => ({
    ...rest, words: description, date_from: from_date, date_to: to_date,
    organization: organization_name,
    thumbnail: {uri: organization_logo}
})

const mapEduc = ({school_name, degree, major, from_date, to_date, school_logo, ...rest}) =>
    ({title: school_name, thumbnail: {uri: school_logo}, status: degree+(degree?' ':'')+major, date_from: from_date, date_to: to_date, ...rest})

const statistics2Levels = (statistics) => {
    const statis = statistics;
    const sum = +statis['1'] + +statis['2'] + +statis['3'] + +statis['4'] + +statis['5']
    return [
        ((+statis['5']/sum)*100).toFixed(1), ((+statis['4']/sum)*100).toFixed(1),
        ((+statis['3']/sum)*100).toFixed(1), ((+statis['2']/sum)*100).toFixed(1),
        ((+statis['1']/sum)*100).toFixed(1),
    ]
}

const mapComment = ({name, content, avatar, service_title, service_domain, created_at, ...rest}, i) => ({
    ...rest, title: name, comment: content, time: created_at,
    thumbnail: {uri: avatar}, service_domain, service_title,
    tags: [service_domain, service_title]
})


export const setForeignTeacherDetailFetching = (fetching) => _t($.FOREIGN_TEACHER_DETAIL_FETCHING_SET, {fetching})
export const setForeignTeacherDetailCommentFetching = (fetching) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_FETCHING_SET, {fetching})
export const setForeignTeacherDetailCommentAverage = (average) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_AVERAGE_SET, {average})
export const setForeignTeacherDetailCommentLevels = (list) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_LEVELS_SET, {list})
export const setForeignTeacherDetailCommentSummary = (summary) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_SUMMARY_SET, {summary})
export const setForeignTeacherDetailCommentList = (list, append) => _t($.FOREIGN_TEACHER_DETAIL_COMMENTS_SET, {list, append})
export const setForeignTeacherDetailCommentHasMore = (hasmore) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_HASMORE_SET, {hasmore})
export const setForeignTeacherDetailCommentCurrent = (current) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_CURR_SET, {current})
export const setForeignTeacherDetailCommentTotal = (total) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_TOTAL_SET, {total})
export const setForeignTeacherDetailCommentFirst = (first) => _t($.FOREIGN_TEACHER_DETAIL_COMMENT_FIRST_SET, {first})

export const setForeignTeacherDetailBase = (base) => _t($.FOREIGN_TEACHER_DETAIL_BASE_SET, {base})
export const setForeignTeacherFullFetch = (isFullFetch) => _t($.ABROAD_EXPERT_FULL_FETCHING_SET, {isFullFetch})
export const setForeignTeacherDetailExperiences = (list) => _t($.FOREIGN_TEACHER_DETAIL_EXPERIENCE_SET, {list})
export const setForeignTeacherDetailEducations = (list) => _t($.FOREIGN_TEACHER_DETAIL_EDUC_SET, {list})
export const setForeignTeacherDetailSummary = (summary) => _t($.FOREIGN_TEACHER_DETAIL_SUMMARY_SET, {summary})
export const setForeignTeacherDetailDescription = (description) => _t($.FOREIGN_TEACHER_DETAIL_DESCRIPTION_SET, {description})
export const setForeignTeacherDetailServices = (list) => _t($.FOREIGN_TEACHER_DETAIL_SERVICES_SET, {list})
