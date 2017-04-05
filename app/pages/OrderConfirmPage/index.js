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
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions, ActionConst} from 'react-native-router-flux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Collapsible from 'react-native-collapsible';
import {sep} from '../../helpers';
import * as CONST from '../../constant';

import InputExtra from '../../components/InputExtra';
import CollapsibleItem from '../../components/CollapsibleItem';
import LinkItem from '../../components/LinkItem';
import Hr from '../../components/Hr';
import BottomBtns from '../../components/BottomBtns';
import CirImage from '../../components/CirImage';

import sty from './style';


@autobind
class OrderConfirmPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.orderConfirmReset();
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

    get hr() {
        return <Hr marginBottom={0} style={{marginHorizontal: 15}} color={"#e5e5e5"}/>;
    }

    header(labelWidth) {
        const {
            actions, store: {order_confirm: {id, topic, skype, qq, price, want}}
        } = this.props;
        return (
            <LinkItem
                showIcon={false}
                emphasize
                leftComponent={
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[{color: '#4a4a4a', fontSize: 16}, labelWidth && {width: labelWidth}]}>主题咨询：</Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"}
                              style={{color: '#4a4a4a', flex: 1, fontSize: 16}}>
                            {topic}
                        </Text>
                    </View>
                }
                rightTextStyle={{color: '#ea5502', fontWeight: 'bold', fontSize: 16}} rightText={"￥" + price}
            />
        )
    }


    renderPeople() {
        const {store: {order_confirm: {advisers, selectAdviserIndex}}, actions} = this.props;

        const items = selectAdviserIndex >= 0 ? [advisers[selectAdviserIndex]]
            : advisers.map((a, i) => ({
                ...a, onPress: () => {
                    actions.setOrderConfirmSelectAdviserIndex(i)
                }, style: i == 0 && {paddingTop: 0}
            }))
        return (
            <ListView
                scrollEnabled={false}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(items)}
                renderRow={(x, s, i) => this.renderPerson(x, i)}
                renderSeparator={(x, i) => i != items.length - 1 ? this.hr : null}
                renderFooter={() => selectAdviserIndex >= 0 ? this.renderResetButton() : null }
            />
        )
    }

    renderResetButton() {
        const {actions, store: {order_confirm: {advisers}}} = this.props;
        return (
            <View style={{alignItems: 'center', backgroundColor: '#fff', paddingBottom: 15}}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 22,
                        backgroundColor: '#1097ec',
                        borderRadius: 2
                    }}
                    onPress={() => {
                        actions.setOrderConfirmSelectAdviserIndex(-1);
                        actions.setOrderConfirmAdvisers(advisers);
                    }}
                >
                    <View>
                        <Text style={{color: '#fff', fontSize: 13}}>重新选择</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderPerson({clients, average, school, intro, onPress, style}, i) {
        const Container = onPress ? TouchableOpacity : View;

        return (
            <Container
                onPress={onPress}
                style={[{flexDirection: 'row', flex: 1, alignSelf: 'stretch', padding: 15, backgroundColor: '#fff'},
                    style
                ]}
            >
                <View style={{marginRight: 10}}>
                    <CirImage size={45}/>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, fontSize: 16, fontColor: '#4a4a4a', fontWeight: '600'}}>November M</Text>
                        <Text style={{fontSize: 14, color: '#848484'}}>
                            <Text style={{color: '#ea5502'}}>{average} </Text>分
                            <Text> </Text>
                            <Text style={{color: '#ea5502'}}>{clients} </Text>服务
                        </Text>
                    </View>
                    <View style={{marginTop: 6}}>
                        <Text style={{fontSize: 14, color: '#848484', flex: 1}}>
                            <Text style={{}}>{school}</Text>
                            <Text> </Text>
                            <Text style={{}}>{intro}</Text>
                        </Text>
                    </View>
                </View>
            </Container>
        )
    }

    renderInputAble({label, placeholder, labelWidth = 80, inputProps, ...rest}) {
        return (
            <InputExtra
                label={label} labelStyle={{width: labelWidth, fontSize: 16, color: '#848484'}}
                inputProps={{
                    placeholder,
                    ...inputProps,
                }}
                inputStyle={{
                    color: '#4a4a4a'
                }}
                {...rest}
            />
        )
    }

    renderSelectable({label, content, onPress, labelWidth = 80, contentStyle, contentHighlight, ...rest}) {
        return (
            <LinkItem
                leftComponent={
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{width: labelWidth, fontSize: 16, color: '#848484'}}>{label}</Text>
                        <Text style={[{fontSize: 16, fontWeight: 'normal', color: '#c4c4c4'},
                            contentHighlight && {color: '#4a4a4a'},
                            contentStyle
                        ]}>
                            {content}</Text>
                    </View>
                }
                iconName={"down"}
                onPress={onPress}
                {...rest}
            />
        )
    }

    _getBottomBtnsProps() {
        const {actions, params = {}} = this.props;
        const {type = "buy"} = params;
        switch (type) {
            case 'buy':
                return {
                    mainText: "去付款", onMainPress: () => {
                        // Actions.tab_cart({type: ActionConst.JUMP});
                        actions.simplePayModalOpen();
                    }
                }
            case 'cart':
                return {
                    subText: " 加入购物车", onSubPress: () => {
                        Actions.tab_cart({type: ActionConst.JUMP});
                    }
                }
        }
    }

    pureText(text, btnText) {
        return (
            <View style={{
                flexDirection: 'row', marginTop: 8,
                marginBottom: 15, paddingLeft: 15,
            }}>
                {btnText && <Text style={{top: 3.5}}><EvilIcon size={18} color="#ea5502" name="check"/></Text>}
                <Text style={{
                    color: '#a1a1a1',
                    lineHeight: 18,
                    fontSize: 13.5,
                    paddingRight: !btnText ? 15 : 0,
                }}>
                    {text}
                </Text>
                {btnText && <TouchableWithoutFeedback
                    onPress={() => Actions.serviceClause()}>
                    <View>
                        <Text style={{fontSize: 13.5, lineHeight: 18, color: '#ea5502'}}>{btnText}</Text>
                    </View>
                </TouchableWithoutFeedback>}
            </View>
        )
    }

    render() {
        const {
            actions,
            store: {
                order_confirm: {
                    id, topic, skype, qq, price, want, type = "completePaper"
                }
            }
        } = this.props;
        switch (type) {
            case 'completePaper':
                return this.renderCompletePaperService();
            case 'singlePaper':
                return this.renderSinglePaper();
            case 'resume':
            default:
                return this.renderResumeService();
        }

    }

    _renderAdviser({labelWidth}) {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex,
                    applyFields, applyFieldIndex, selectAdviserIndex,
                    adviseSelects, adviseType, paperManagerEnable, skypeEnable,
                    adviserLevels, adviserLevelIndex
                }
            }
        } = this.props;
        return (
            <View>
                {this.renderSelectable({
                    label: '指定顾问',
                    labelWidth,
                    content: adviseSelects.find(x => x.type == adviseType).label,
                    contentHighlight: true,
                    onPress: () => actions.pickerModalOpen(
                        adviseSelects.map(a => ({
                            ...a, onPress: ({type}, i) => {
                                actions.setOrderConfirmAdviseType(type);
                            }
                        }))
                    )
                })}
                {adviseType == 'person' &&
                <View align={"center"}>
                    {this.hr}
                    <View style={{flex: 1}}>
                        { selectAdviserIndex < 0 &&
                        <View style={{backgroundColor: '#fff', padding: 15, paddingBottom: 15}}>
                            <TextInput
                                autoCapitalize={false}
                                autoCorrect={false}
                                onChangeText={(text) => {/*fetch Search*/
                                    actions.setOrderConfirmAdvisers([{
                                        average: 4.8,
                                        clients: 234,
                                        school: "伦敦艺术大学",
                                        intro: "面试招生官"
                                    }, {
                                        average: 4.8,
                                        clients: 234,
                                        school: "伦敦艺术大学",
                                        intro: "面试招生官"
                                    }])
                                }}
                                placeholder={"输入顾问名字，如：Andy"}
                                editable={true}
                                style={{
                                    color: '#4a4a4a',
                                    borderRadius: 3, flex: 1, paddingHorizontal: 10, fontSize: 16, height: 35,
                                    backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#e5e5e5'
                                }}
                            />
                        </View>
                        }
                        {this.renderPeople()}
                        <Hr marginBottom={0} style={{marginHorizontal: 0}} color={"#e5e5e5"}/>
                    </View>
                </View>
                }
                {adviseType == 'level' &&
                this.renderSelectable({
                    label: "选择等级",
                    labelWidth,
                    contentHighlight: true,
                    content: adviserLevels[adviserLevelIndex].label,
                    onPress: () => actions.pickerModalOpen(
                        adviserLevels.map(a => ({
                            ...a, onPress: (x, i) => {
                                actions.setOrderConfirmAdviserLevelIndex(i);
                            }
                        }))
                    )
                })
                }

                {this.pureText('指定文书顾问需要额外缴纳50%的指定费用，直接下单将由芝士圈文书顾问团队中的一位顾问接手您的订单。')}
                {sep(true, {height: 16})}
            </View>
        )
    }

    /**
     *  全套文书服务
     * @returns {XML}
     */
    renderCompletePaperService() {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex,
                    applyFields, applyFieldIndex, selectAdviserIndex,
                    adviseEnable, paperManagerEnable, skypeEnable
                }
            }
        } = this.props;
        const labelWidth = undefined;

        return (
            <View style={sty.main}>
                <ScrollView>
                    {this.header(labelWidth)}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '申请领域',
                        content: applyFieldIndex < 0 ? '请选择您申请领域' : applyFields[applyFieldIndex].label,
                        labelWidth,
                        contentHighlight: applyFieldIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyFields.map(a => ({
                            ...a, onPress: (a, i) => {
                                actions.setOrderConfirmApplyFieldIndex(i)
                            }
                        })))
                    })}
                    {this.hr}
                    {this.renderSelectable({
                        label: '申请学位',
                        content: applyDegreeIndex < 0 ? '请选择您的申请学位' : applyDegrees[applyDegreeIndex].label,
                        labelWidth,
                        contentHighlight: applyDegreeIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyDegrees.map(a => ({
                            ...a, onPress: (a, i) => {
                                actions.setOrderConfirmApplyDegreeIndex(i)
                            }
                        })))
                    })}

                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '目标语言',
                        content: aimLangIndex < 0 ? '请选择您的目标语言' : aimLangs[aimLangIndex].label,
                        labelWidth,
                        contentHighlight: aimLangIndex >= 0,
                        onPress: () => actions.pickerModalOpen(aimLangs.map(a => ({
                            ...a, onPress: (a, i) => {
                                actions.setOrderConfirmAimLangIndex(i)
                            }
                        })))
                    })}
                    {this.hr}
                    {this.renderSelectable({
                        label: '申请国家',
                        content: applyCountryIndex < 0 ? '请选择您的申请国家' : applyCountries[applyCountryIndex].label,
                        labelWidth,
                        contentHighlight: applyCountryIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyCountries.map(a => ({
                            ...a, onPress: (a, i) => {
                                actions.setOrderConfirmApplyCountryIndex(i)
                            }
                        })))
                    })}
                    {sep(true, {height: 16})}

                    {this.renderSelectable({
                        label: '服务等级',
                        content: levels[levelIndex].label,
                        labelWidth,
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen(levels.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmLevelIndex(i)
                            }
                        })))
                    })}
                    {this.pureText('这里需要一个关于服务等级的介绍，可能还有一个链接到单项文书产品页的链接，并且可以直接返回到这里')}

                    {this.renderSelectable({
                        label: '项目数量',
                        labelWidth,
                        content: '',
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen()
                    })}

                    {this.hr}
                    {this.renderSelectable({
                        label: '文书管家',
                        labelWidth,
                        content: paperManagerEnable ? "是" : "否",
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen(
                            [{label: "否", enable: false}, {label: "是", enable: true}].map(a => (
                                {
                                    ...a, onPress: ({enable}, i) => {
                                    actions.setOrderConfirmPaperManagerEnable(enable);
                                }
                                }
                            ))
                        )
                    })}

                    {this.hr}
                    {this._renderAdviser()}

                    {this.hr}
                    {this.renderSelectable({
                        label: '空闲时间',
                        labelWidth,
                        content: '',
                        onPress: () => actions.pickerModalOpen(true)
                    })}

                    {this.hr}
                    {this.renderInputAble({
                        label: '优惠码',
                        labelWidth,
                        placeholder: '请输入优惠码',
                        onPress: () => actions.pickerModalOpen(true)
                    })}

                    {this.pureText("确定", "服务条款")}

                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                            {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }

    /**
     * 简历服务
     * @returns {XML}
     */
    renderResumeService() {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex, docTypes,
                    applyFields, applyFieldIndex, selectAdviserIndex, docTypeIndex,
                    docLangs, docLangIndex, urgentEnable, resumeFieldIndex, resumeFields,
                    adviseEnable, paperManagerEnable, skypeEnable, preTranslateEnable
                }
            }
        } = this.props;

        const labelWidth = 92;

        return (
            <View style={sty.main}>
                <ScrollView>
                    {this.header(labelWidth)}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '简历领域',
                        content: resumeFieldIndex < 0 ? '请选择您简历领域' : resumeFields[resumeFieldIndex].label,
                        labelWidth,
                        contentHighlight: resumeFieldIndex >= 0,
                        onPress: () => actions.pickerModalOpen(resumeFields.map(a => ({
                            ...a,
                            onPress: (x, i) => actions.setOrderConfirmResumeFieldIndex(i)
                        })))
                    })}
                    {this.hr}
                    {this.renderSelectable({
                        label: '申请国家',
                        content: applyCountryIndex < 0 ? '请选择您的申请国家' : applyCountries[applyCountryIndex].label,
                        labelWidth,
                        contentHighlight: applyCountryIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyCountries.map(a => ({
                            ...a,
                            onPress: (x, i) => actions.setOrderConfirmApplyCountryIndex(i)
                        })))
                    })}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '目标语言',
                        content: aimLangIndex < 0 ? '请选择您的目标语言' : aimLangs[aimLangIndex].label,
                        labelWidth,
                        contentHighlight: aimLangIndex >= 0,
                        onPress: () => actions.pickerModalOpen(aimLangs.map(a => ({
                            ...a,
                            onPress: (x, i) => actions.setOrderConfirmAimLangIndex(i)
                        })))
                    })}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '润色前翻译',
                        content: !preTranslateEnable ? '否' : '是',
                        labelWidth,
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen(
                            [{label: "否", enable: false}, {label: "是", enable: true}]
                                .map((x) => ({
                                    ...x,
                                    onPress: () => actions.setOrderConfirmPreTranslateEnable(x.enable)
                                }))
                        )
                    })}
                    {this.pureText('上传中文文书将默认选择翻译服务（0.18元／字）')}

                    {this.renderSelectable({
                        label: '服务等级',
                        content: levelIndex < 0 ? '请选择您的服务等级' : levels[levelIndex].label,
                        labelWidth,
                        contentHighlight: levelIndex >= 0,
                        onPress: () => actions.pickerModalOpen(levels.map(a => ({
                            ...a,
                            onPress: (x, i) => actions.setOrderConfirmLevelIndex(i)
                        })))
                    })}
                    {this.pureText('这里需要一个关于服务等级的介绍，可能还有一个链接到单项文书产品页的链接，并且可以直接返回到这里')}

                    {this.renderInputAble({
                        label: '原稿字数',
                        placeholder: '原简历文稿单词数',
                        labelWidth,
                        inputProps: {keyboardType: "numeric"}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '原稿页数', placeholder: '请输入原稿页数',
                        labelWidth,
                        inputProps: {keyboardType: "numeric"}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '终稿页数', placeholder: '请输入终稿页数',
                        labelWidth,
                        inputProps: {keyboardType: "numeric"}
                    })}
                    {this.pureText('终稿一页字数大概为300单词，请您根据自己情况购买页数')}

                    {this.renderSelectable({
                        label: '加急处理',
                        labelWidth,
                        content: !urgentEnable ? '否' : '是',
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen([
                                {label: "否", enable: false}, {label: '是', enable: true}
                            ].map((x) => ({...x, onPress: () => actions.setOrderConfirmUrgentEnable(x.enable)}))
                        )
                    })}
                    {this.pureText('注意：加急处理无法取消')}

                    {this._renderAdviser({labelWidth})}

                    {this.renderSelectable({
                        label: 'skype讨论',
                        labelWidth,
                        content: !skypeEnable ? '否' : '是',
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen([
                            {label: "否", enable: false}, {label: '是', enable: true}
                        ].map((x) => ({...x, onPress: () => actions.setOrderConfirmSkypeEnable(x.enable)})))
                    })}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                            {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }

    /**
     * 单项文书
     * @returns {XML}
     */
    renderSinglePaper() {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex, docTypes,
                    applyFields, applyFieldIndex, selectAdviserIndex, docTypeIndex,
                    docLangs, docLangIndex, urgentEnable,
                    adviseEnable, paperManagerEnable, skypeEnable
                }
            }
        } = this.props;

        return (
            <View style={sty.main}>
                <ScrollView>
                    {this.header()}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '申请学位',
                        content: applyDegreeIndex < 0 ? '请选择您申请的学位' : applyDegrees[applyDegreeIndex].label,
                        contentHighlight: applyDegreeIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyDegrees.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmApplyDegreeIndex(i)
                            }
                        })))
                    })}
                    {this.hr}
                    {this.renderSelectable({
                        label: '申请领域',
                        content: applyFieldIndex < 0 ? '请选择您的申请领域' : applyFields[applyFieldIndex].label,
                        contentHighlight: applyFieldIndex >= 0,
                        onPress: () => actions.pickerModalOpen(applyFields.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmApplyFieldIndex(i)
                            }
                        })))
                    })}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '文档类型',
                        content: docTypeIndex < 0 ? '请选择您的文档类型' : docTypes[docTypeIndex].label,
                        contentHighlight: docTypeIndex >= 0,
                        onPress: () => actions.pickerModalOpen(docTypes.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmDocTypeIndex(i)
                            }
                        })))
                    })}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '文书语言',
                        content: docLangIndex < 0 ? '选择您将上传文书的语言' : docLangs[docLangIndex].label,
                        contentHighlight: docLangIndex >= 0,
                        onPress: () => actions.pickerModalOpen(docLangs.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmDocTypeIndex(i)
                            }
                        })))
                    })}
                    {this.pureText('上传中文文书将默认选择翻译服务（0.18元／字）')}

                    {this.renderSelectable({
                        label: '服务等级',
                        content: levelIndex < 0 ? '请选择您的服务等级' : levels[levelIndex].label,
                        contentHighlight: levelIndex >= 0,
                        onPress: () => actions.pickerModalOpen(levels.map(level => ({
                            ...level, onPress: (a, i) => {
                                actions.setOrderConfirmLevelIndex(i)
                            }
                        })))
                    })}
                    {this.pureText('这里需要一个关于服务等级的介绍，可能还有一个链接到单项文书产品页的链接，并且可以直接返回到这里')}

                    {this.renderInputAble({
                        label: '原稿字数',
                        placeholder: '请输入原稿字数',
                        inputProps: {keyboardType: "numeric"}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '终稿字数', placeholder: '请输入终稿期望字数',
                        inputProps: {keyboardType: "numeric"}
                    })}
                    {this.pureText('顾问会参考您提供的终稿字数提供服务，语言润色服务终稿单词数浮动范围为原稿单词数上下10%')}

                    {this.renderSelectable({
                        label: '加急处理',
                        content: urgentEnable ? "是" : '否',
                        contentHighlight: true,
                        onPress: () => actions.pickerModalOpen(
                            [{label: "否", enable: false}, {label: "是", enable: true}].map(a => ({
                                ...a,
                                onPress: ({enable}, i) => {
                                    actions.setOrderConfirmUrgentEnable(enable)
                                }
                            }))
                        )
                    })}
                    {this.pureText('注意：加急处理无法取消')}

                    {this.hr}
                    {this._renderAdviser({})}
                    {sep(true, {height: 16})}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                            {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }
}

export default OrderConfirmPage;
