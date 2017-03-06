/**
 * Created by moyu on 2017/2/26.
 */
import {Map, List, Set} from 'immutable';
import * as $ from '../constant';

const initialState = {
    openModal: false,
    modalType: 'referer',
    abroadExpertForm: {
        items: [{
            leftText: "加拿大留学生活学习",
            rightText: "¥21",
        }, {
            leftText: "加拿大留学生活学习",
            rightText: "¥21"
        }, {
            leftText: "商科master&PHD混申，欧美新加坡混申那些事",
            rightText: "¥21"
        }],
        index: 0,
        name: "Nick Hu"
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
        case $.ABROAD_EXPERT_FORM_SELECT:
            return {...newState, abroadExpertForm: {...newState.abroadExpertForm, ...rest}}
        default:
            return newState;
    }
}
