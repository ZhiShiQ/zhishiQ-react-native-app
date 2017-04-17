/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    isFetching:true,
    id: -1,
    topic: '洒洒水',
    price: '',
    want: '',
    qq: '',
    skype: '',
    freeTime: '',

    // 简历领域
    resumeFields: [{label: "GGG"}, {label: "HHH"}],
    resumeFieldIndex: -1,
    // 申请领域
    applyFields: [{label: "GGG"}, {label: "HHH"}],
    applyFieldIndex: -1,
    // 申请子领域
    applySubFields: [[{label: "GGG1"}, {label: "HHH"}],[{label: "GGG2"}, {label: "HHH"}]],
    applySubFieldIndex: -1,
    // 申请学位
    applyDegrees: [{label: "EEE"}, {label: "FFF"}],
    applyDegreeIndex: -1,
    // 申请国家
    applyCountries: [{label: "CCC"}, {label: "DDD"}],
    applyCountryIndex: -1,
    // 目标语言
    aimLangs: [{label: "AAA"}, {label: "BBB"}],
    aimLangIndex: -1,
    // 服务等级
    levels: [{label: "深度修改", id: 1}, {label: "VIP"}],
    levelIndex: 0,
    // 文档类型
    docTypes: [{label: "PS", id: 1}, {label: "VIP"}],
    docTypeIndex: 0,
    // 文书语言
    docLangs: [{label: "PSSS", id: 1}, {label: "VIP"}],
    docLangIndex: -1,

    adviseSelects: [
        {label: "不指定", type: "none"},
        {label: "指定文书顾问", type: "person"},
        {label: "指定顾问等级", type: "level"}
    ],
    adviseType: 'none',

    teacherSelects: [
        {label: "不指定", type: "none"},
        {label: "指定主导师", type: "person"},
    ],
    teacherType: 'person',

    adviserLevels: [
        {label: "LV1"}, {label: "LV2"}, {label: "LV3"},
    ],
    adviserLevelIndex: 0,

    paperManagerEnable: false,
    skypeEnable: false,
    urgentEnable: false,
    preTranslateEnable: false,

    advisers: [],
    selectAdviserIndex: -1,

    teachers: [],
    selectTeacherIndex: -1,

    // enum("completePaper", "singlePaper", "resume", "topic")
    _type: "completePaper",
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.ORDER_CONFIRM_ROOT_SET:
            return Map(newState).merge(rest).toJS();
        default:
            return newState;
    }
}
