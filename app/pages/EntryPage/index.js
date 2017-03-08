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
    Image,
    TextInput,
    Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import sty from './style';
import {QQ_COLORFUL, WB_COLORFUL, WX_COLORFUL, BACK_ICON} from '../../helpers/resource'

import InputExtra from '../../components/InputExtra';
import InputExtras from '../../components/InputExtras';
import BlockButton from '../../components/BlockButton';
import HrFlexLayout from '../../components/HrFlexLayout';
import ScrollTab from '../../components/ScrollTab';
import SubMenu from '../../components/SubMenu';
import ModalDropDown from 'react-native-modal-dropdown';

@autobind
class EntryPage extends Component {
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
        const {store: {entry: {reg, activeIndex}}, actions} = this.props;
        const a = ["reg", "login"];
        return (
            <View style={sty.main}>
                <ScrollTab
                    page={a.indexOf(activeIndex)}
                    style={{flex: 1}}
                    onChangeTab={({i}) => actions.setEntryActiveIndex(a[+i])}
                >
                    <View style={{flex: 1}} tabLabel="注册">
                        {this.regPage}
                    </View>
                    <View style={{flex: 1}} tabLabel="登录">
                        {this. loginPage}
                    </View>
                </ScrollTab>

            </View>
        )
    }
    get social() {
        const logoStyle = {resizeMode: 'contain', width: 25, height: 30, marginBottom: 10};
        const textStyle = {fontSize: 12.5, color: '#848484'}
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{marginBottom: 20, color: '#4a4a4a'}}>用社交账号登录</Text>
                <HrFlexLayout style={{marginBottom: 30, justifyContent: 'space-around',
                    alignSelf: 'stretch', marginHorizontal: 20}}>
                    <TouchableOpacity>
                        <View style={{alignItems: 'center'}}>
                            <Image style={logoStyle} source={{uri: QQ_COLORFUL}}/>
                            <Text style={textStyle}>QQ登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{alignItems: 'center'}}>
                            <Image style={logoStyle} source={{uri: WX_COLORFUL}}/>
                            <Text style={textStyle}>微信登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{alignItems: 'center'}}>
                            <Image style={logoStyle} source={{uri: WB_COLORFUL}}/>
                            <Text style={textStyle}>微博登录</Text>
                        </View>
                    </TouchableOpacity>
                </HrFlexLayout>
            </View>
        )
    }

    get loginPage() {
        const {store: {entry: {login, activeIndex}}, actions} = this.props;
        return (
            <View style={{flex: 1}}>
            <InputExtras
                renderHeader={() => <View style={sty.top}></View>}
                ref="inputs"
                items={[{
                    label: "帐号",
                    inputProps: {
                        defaultValue: login.user,
                        placeholder: "注册邮箱、用户名或手机号码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryLoginUser(text)
                    }
                }, {
                    label: "密码",
                    rText: "忘记密码",
                    onRight: () => Actions.resetPwdByPhone(),
                    inputProps: {
                        defaultValue: login.pwd,
                        placeholder: "请输入密码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryLoginPwd(text)
                    }
                }]}
                renderFooter={() =>
                    <View style={{marginTop: 28}}>
                        <BlockButton
                            title={" 登录 "}
                            onPress={() => {
                                Actions.tabbar({type: "replace"});
                            }}
                        />
                    </View>
                }
            />
                {this.social}
            </View>
        )
    }

    get regPage() {
        const {store: {entry: {reg, activeIndex}}, actions} = this.props;
        return (
            <InputExtras
                renderHeader={() => <View style={sty.top}></View>}
                ref="inputs"
                items={[{
                    label: "＋86",
                    rText: "发送验证码",
                    onRight: null,
                    inputProps: {
                        defaultValue: reg.phone,
                        placeholder: "手机号码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryRegPhone(text)
                    }
                }, {
                    label: "验证码",
                    inputProps: {
                        defaultValue: reg.verify,
                        placeholder: "输入验证码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryRegVerify(text)
                    }
                }, {
                    label: "密码",
                    inputProps: {
                        defaultValue: reg.pwd,
                        placeholder: "设置您的密码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryRegPwd(text)
                    }
                }]}
                renderFooter={() =>
                    <View style={{}}>
                        <InputExtra
                            style={{marginTop: 28, marginBottom: 26}}
                            label="来源"
                            inputProps={{
                                placeholderTextColor: ""
                            }}
                            input={
                                <TextInput
                                    placeholder={"TODO: 什么形式的交互？"}
                                />
                            }
                        />
                        <BlockButton
                            title={" 注册 "}
                        />
                    </View>
                }
            />
        )
    }
}

export default EntryPage;
