/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger} from '../helpers';
import * as $ from '../constant'
import {teachersURL, oneStepURL} from '../helpers/remote-urls'
import {stringify} from 'querystring'
export const fetchOrderConfirmTeachers = (q) =>
    (emit, getState) =>
        fetch(teachersURL + '?' + stringify({q, pageSize: 5}))
            .then(r => r.json())
            .then(o => {
                emit(setOrderConfirmTeachers(o.list.map(
                    ({client_count, average_rate, schools, ...rest}) => ({
                        ...rest,
                        average: average_rate,
                        clients: client_count,
                        school: schools[0],
                        intro: '面试招生官'
                    })
                )))
            })
export const fetchOrderConfirmOneStepOptions = () =>
    (emit, getState) =>
    emit(setOrderConfirmOptionsFetching(true)) &&
    fetch(oneStepURL + '?' + stringify({service: 'service-full-package'}))
        .then(r => r.json())
        .then(o => {
            const mapFunc = x => ({id: x.id, label: x.name})
            let keys = Object.keys(o.school_domains);
            const subs = keys.reduce((p, a) => {
                p.push(o.school_domains[a].map(mapFunc));
                return p;
            }, []);
            // alert(JSON.stringify(subs))
            emit([
                setOrderConfirmApplyDegrees(o.apply_degrees.map(mapFunc)),
                setOrderConfirmApplyCountries(o.country_degrees.map(mapFunc)),
                setOrderConfirmApplyFields(keys.map(s => ({label: s, id: s == '不确定' ? -1 : 1}))),
                setOrderConfirmApplySubFields(subs)
            ])
        }).catch(ex => _debugger(ex))
        .then(() => emit(setOrderConfirmOptionsFetching(false)))
export const orderConfirmReset = () =>
    (emit, getState) =>
        emit([
            setOrderConfirmLevelIndex(0), setOrderConfirmAimLangIndex(-1), setOrderConfirmApplyCountryIndex(-1),
            setOrderConfirmApplyDegreeIndex(-1), setOrderConfirmApplyFieldIndex(-1),
            setOrderConfirmAdviseType('none'), setOrderConfirmAdviserLevelIndex(0), setOrderConfirmPaperManagerEnable(false),
            setOrderConfirmSkypeEnable(false), setOrderConfirmUrgentEnable(false), setOrderConfirmPreTranslateEnable(false),
            setOrderConfirmAdvisers([]), setOrderConfirmSelectAdviserIndex(-1),
            setOrderConfirmTeachers([]), setOrderConfirmSelectTeacherIndex(-1),
            setOrderConfirmTeacherType('person')
        ]);

export const setOrderConfirmId = (id) => _t($.ORDER_CONFIRM_ROOT_SET, {id});
export const setOrderConfirmTopic = (topic) => _t($.ORDER_CONFIRM_ROOT_SET, {topic});
export const setOrderConfirmSkype = (skype) => _t($.ORDER_CONFIRM_ROOT_SET, {skype});
export const setOrderConfirmFreeTime = (freeTime) => _t($.ORDER_CONFIRM_ROOT_SET, {freeTime});
export const setOrderConfirmQQ = (qq) => _t($.ORDER_CONFIRM_ROOT_SET, {qq});
export const setOrderConfirmWant = (want) => _t($.ORDER_CONFIRM_ROOT_SET, {want});
export const setOrderConfirmPrice = (price) => _t($.ORDER_CONFIRM_ROOT_SET, {price});

export const setOrderConfirmLevels = (levels) => _t($.ORDER_CONFIRM_ROOT_SET, {levels});
export const setOrderConfirmLevelIndex = (levelIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {levelIndex});

export const setOrderConfirmApplyFields = (applyFields) => _t($.ORDER_CONFIRM_ROOT_SET, {applyFields});
export const setOrderConfirmApplyFieldIndex = (applyFieldIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {applyFieldIndex});

