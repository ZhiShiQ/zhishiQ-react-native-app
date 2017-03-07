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
    TextInput,
    Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import sty from './style';

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
                {/*<HrFlexLayout style={{backgroundColor: '#FFF', flex: 0}}>*/}
                    {/*<SubMenu style={{marginHorizontal: 0}} title={"注册"} onPress={()=>actions.setEntryActiveIndex('reg')} active={activeIndex=='reg'}/>*/}
                    {/*<SubMenu style={{marginHorizontal: 0}} title={"登录"} onPress={()=>actions.setEntryActiveIndex('login')} active={activeIndex=='login'}/>*/}
                {/*</HrFlexLayout>*/}

            </View>
        )
    }
    get social() {
        return (
            <View style={{alignItems: "center"}}>
                <Text>用社交账号登录</Text>
            </View>
        )
    }

    get loginPage() {
        const {store: {entry: {login, activeIndex}}, actions} = this.props;
        return (
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
                        {this.social}
                    </View>
                }
            />
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
