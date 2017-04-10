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
    Button,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class SubmitSuccessPage extends Component {
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
        const {...props} = this.props

        return (
            <View style={sty.main}>
                <Image style={sty.avatar}/>
                <Text style={sty.mainText}>提交成功!</Text>
                <Text style={sty.subText}>我们会在约定的时间和您联系</Text>
                <Text style={sty.tips}>如果您没有用这个邮箱注册过，这次预约还为你生成了一个账号，用户名是您填写的邮箱，密码是12345678，你可以使用这个账号登陆</Text>
                <Text style={sty.tips}>添加微信公众号XXXXXXX关注我们</Text>
            </View>
        )
    }
}

export default SubmitSuccessPage;
