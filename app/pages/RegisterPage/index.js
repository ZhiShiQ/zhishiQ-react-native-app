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

import sty from './style';

import InputExtra from '../../components/InputExtra';
import InputExtras from '../../components/InputExtras';
import BlockButton from '../../components/BlockButton';

@autobind
class RegisterPage extends Component {
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
        const {...props} = this.props

        return (
            <View style={sty.main}>
                <InputExtras
                    renderHeader={() => <View style={sty.top}></View>}
                    ref="inputs"
                    items={[{
                        label: "＋86",
                        rText: "发送验证码",
                        onRight: null,
                        inputProps: {
                            placeholder: "手机号码",
                            placeholderTextColor: ""
                        }
                    }, {
                        label: "验证码",
                        inputProps: {
                            placeholder: "输入验证码",
                            placeholderTextColor: ""
                        }
                    }, {
                        label: "密码",
                        inputProps: {
                            placeholder: "设置您的密码",
                            placeholderTextColor: ""
                        }
                    }]}
                    renderFooter={() =>
                        <View style={{flex: 1}}>
                            <InputExtra
                                style={{marginTop: 45, marginBottom: 50}}
                                label="来源"
                                inputProps={{
                                    placeholder: "您通过哪种渠道了解我们？",
                                    placeholderTextColor: ""
                                }}
                            />
                            <BlockButton
                                title={" 注册 "}
                            />
                        </View>
                    }
                />
            </View>
        )
    }
}

export default RegisterPage;
