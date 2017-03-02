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
        const {store: {
            basic_info: {
                school, grade, speciality, experienceNum, examNum
            }
        }} = this.props;
        return [{
            leftText: '当前院校',
            rightText: school,
            onPress: () => Actions.setMySchool()
        }, {
            leftText: '当前年级',
            rightText: grade
        }, {
            leftText: '当前专业',
            rightText: speciality,
            onPress: null
        }, {
            leftText: '经历',
            rightText: experienceNum + "个标签",
            onPress: () => Actions.myExperience()
        }, {
            leftText: '考试',
            rightText: examNum + "项成绩",
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
