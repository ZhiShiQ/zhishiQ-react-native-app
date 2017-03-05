import React, {Component, PropTypes} from 'react';
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

import sty from './style';

import TitleDropdown from '../TitleDropdown';
@autobind
class ReduxTitleDropdown extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {}
    state = {}
    static propTypes = {}
    render() {
        const {
            store: {
                common: {openModal},
                my_total_order: {titleIndex}
            },
            actions
        } = this.props;
        const list = [
            '所有服务', '单项服务',
            '一站式申请', '留学行家咨询', '全套文书服务',
            '国际快递', '留学文书免费试改', '雅思写作评阅服务',
            '简历', '学术文章'
        ].map(title => ({
            title,
            onPress: (index, value) => {
                actions.setMyActiveTotalOrderTitleIndex(index);
                setTimeout(()=>this.refs.drop.hideDropDown(), 100)
            }
        }))

        return <TitleDropdown
            ref="drop"
            style={{width: 200}}
            title={list[titleIndex].title}
            selectedIndex={titleIndex}
            options={list}
        />
    }
}

export default ReduxTitleDropdown;
