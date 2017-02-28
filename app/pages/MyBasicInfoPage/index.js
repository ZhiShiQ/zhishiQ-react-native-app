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
import {Actions} from 'react-native-router-flux';

import sty from './style';

import LinkItems from '../../components/LinkItems';

@autobind
class MyBasicInfoPage extends Component {
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
    static defaultProps = {
    }
    state = {}

    /**
     *  从 store 中得到个人信息进行填充
     * @returns {[*,*,*,*,*]}
     * @private
     */
    _computeData() {
        const {store: {}} = this.props;
        return [{
            leftText: '当前院校',
            rightText: '南京师范大学',
            onPress: null
        }, {
            leftText: '当前年级',
            rightText: '大三'
        }, {
            leftText: '当前专业',
            rightText: 'right',
            onPress: null
        }, {
            leftText: '经历',
            rightText: 'right',
            onPress: null
        }, {
            leftText: '考试',
            rightText: 'right',
            onPress: () => Actions.examination()
        }]
    }
    static propTypes = {}
    render() {
        return (
            <View style={sty.main}>
                <LinkItems items={this._computeData()}/>
            </View>
        )
    }
}

export default MyBasicInfoPage;
