/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger} from '../helpers';
import {abroadExpertDetailURL, abroadExpertDetailCommentURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant'

export const fetchAbroadExpertDetail = (id) => {
    return (emit, getState) => {
        // if (getState().abroad_expert_detail.isFetching) {
        //     return;
        // }
        emit(setAbroadExpertDetailFetching(true));
        fetch(abroadExpertDetailURL+'?'+stringify({id}))
            .then(r => r.json())
            .then(o => {
                if (o.success == false) {
                    alert(o.message)
                } else {
                    o.other_topics.unshift({
                        id: o.id,
                        name: o.name,
                        target_client: o.target_client,
                        brief_description: o.brief_description,
                        description: o.description,
                        advisor_id: o.advisor_id,
                        tags: o.tags,
                        price: o.price
                    });
                    emit([
                        setAbroadExpertDetailExperiences(o.experiences.map(mapExperience)),
                        setAbroadExpertDetailEducations(o.educations.map(mapEduc)),
                        setAbroadExpertDetailAwards(o.awards.map(mapAward)),
                        setAbroadExpertDetailSummary(o.advisor_summary),
                        setAbroadExpertDetailDescription(o.advisor_description),
                        setAbroadExpertDetailServices(o.other_topics.map(mapTopic))
                    ]);
                }
                emit(setAbroadExpertDetailFetching(false));
            })
            .catch(e => {
                _debugger(e);
                emit(setAbroadExpertDetailFetching(false));
            })
    }
}


export const fetchAbroadExpertCommentDetail = (id, page=1, opts={}) => {
    const {rest, setFirst} = opts;
    return (emit, getState) => {
        id = id || getState().abroad_expert_detail.base.id;
        if (page>1 && getState().abroad_expert_detail.isFetching) {
            return;
        }
        emit([
            setAbroadExpertDetailCommentFetching(true)
        ]);
        fetch(abroadExpertDetailCommentURL+'?'+stringify({id, page}))
            .then(r => r.json())
            .then(o => {
                if (o.success == false) {
                    alert(o.message);
                } else {
                    emit([
                        !setFirst && getState().abroad_expert_detail.isCommentFirst && setAbroadExpertDetailCommentFirst(false),
                        setFirst && setAbroadExpertDetailCommentFirst(true),
                        setAbroadExpertDetailCommentHasMore(o.hasMoreInNextPage),
                        setAbroadExpertDetailCommentCurrent(o.currentPage),
                        setAbroadExpertDetailCommentTotal(o.reviewCount),
                        setAbroadExpertDetailCommentLevels(statistics2Levels(o.statistics.distribution)),
                        setAbroadExpertDetailCommentSummary(o.statistics.summary),
                        setAbroadExpertDetailCommentAverage(Number(o.averageRate).toFixed(1)),
                        (page<=1 || rest)
                            ? setAbroadExpertDetailCommentList(o.reviews.map((x, i) => mapComment(x, i, id)))
                            : setAbroadExpertDetailCommentList(
                                o.reviews.map((x, i) => mapComment(x, i, id)), true
                            )
                    ]);
                }
                emit(setAbroadExpertDetailCommentFetching(false));
            })
            .catch(e => {
                _debugger(e);
                emit(setAbroadExpertDetailCommentFetching(false));
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
};

const mapAward = ({name, issuer, winning_date, description}, i) => ({
    title: name, description,
    words: winning_date, origination: issuer
})

const mapTopic = ({price, tags, target_client, brief_description, description, ...r}, i) => ({
    ...r, rSubText: '最低',
    price, onBtnPress: () => alert(1),
    detail: {
        tags,
        contents: [
            '课程简述: '+brief_description,
            '适用用户: '+target_client,
            description,
        ]
    }
})

const mapExperience = ({organization_name, organization_logo, title, from_date, to_date, description, ...rest}) => ({
    ...rest, words: description,
    title,
    date_from: from_date, date_to: to_date,
    organization: organization_name,
    thumbnail: {uri: organization_logo}
})

const mapEduc = ({school_name, degree, major, from_date, to_date, school_logo, ...rest}) =>
    ({title: school_name, thumbnail: {uri: school_logo}, status: degree+(degree?' ':'')+major, date_from: from_date, date_to: to_date, ...rest})

const mapComment = ({name, content, avatar, course_id, created_at, topic_name, ...rest}, i, id) => ({
    ...rest, title: name, comment: content, time: created_at,
    thumbnail: {uri: avatar}, topic_name,
    tags: course_id == id ? [topic_name] : null
})


export const setAbroadExpertDetailFetching = (fetching) => _t($.ABROAD_EXPERT_DETAIL_FETCHING_SET, {fetching})
export const setAbroadExpertDetailCommentFetching = (fetching) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_FETCHING_SET, {fetching})
export const setAbroadExpertDetailCommentAverage = (average) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_AVERAGE_SET, {average})
export const setAbroadExpertDetailCommentLevels = (list) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_LEVELS_SET, {list})
export const setAbroadExpertDetailCommentSummary = (summary) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_SUMMARY_SET, {summary})
export const setAbroadExpertDetailCommentList = (list, append) => _t($.ABROAD_EXPERT_DETAIL_COMMENTS_SET, {list, append})
export const setAbroadExpertDetailCommentHasMore = (hasmore) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_HASMORE_SET, {hasmore})
export const setAbroadExpertDetailCommentCurrent = (current) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_CURR_SET, {current})
export const setAbroadExpertDetailCommentTotal = (total) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_TOTAL_SET, {total})
export const setAbroadExpertDetailCommentFirst = (first) => _t($.ABROAD_EXPERT_DETAIL_COMMENT_FIRST_SET, {first})

export const setAbroadExpertDetailBase = (base) => _t($.ABROAD_EXPERT_DETAIL_BASE_SET, {base})
export const setAbroadExpertDetailExperiences = (list) => _t($.ABROAD_EXPERT_DETAIL_EXPERIENCE_SET, {list})
export const setAbroadExpertDetailEducations = (list) => _t($.ABROAD_EXPERT_DETAIL_EDUC_SET, {list})
export const setAbroadExpertDetailSummary = (summary) => _t($.ABROAD_EXPERT_DETAIL_SUMMARY_SET, {summary})
export const setAbroadExpertDetailDescription = (description) => _t($.ABROAD_EXPERT_DETAIL_DESCRIPTION_SET, {description})
export const setAbroadExpertDetailAwards = (awards) => _t($.ABROAD_EXPERT_DETAIL_AWARD_SET, {awards})
export const setAbroadExpertDetailServices = (list) => _t($.ABROAD_EXPERT_DETAIL_SERVICES_SET, {list})
