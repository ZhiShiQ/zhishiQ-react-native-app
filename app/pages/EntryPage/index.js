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
import {checkSigned} from '../../helpers'

import InputExtra from '../../components/InputExtra';
import InputExtras from '../../components/InputExtras';
import BlockButton from '../../components/BlockButton';
import HrFlexLayout from '../../components/HrFlexLayout';
import ScrollTab from '../../components/ScrollTab';
import Loading from '../../components/Loading';
import SubMenu from '../../components/SubMenu';
import ModalDropDown from 'react-native-modal-dropdown';

@autobind
class EntryPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        checkSigned()
            .then(f => {
                !f && this.props.actions.setEntryIsChecked(true)
                || Actions.tabbar({type: "replace"});
            });
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
        const {store: {entry: {login, activeIndex}}, actions} = this.props;
        actions.setEntryLoginUser('');
        actions.setEntryLoginPwd('');
        actions.setEntryRegPhone('');
        actions.setEntryRegVerify('');
        actions.setEntryRegPwd('');
    }

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {store: {entry: {reg, activeIndex, isChecked}}, actions} = this.props;
        const a = ["login", "reg"];
        if (!isChecked) {
            return (<Loading/>)
        }
        return (
            <View style={sty.main}>
                <ScrollTab
                    page={a.indexOf(activeIndex)}
                    initialPage={0}
                    style={{flex: 1}}
                    onChangeTab={({i}) => {actions.setEntryActiveIndex(a[+i])}}
                >
                    <View style={{flex: 1}} tabLabel="登录">
                        {this. loginPage}
                    </View>
                    <View style={{flex: 1}} tabLabel="注册">
                        {this.regPage}
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
        const {isFetching} = login;
        return (
            <View style={{flex: 1}}>
            <InputExtras
                renderHeader={() => <View style={sty.top}></View>}
                ref="inputs"
                items={[{
                    label: "帐号",
                    inputProps: {
                        value: login.user,
                        placeholder: "注册邮箱、用户名或手机号码",
                        placeholderTextColor: "",
                        onChangeText: (text) => actions.setEntryLoginUser(text)
                    }
                }, {
                    label: "密码",
                    rText: "忘记密码",
                    onRight: () => Actions.resetPwdByPhone(),
                    inputProps: {
                        value: login.pwd,
                        placeholder: "请输入密码",
                        secureTextEntry: true,
                        placeholderTextColor: "",
                        onSubmitEditing: this._onSignIn,
                        onChangeText: (text) => actions.setEntryLoginPwd(text)
                    }
                }]}
                renderFooter={() =>
                    <View style={{marginTop: 28}}>
                        <BlockButton
                            disabled={isFetching}
                            title={" 登录 "}
                            onPress={this._onSignIn}
                        />
                    </View>
                }
            />
                {this.social}
            </View>
        )
    }

    _onSignIn() {
        const {store: {entry: {login, activeIndex}}, actions} = this.props;
        actions.fetchSignIn()
            .then(f => f && Actions.tabbar({type: "replace"}));
    }

    _onSignUp() {
        const {store: {entry: {login, activeIndex}}, actions} = this.props;
        actions.fetchSignUp()
            // .then(f => f && Actions.tabbar({type: "replace"}));
    }

    get regPage() {
        const {store: {entry: {reg, activeIndex}}, actions} = this.props;
        const {leftSecond, isVerifySent, isFetching} = reg;
        return (
            <InputExtras
                renderHeader={() => <View style={sty.top}></View>}
                ref="inputs"
                items={[{
                    label: "＋86",
                    rText: !isVerifySent?"发送验证码":"重新发送("+leftSecond+"s)",
                    onRight: !isVerifySent? () => {
                        actions.fetchVerify();
                    } : null,
                    inputProps: {
                        defaultValue: reg.phone,
                        placeholder: "手机号码",
                        keyboardType: "numeric",
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
                        secureTextEntry: true,
                        onSubmitEditing: () => {

                        },
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
                            disabled={isFetching}
                            onPress={this._onSignUp}
                        />
                    </View>
                }
            />
        )
    }
}

export default EntryPage;
