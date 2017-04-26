/**
 * Created by moyu on 2017/2/26.
 */
import {_t, _debugger} from '../helpers';
import * as $ from '../constant';
import {searchPeopleURL, oneStepURL} from '../helpers/remote-urls';
import {stringify} from 'querystring';
const SIZE = 5;

export const fetchOrderConfirmTeachers = (q) =>
    (emit, getState) =>
        fetch(searchPeopleURL + '?' + stringify({q, pageSize: SIZE, role: 'one_stop'}))
            .then(r => r.json())
            .then(o => {
                emit(setOrderConfirmTeachers(o.list.map(
                    ({client_count, average_rate, schools, roles=[], ...rest}) => ({
                        ...rest,
                        average: average_rate,
                        clients: client_count,
                        school: schools[0],
                        intro: roles[0]
                    })
                )))
            });

const mapObj = {
    completePaper: {
        service: "service_text_resume",
        role: 'editor',
        adviseSelects: [
            {label: "不指定", type: "none", id: 0},
            {label: "指定文书顾问", type: "person", id: 1},
            {label: "指定顾问等级", type: "level", id: 2}
        ]
    },
    resume: {
        service: "service_text_resume",
        role: 'editor',
        adviseSelects: [
            {label: "不指定", type: "none", id: 0},
            {label: "指定文书顾问", type: "person", id: 1},
            {label: "指定顾问等级", type: "level", id: 2}
        ]
    },
    oneStepApply: {
        service: "service_full_package",
        role: 'package_editor',
        adviseSelects: [
            {label: "不指定", type: "none", id: 0},
            {label: "指定文书顾问", type: "person", id: 1},
        ]
    },
    singlePaper: {
        service: "service_text_graduate",
        role: 'editor',
        adviseSelects: [
            {label: "不指定", type: "none", id: 0},
            {label: "指定文书顾问", type: "person", id: 1},
            {label: "指定顾问等级", type: "level", id: 2}
        ]
    }
};



export const fetchOrderConfirmAdvisor = (q) =>
    (emit, getState) => {
        const {order_confirm: {_type, applyFieldIndex, applySubFields, applySubFieldIndex}} = getState();
        const params = {q, pageSize: SIZE, role: mapObj[_type].role};
        params['domain_id'] = "";
        if (applySubFields[applyFieldIndex] && applySubFields[applyFieldIndex][applySubFieldIndex]) {
            params['domain_id'] = applySubFields[applyFieldIndex][applySubFieldIndex].id;
        }
        return fetch(searchPeopleURL + '?' + stringify(params))
            .then(r => r.json())
            .then(o => {
                emit(setOrderConfirmAdvisers(o.list.map(
                    ({client_count, average_rate, schools, roles = [], ...rest}) => ({
                        ...rest,
                        average: average_rate,
                        clients: client_count,
                        school: schools[0],
                        intro: roles[0]
                    })
                )))
            });
    }

const mapFunc = x => ({id: x.id, label: x.name})

export const fetchOrderConfirmOneStepOptions = () =>
    _fetchOrderConfirmOptions({service: 'service_full_package'})

export const fetchOrderConfirmOptions = () =>
    (emit, getState) => {
        const {order_confirm: {_type}} = getState();
        return _fetchOrderConfirmOptions({
            service: mapObj[_type].service,
            adviseSelects: mapObj[_type].adviseSelects
        })(emit, getState);
    }

export const fetchOrderConfirmSinglePaperOptions = () =>
    _fetchOrderConfirmOptions({service: 'service_text_graduate'})


const _fetchOrderConfirmOptions = ({service='service_full_package', adviseSelects}) =>
    (emit, getState) =>
    emit(setOrderConfirmOptionsFetching(true)) &&
    fetch(oneStepURL + '?' + stringify({service}))
        .then(r => r.json())
        .then(o => {
            if (o.school_domains) {
                let keys = Object.keys(o.school_domains);
                const subs = keys.reduce((p, a) => {
                    p.push(o.school_domains[a].map(mapFunc));
                    return p;
                }, []);
                emit([
                    setOrderConfirmApplyFields(keys.map(s => ({label: s, id: (s == '不确定'||s.toLowerCase()=='uncertain') ? -1 : 1}))),
                    setOrderConfirmApplySubFields(subs)
                ])
            }

            if (o.is_urgent) {
                emit(
                    setOrderConfirmUrgentSelects([
                        o.is_urgent['1'].map(mapFunc),
                        o.is_urgent['2'].map(mapFunc),
                        o.is_urgent['3'].map(mapFunc)
                    ])
                )
            }
            emit([
                adviseSelects && setOrderConfirmAdviseSelects(adviseSelects),
                o.apply_degrees && o.apply_degrees.length && setOrderConfirmApplyDegrees(o.apply_degrees.map(mapFunc)),
                o.apply_countries && o.apply_countries.length && setOrderConfirmApplyCountries(o.apply_countries.map(mapFunc)),
                o.document_types && o.document_types.length && setOrderConfirmDocTypes(o.document_types.map(mapFunc)),
                o.need_translation && setOrderConfirmDocLangs(o.need_translation.map(mapFunc)),
                o.advisor_level && o.advisor_level.length && setOrderConfirmAdviserLevels(o.advisor_level.map(mapFunc)),
                o.service_level && o.service_level.length && setOrderConfirmLevels(o.service_level.map(mapFunc))
            ])
        }).catch(ex => _debugger(ex))
        .then(() => {
            emit(setOrderConfirmOptionsFetching(false))
        })


export const orderConfirmReset = () =>
    (emit, getState) =>
        emit([
            setOrderConfirmLevelIndex(0), setOrderConfirmAimLangIndex(-1),
            setOrderConfirmApplyCountryIndex(0), setOrderConfirmDocLangIndex(0),
            setOrderConfirmDocTypeIndex(0),
            setOrderConfirmApplyDegreeIndex(-1), setOrderConfirmApplyFieldIndex(-1),
            setOrderConfirmAdviseType('none'), setOrderConfirmPaperManagerEnable(false),
            setOrderConfirmSkypeEnable(false), setOrderConfirmPreTranslateEnable(false),
            setOrderConfirmAdviserLevelIndex(0), setOrderConfirmUrgentIndex(0),
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
export const setOrderConfirmUrgentSelects = (urgentSelects) => _t($.ORDER_CONFIRM_ROOT_SET, {urgentSelects});
export const setOrderConfirmUrgentIndex = (urgentIndex) => _t($.ORDER_CONFIRM_ROOT_SET, {urgentIndex});
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
export const setOrderConfirmData = (data) => _t($.ORDER_CONFIRM_ROOT_SET, {data});
export const setOrderConfirmAdviserLevels = (adviserLevels) => _t($.ORDER_CONFIRM_ROOT_SET, {adviserLevels});
