import {Map, List, Set, fromJS} from 'immutable';
import * as $ from '../constant';

const initialState = {
    name: '',
    email: '',
    phone: '',
    wechat: '',
    applyNations: [
        {label: '美国'},
        {label: '英国'},
        {label: '香港'},
        {label: '欧洲'}
    ],
    applyNationsIndex:-1,
    applyDegrees: [
        {label: 'Bachelor'},
        {label: 'Master'},
        {label: 'Phd'}
    ],
    applyDegreesIndex:-1,
    applyDomains: [
        {label: '专业1'},
        {label: '专业2'},
        {label: '专业3'},
        {label: '专业4'},
        {label: '专业5'}
    ],
    applyDomainsIndex:-1,
    visitTime: '',
    question: ''
}
export default function (state = initialState, action) {
    const newState = {...state};
    const {type, ...rest} = action;
    switch (type) {
        case $.SERVICE_TEST_ROOT_SET:
            return {...newState,...rest}
        default:
            return newState;
    }
}
