/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    activeIndex: 0,
    people: [{
        avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
        name: 'Abxxxby R',
        rate: 4.9,
        appointNum: 599,
        content: '伦敦艺术大学面试招生官',
        tags: ['一站式申请', '全套文书导师', '文书导师']
    }, {
        avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
        name: 'Abby R',
        rate: 4.9,
        appointNum: 599,
        content: '伦敦艺术大学面试招生官',
        tags: ['一站式申请', '全套文书导师', '文书导师']
    }],
    services: [{
        avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
        name: 'Abby R',
        rate: 4.9,
        appointNum: 1233,
        content: '由留学行家、外籍文书导师、面试导师、签证导师和辅导员组成的5V1导师团队，为您提...'
    }, {
        avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
        name: 'Abby JR',
        rate: 4.9,
        appointNum: 1233,
        content: '由留学行家、外籍文书导师、面试导师、签证导师和辅导员组成的5V1导师团队，为您提...'
    }]
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_MY_ACTIVE_COLLECTION_TAB:
            return {...newState, activeIndex: rest.index};
        case $.MY_COLLECTION_PEOPLE_REMOVE_BY_INDEX:
            return fromJS(newState).removeIn(['people', rest.index]).toJS();
        case $.MY_COLLECTION_SERVICES_REMOVE_BY_INDEX:
            return fromJS(newState).removeIn(['services', rest.index]).toJS();
        case $.MY_COLLECTION_PEOPLE_SET:
            return fromJS(newState).set('people', rest.people).toJS();
        case $.MY_COLLECTION_SERVICES_SET:
            return fromJS(newState).set('services', rest.services).toJS();
        default:
            return newState;
    }
}
