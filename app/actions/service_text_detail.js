/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger, setToken} from '../helpers';
import {signInURL, getVerifyURL, signUpURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
import * as $ from '../constant';

const _setRoot = (key, data) => _t($.SERVICE_TEXT_SERVICE_DETAIL_ROOT_SET, {key, data});
const _setInner = (keys, data) => _t($.SERVICE_TEXT_SERVICE_DETAIL_INNER_SET, {keys, data});

export const setServiceDetailFetching = (isFetching) => _setRoot('isFetching', isFetching);
export const setServiceDetailBase = (base) => _setRoot('base', base);
export const setServiceDetailFirst = (isFirst) => _setRoot('isFirst', isFirst);

export const setServiceDetailInnerServices = (services) => _setInner(['detail', 'services'], services);
export const setServiceDetailInnerTeacherInfo = (teacherInfo) => _setInner(['detail', 'teacherInfo'], teacherInfo);
export const setServiceDetailInnerCharacter = (character) => _setInner(['detail', 'character'], character);
export const setServiceDetailInnerPromise = (promise) => _setInner(['detail', 'promise'], promise);
export const setServiceDetailInnerProcess = (process) => _setInner(['detail', 'process'], process);
export const setServiceDetailInnerOfferRank = (offerRank) => _setInner(['detail', 'offerRank'], offerRank);


export const setServiceDetailCommentHasMore = (hasMore) => _setInner(['comment', 'hasMore'], hasMore);
export const setServiceDetailCommentFirst = (first) => _setRoot('isCommentFirst', first);
export const setServiceDetailCommentFetching = (fetching) => _setRoot('isCommentFetching', fetching);
export const setServiceDetailCommentCurrent = (current) => _setInner(['comment', 'currentPage'], current);
export const setServiceDetailCommentList = (list) => _setInner(['comment', 'comments'], list)

const mapComment = ({name, content, avatar, service_title, service_domain, created_at, ...rest}, i) => ({
    ...rest, title: name, comment: content, time: created_at,
    thumbnail: {uri: avatar}, service_domain, service_title,
    tags: [service_domain, service_title]
})
export const fetchServiceCommentDetail = ({page=1, url, source}, opts={}) => {
    const {rest, setFirst} = opts;
    return (emit, getState) => {
        if (page>1 && getState()[source].isFetching) {
            return;
        }
        emit([
            setServiceDetailCommentFetching(true)
        ]);
        fetch(url+'?'+stringify({page}))
            .then(r => r.json())
            .then(o => {
                if (o.success == false) {
                    alert(o.message);
                } else {
                    o = o.data;
                    emit([
                        !setFirst && getState()[source].isCommentFirst && setServiceDetailCommentFirst(false),
                        setFirst && setServiceDetailCommentFirst(true),
                        setServiceDetailCommentHasMore(o.hasMoreInNextPage),
                        setServiceDetailCommentCurrent(o.currentPage),
                        (page<=1 || rest)
                            ? setServiceDetailCommentList(o.service_reviews.map((x, i) => mapComment(x, i)))
                            : setServiceDetailCommentList(
                                getState()[source].comment.comments.concat(o.service_reviews.map(mapComment))
                            ),
                    ]);
                }
                emit(setServiceDetailCommentFetching(false));
            })
            .catch(e => {
                _debugger(e);
                emit(setServiceDetailCommentFetching(false));
            })
    }
}
