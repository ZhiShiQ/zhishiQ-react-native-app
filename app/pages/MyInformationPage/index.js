import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import {Actions, ActionConst} from 'react-native-router-flux';

import sty from './style';

import LinkItems from '../../components/LinkItems';
import CirImage from '../../components/CirImage';

@autobind
class MyInformationPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        items: [{
            leftText: '头像设置',
            rightComponent: <CirImage size={22} style={{backgroundColor: '#F7F7F7'}}/>,
            onPress: null,
        }, {
            leftText: '基本信息',
            onPress: () => Actions.myBasicInfo()
        }, {
            leftText: '留学意向',
            onPress: null
        }, {
            leftText: '联系方式',
            onPress: null
        }, {
            leftText: '时区与空闲时间',
            onPress: null
        }]
    }
    state = {}
    static propTypes = {}

    render() {
        const {items} = this.props;

        return (
            <LinkItems items={items}/>
        )
    }
}

export default MyInformationPage;
