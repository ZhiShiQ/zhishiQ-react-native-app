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
import * as Animatable from 'react-native-animatable';
import {Actions, ActionConst} from 'react-native-router-flux';
import sty from './style';
import InputExtra from '../../components/InputExtra';
import InputExtras from '../../components/InputExtras';
import BlockButton from '../../components/BlockButton';
import ScrollTab from '../../components/ScrollTab';


import {LABEL_WIDTH} from '../ResetPwdByPhonePage';

@autobind
class ResetPwdByPhonePage extends Component {
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

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {store: {reset_pwd_by_mail: {mail}}, actions} = this.props

        return (
            <View style={sty.main}>
                <InputExtras
                    renderHeader={() => <View style={sty.top}></View>}
                    ref="inputs"
                    items={[{
                        label: "邮箱",
                        inputProps: {
                            defaultValue: mail,
                            placeholder: "输入要找回账号的邮箱",
                            placeholderTextColor: "",
                            onChangeText: (text) => actions.setResetPwdByMail_Mail(text)
                        }
                    }]}
                    renderFooter={() =>
                        <View>
                            <Text
                                style={[sty.text, sty.marginTop]}
                            >我们将会给您的邮箱发送密码修改链接，请注意查收</Text>
                            <View style={{marginTop: 28}}>
                                <BlockButton
                                    title={" 发送 "}
                                />
                                {this.social}
                            </View>
                            <View
                                style={[sty.marginTop, {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }]}
                            >
                                <Text style={[sty.text, {marginLeft: 0}]}>或</Text>
                                <TouchableWithoutFeedback
                                    onPress={() => Actions.resetPwdByPhone({type: ActionConst.REPLACE})}
                                >
                                    <View>
                                        <Text style={[sty.text, {marginLeft: 3, color: '#EA5502'}]}>通过短信重置</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}

export default ResetPwdByPhonePage;
