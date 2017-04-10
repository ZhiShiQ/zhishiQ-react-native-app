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
import {renderSelectable, renderInputAble} from '../OrderConfirmPage';
import * as HELPER from '../../helpers';
import sty from './style';
const {sep} =HELPER;
import BottomBtns from '../../components/BottomBtns';
@autobind
class ServiceTestPage extends Component {
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
        const {actions,
            store:{
                service_test:{name,email,phone,wechat,applyNations,applyNationsIndex
                    ,applyDegrees,applyDegreesIndex,applyDomains,applyDomainsIndex,visitTime,question}
            }
        } = this.props;
        const labelWidth = undefined;
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    {sep(true, {height: 20})}
                    {renderInputAble({
                        label: '姓名',
                        labelWidth,
                        placeholder: '请输入你的姓名（必填）'
                    })}
                    {renderInputAble({
                        label: '邮箱',
                        labelWidth,
                        placeholder: '请填写您的邮箱（必填）',
                        inputProps:{
                            keyboardType:'email-address'
                        }
                    })}
                    {renderInputAble({
                        label: '电话',
                        labelWidth,
                        placeholder: '请填写您的电话（必填）',
                        inputProps:{
                            keyboardType:'numeric'
                        }
                    })}
                    {renderInputAble({
                        label: '微信号',
                        labelWidth,
                        placeholder: '请填写您的微信号（必填）'
                    })}
                    {renderSelectable({
                        label: '申请国家',
                        content: applyNationsIndex<0?'请选择申请国家（必填）':applyNations[applyNationsIndex].label,
                        contentHighlight: applyNationsIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyNations.map(nation => ({
                            ...nation,onPress:(a,i)=>{
                                actions.setServiceTestApplyNations(i)
                            }
                        })))
                    })}
                    {renderSelectable({
                        label: '申请学位',
                        content: applyDegreesIndex<0?'请选择申请学位（必填）':applyDegrees[applyDegreesIndex].label,
                        contentHighlight: applyDegreesIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyDegrees.map(degree => ({
                            ...degree,onPress:(a,i)=>{
                                actions.setServiceTestApplyDegrees(i)
                            }
                        })))
                    })}
                    {renderSelectable({
                        label: '申请专业',
                        content: applyDomainsIndex<0?'请选择申请专业':applyDomains[applyDomainsIndex].label,
                        contentHighlight: applyDomainsIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyDomains.map(domain => ({
                            ...domain,onPress:(a,i)=>{
                                actions.setServiceTestApplyDomains(i)
                            }
                        })))
                    })}
                    {renderSelectable({
                        label: '回访时间',
                        content: '预约回访时间（必填）',
                        onPress: () => actions.timeRangeModalOpen()
                    })}
                    {renderInputAble({
                        label: '您的问题',
                        placeholder: '目前在留学过程中遇到的问题'
                    })}
                </ScrollView>
                <View style={{paddingHorizontal:10,paddingVertical:10}}>
                    <BottomBtns mainText="提交" lefts={[]} mainButtonStyle={{backgroundColor:'#1097ec',borderRadius:2}}/>
                </View>
            </View>
        )
    }
}

export default ServiceTestPage;