export const setOrderConfirmApplySubFields = (applySubFields) => _t($.ORDER_CONFIRM_ROOT_SET, {applySubFields});
export const setOrderConfirmApplySubFieldIndex = (applySubFieldIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {applySubFieldIndex});

export const setOrderConfirmOptionsFetching = (isFetching) => _t($.ORDER_CONFIRM_ROOT_SET, {isFetching});

export const setOrderConfirmApplyDegrees = (applyDegrees) => _t($.ORDER_CONFIRM_ROOT_SET, {applyDegrees});
export const setOrderConfirmApplyDegreeIndex = (applyDegreeIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {applyDegreeIndex});

export const setOrderConfirmApplyCountries = (applyCountries) => _t($.ORDER_CONFIRM_ROOT_SET, {applyCountries});
export const setOrderConfirmApplyCountryIndex = (applyCountryIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {applyCountryIndex});

export const setOrderConfirmAimLangs = (aimLangs) => _t($.ORDER_CONFIRM_ROOT_SET, {aimLangs});
export const setOrderConfirmAimLangIndex = (aimLangIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {aimLangIndex});

export const setOrderConfirmResumeFields = (resumeFields) => _t($.ORDER_CONFIRM_ROOT_SET, {resumeFields});
export const setOrderConfirmResumeFieldIndex = (resumeFieldIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {resumeFieldIndex});

export const setOrderConfirmDocTypes = (docTypes) => _t($.ORDER_CONFIRM_ROOT_SET, {docTypes});
export const setOrderConfirmDocTypeIndex = (docTypeIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {docTypeIndex});

export const setOrderConfirmDocLangs = (docLangs) => _t($.ORDER_CONFIRM_ROOT_SET, {docLangs});
export const setOrderConfirmDocLangIndex = (docLangIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {docLangIndex});

export const setOrderConfirmPaperManagerEnable = (paperManagerEnable) => _t($.ORDER_CONFIRM_ROOT_SET, {paperManagerEnable});
export const setOrderConfirmPreTranslateEnable = (preTranslateEnable) => _t($.ORDER_CONFIRM_ROOT_SET, {preTranslateEnable});
export const setOrderConfirmUrgentEnable = (urgentEnable) => _t($.ORDER_CONFIRM_ROOT_SET, {urgentEnable});
export const setOrderConfirmSkypeEnable = (skypeEnable) => _t($.ORDER_CONFIRM_ROOT_SET, {skypeEnable});

export const setOrderConfirmType = (type) => _t($.ORDER_CONFIRM_ROOT_SET, {_type: type});
export const setOrderConfirmAdvisers = (advisers) => _t($.ORDER_CONFIRM_ROOT_SET, {advisers});
export const setOrderConfirmSelectAdviserIndex = (selectAdviserIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {selectAdviserIndex});
export const setOrderConfirmTeachers = (teachers) => _t($.ORDER_CONFIRM_ROOT_SET, {teachers});
export const setOrderConfirmSelectTeacherIndex = (selectTeacherIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {selectTeacherIndex});

export const setOrderConfirmAdviseType = (adviseType) => _t($.ORDER_CONFIRM_ROOT_SET, {adviseType});
export const setOrderConfirmAdviseSelects = (adviseSelects) => _t($.ORDER_CONFIRM_ROOT_SET, {adviseSelects});
export const setOrderConfirmTeacherType = (teacherType) => _t($.ORDER_CONFIRM_ROOT_SET, {teacherType});
export const setOrderConfirmTeacherSelects = (teacherSelects) => _t($.ORDER_CONFIRM_ROOT_SET, {teacherSelects});

export const setOrderConfirmAdviserLevelIndex = (adviserLevelIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {adviserLevelIndex});
export const setOrderConfirmAdviserLevels = (adviserLevels) => _t($.ORDER_CONFIRM_ROOT_SET, {adviserLevels});
