/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    openModal: false,
    modalType: 'referer',


    timeRange: {
        start: new Date(),
        end: new Date(new Date() - (1000*60*60*24)),
        deletable: false
    },
    referer: {
        target: '',
    },
    abroadExpertForm: {
        items: [{
            leftText: "加拿大留学生活学习",
            rightText: "¥21",
            items: [{
                leftText: "加拿大留学生活学习",
            }, {
                leftText: "加拿大留学生活学习",
            }]
        }, {
            leftText: "加拿大留学生活学习",
            rightText: "¥21"
        }, {
            leftText: "商科master&PHD混申，欧美新加坡混申那些事",
            rightText: "¥21"
        }],
        index: 0,
        name: "Nick Hu",
        thumbnail: {}
    },

    picker: {
        items: []
    }
};

export default function (state=initialState, action) {
    let newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SET_COMMON_MODAL_OPEN:
            return {...newState, openModal: rest.isOpen}
        case $.SET_COMMON_MODAL_TYPE:
            return {...newState, modalType: rest._type}
        case $.ABROAD_EXPERT_FORM_SET:
            return {...newState, abroadExpertForm: {...newState.abroadExpertForm, ...rest}};
        case $.MODAL_REFERER_SET:
            return fromJS(newState).setIn(['referer'].concat(rest.keys), rest.data).toJS();
        case $.MODAL_TIME_RANGE_SET:
            return fromJS(newState).setIn(['timeRange'].concat(rest.keys), rest.data).toJS();
        case $.MODAL_PICKER_SET:
            return fromJS(newState).setIn(['picker'].concat(rest.keys), rest.data).toJS();
        default:
            return newState;
    }
}
