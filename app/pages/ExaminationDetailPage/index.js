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

import sty from './style';

import LinkItems from '../../components/LinkItems';
import BlockButton from '../../components/BlockButton';


@autobind
class ExaminationDetailPage extends Component {
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
        const {navigationState: {params={}}} = this.props;
        const {title="title"} = params;
        return (
            <View style={sty.main}>
                <LinkItems
                    items={[{
                        rightText: title,
                        leftText: '考试类型',
                        onPress: null
                    }, {
                        rightText: 9.9,
                        leftText: '阅读',
                        onPress: null
                    }, {
                        rightText: 9.9,
                        leftText: '写作',
                        onPress: null
                    }, {
                        rightText: 9.9,
                        leftText: '听力',
                        onPress: null
                    }, {
                        rightText: 9.9,
                        leftText: '口语',
                        onPress: null
                    }]}
                    style={{marginTop: 14}} />
                <BlockButton
                    title="保存"
                    onPress={() => {}}
                />
                <BlockButton
                    title="删除"
                    onPress={() => {}}
                />
            </View>
        )
    }
}

export default ExaminationDetailPage;
