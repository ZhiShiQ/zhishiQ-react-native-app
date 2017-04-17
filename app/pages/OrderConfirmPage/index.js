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
import PersonInOrder from '../../components/PersonInOrder';
import CollapsibleItem from '../../components/CollapsibleItem';
import LinkItem from '../../components/LinkItem';
import Hr from '../../components/Hr';
import BottomBtns from '../../components/BottomBtns';
import CirImage from '../../components/CirImage';
import Loading from '../../components/Loading';
import sty from './style';

@autobind
class OrderConfirmPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
        const {
            actions,
            store:{
                order_confirm:{isFetching}
            }
        }=this.props
        setTimeout(() => actions.fetchOrderConfirmOneStepOptions(), 0)
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        /*
         qq: null,
         skype: null,
         discount: null
        */
        return !Map(this.props.store.order_confirm).equals(Map(newProps.store.order_confirm))
            || newState.originPageCount != this.state.originPageCount
            || newState.targetPageCount != this.state.targetPageCount
            || newState.targetWordCount != this.state.targetWordCount
            || newState.wordCount != this.state.wordCount
    }

    componentWillUpdate(newProps, newState, newContext) {
        if (this.props.store.order_confirm.price == newProps.store.order_confirm.price) {
            this.computePrice();
        }
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
        const {actions} = this.props;
        // console.info(!Map(this.props.store.order_confirm).equals(Map(oldProps.store.order_confirm)));
        // console.info(this.props.store.order_confirm, oldProps.store.order_confirm);
        // if (this.props.store.order_confirm.price == oldProps.store.order_confirm.price) {
        //     this.computePrice();
        // }
    }

    componentWillUnmount() {
        const {actions} = this.props;
        actions.orderConfirmReset();
    }

    static defaultProps = {}
    state = {
        targetPageCount: null,
        originPageCount: null,
        wordCount: null,
        targetWordCount: null,
        qq: null,
        skype: null,
        discount: null
    }

    static propTypes = {}

    get hr() {
        return <Hr marginBottom={0} style={{marginHorizontal: 15}} color={"#e5e5e5"}/>;
    }

    header(labelWidth, key, title) {
        const {
            actions, store: {order_confirm: {id, topic, skype, qq, price, want}}
        } = this.props;
        return (
            <LinkItem
                showIcon={false}
                emphasize
                leftComponent={
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[{color: '#4a4a4a', fontSize: 16}, labelWidth && {width: labelWidth}]}>
                            {key || '主题咨询：'}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"}
                              style={{color: '#4a4a4a', flex: 1, fontSize: 16}}>
                            {title || topic}
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
            }, /*style: i == 0 && {paddingTop: 0}*/
        }))
        return (
            <ListView
                scrollEnabled={false}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(items)}
                renderRow={(x, s, i) => this.renderPerson(x, i)}
                renderSeparator={(x, i) => i != items.length - 1 ? this.hr : null}
                renderFooter={() => selectAdviserIndex >= 0 ? this.renderResetButton({
                    onPress: () => {
                        actions.setOrderConfirmSelectAdviserIndex(-1);
                        actions.setOrderConfirmAdvisers(advisers);
                    }
                }) : null }
            />
        )
    }

    renderTeachers() {
        const {store: {order_confirm: {teachers, selectTeacherIndex}}, actions} = this.props;

        const items = selectTeacherIndex >= 0 ? [teachers[selectTeacherIndex]]
            : teachers.map((a, i) => ({
            ...a, onPress: () => {
                actions.setOrderConfirmSelectTeacherIndex(i)
            }, /*style: i == 0 && {paddingTop: 0}*/
        }))
        return (
            <ListView
                scrollEnabled={false}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(items)}
                renderRow={(x, s, i) => this.renderPerson(x, i)}
                renderSeparator={(x, i) => i != items.length - 1 ? this.hr : null}
                renderFooter={() => selectTeacherIndex >= 0 ? this.renderResetButton({
                    onPress: () => {
                        actions.setOrderConfirmSelectTeacherIndex(-1);
                        actions.setOrderConfirmTeachers(teachers);
                    }
                }) : null }
            />
        )
    }

    renderResetButton({onPress}) {
        const {actions, store: {order_confirm: {advisers}}} = this.props;
        return (
            OrderConfirmPage.BlueButton({
                onPress: onPress,
                text: '重新选择'
            })
        )
    }

    static BlueButton({onPress, text, style}) {
        return (
            <View style={[{alignItems: 'center', backgroundColor: '#fff', paddingBottom: 15}, style]}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 22,
                        backgroundColor: '#1097ec',
                        borderRadius: 2
                    }}
                    onPress={onPress}
                >
                    <View>
                        <Text style={{color: '#fff', fontSize: 13}}>{text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderPerson(p, i) {
        return (
            <PersonInOrder {...p} key={i}/>
        )
    }

    renderInputAble(a) {
        return renderInputAble(a);
    }

    renderSelectable(a) {
        return renderSelectable(a);
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

    pureText(text, btnText, rest, options = {}) {
        const {showIcon = false, onPress = () => Actions.serviceClause()} = options;
        return (
            <View style={{
                flexDirection: 'row', marginTop: 8,
                marginBottom: 15, paddingLeft: 15,
            }}>
                {btnText && showIcon &&
                <Text style={{top: 3.5}}><EvilIcon size={18} color="#ea5502" name="check"/></Text>}
                <Text style={{
                    color: '#a1a1a1',
                    lineHeight: 18,
                    fontSize: 13.5,
                    paddingRight: !btnText ? 15 : 0,
                }}>
                    {text}
                </Text>
                {btnText && <TouchableWithoutFeedback
                    onPress={onPress}
                >
                    <View style={{borderBottomWidth: .75, borderBottomColor: '#ea5502'}}>
                        <Text style={{
                            fontSize: 13.5, lineHeight: 18, color: '#ea5502',
                            //textDecorationLine: 'underline'
                        }}>{btnText}</Text>
                    </View>
                </TouchableWithoutFeedback>}

                {rest && <Text style={{
                    color: '#a1a1a1',
                    lineHeight: 18,
                    fontSize: 13.5,
                    paddingRight: 0,
                }}>
                    {rest}
                </Text>}
            </View>
        )
    }

    async computePrice () {
        const {
            actions,
            store: {
                order_confirm: {
                    isFetching, id, topic, skype, qq, price, want, _type = "completePaper",
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex,
                    applyFields, applyFieldIndex, selectAdviserIndex,
                    adviseSelects, adviseType, paperManagerEnable, skypeEnable,
                    adviserLevels, adviserLevelIndex, advisers
                }
            }
        } = this.props;
        const {targetPageCount, originPageCount, wordCount} = this.state;
        let params = {};

        /*const struct = {
            'oneStepApply': [{
                key: "qq", src: 'state', value: 'qq'
            }, {
                key: "country", evalStr: "applyCountries[applyCountryIndex]"
            }]
        }

        const arr = struct[_type].map(({key, src, value, evalStr})=>{
            if (src) {
                return {val: this[src][value], key}
            } else {
                return {val: eval(evalStr), key}
            }
        });

        alert(JSON.stringify(arr));*/

        switch (_type) {
            case 'topic':
                return;
            case 'completePaper':
                return;
            case 'singlePaper':
                return;
            case 'oneStepApply':

            case 'resume':
                // levels[levelIndex]

            default:
        }

        // todo: fetch()
        // actions.setOrderConfirmPrice(200);
    }

    render() {
        const {
            actions,
            store: {
                order_confirm: {
                    isFetching, id, topic, skype, qq, price, want, _type = "completePaper"
                }
            }
        } = this.props;
        if (isFetching) {
            return <Loading/>;
        }

        switch (_type) {
            case 'topic':
                return this.renderTopic();
            case 'completePaper':
                return this.renderCompletePaperService();
            case 'singlePaper':
                return this.renderSinglePaper();
            case 'oneStepApply':
                return this.renderOneStepApply();
            case 'resume':
            default:
                return this.renderResumeService();
        }

    }

    _renderFreeTime() {
        const {
            actions,
            store: {
                order_confirm: {
                    freeTime, qq, skype, want
                }
            }
        } = this.props;
        return (
            <LinkItem leftText={"设置空闲时间"} leftTextStyle={{color: "#848484"}} onPress={() => Actions.weeklyDay()}/>
        )
    }

    renderTopic() {
        const {
            actions,
            store: {
                order_confirm: {
                    freeTime, qq, skype, want
                }
            }
        } = this.props;
        const labelWidth = undefined;
        return (
            <View style={sty.main}>
                <ScrollView>
                    {this.header(labelWidth)}
                    {this.pureText("别忘了先介绍一下自己，如教育背景、 GPA 、托福等")}
                    {this.renderInputAble({
                        label: "QQ",
                        labelWidth,
                        placeholder: "输入您的QQ",
                        onChangeText: (text) => this.setState({qq: text})
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: "Skype",
                        labelWidth,
                        placeholder: "输入您的Skype（选填）",
                        onChangeText: (text) => this.setState({skype: text})
                    })}
                    {this.pureText("顾问会通过qq或skype与您取得联系")}
                    {this._renderFreeTime()}
                    {sep(true)}
                    {this.pureText("已阅读或同意", "服务条款")}
                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                            {...this._getBottomBtnsProps()}
                />
            </View>
        )
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
                    adviserLevels, adviserLevelIndex, advisers
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
                        <View style={{backgroundColor: '#fff', padding: 15, paddingBottom: advisers.length ? 0 : 15}}>
                            <TextInput
                                autoCapitalize={false}
                                autoCorrect={false}
                                onChangeText={(text) => {/*fetch Search*/
                                    actions.setOrderConfirmAdvisers([{
                                        average: 4.8,
                                        clients: 234,
                                        name: "moyu..",
                                        school: "伦敦艺术大学",
                                        intro: "面试招生官"
                                    }, {
                                        average: 4.8,
                                        clients: 234,
                                        name: "moyu..",
                                        school: "伦敦艺术大学",
                                        intro: "面试招生官"
                                    }])
                                }}
                                placeholder={"输入顾问名字，如：Andy"}
                                editable={true}
                                style={{
                                    color: '#4a4a4a',
                                    borderRadius: 3, flex: 1, paddingHorizontal: 10, fontSize: 16, height: 35,
                                    backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#e5e5e5',
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
     * 指定主导师
     * @param labelWidth
     * @returns {XML}
     * @private
     */
    _renderTeacher({labelWidth}) {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex,
                    applyFields, applyFieldIndex, selectAdviserIndex,
                    adviseSelects, adviseType, paperManagerEnable, skypeEnable,
                    adviserLevels, adviserLevelIndex, teacherType, teacherSelects,
                    selectTeacherIndex, teachers
                }
            }
        } = this.props;
        return (
            <View>
                {this.renderSelectable({
                    label: '指定顾问',
                    labelWidth,
                    content: teacherSelects.find(x => x.type == teacherType).label,
                    contentHighlight: true,
                    onPress: () => actions.pickerModalOpen(
                        teacherSelects.map(a => ({
                            ...a, onPress: ({type}, i) => {
                                actions.setOrderConfirmTeacherType(type);
                            }
                        }))
                    )
                })}
                {teacherType == 'person' &&
                <View align={"center"}>
                    {this.hr}
                    <View style={{flex: 1}}>
                        { selectTeacherIndex < 0 &&
                        <View style={{backgroundColor: '#fff', padding: 15, paddingBottom: teachers.length ? 0 : 15}}>
                            <TextInput
                                autoCapitalize={false}
                                autoCorrect={false}
                                onChangeText={(text) => {/*fetch Search*/
                                    text = text.trim()
                                    if (!text) {
                                        actions.setOrderConfirmTeachers([])
                                    } else {
                                        actions.fetchOrderConfirmTeachers(text)
                                    }
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
                        {this.renderTeachers()}
                        <Hr marginBottom={0} style={{marginHorizontal: 0}} color={"#e5e5e5"}/>
                    </View>
                </View>
                }
                {this.pureText('您可以在', '顾问页面', '查看符合您专业和愿望的顾问', {
                    onPress: () => {
                        Actions.foreignTeacher({
                            params: {
                                fetchedCallback: () => {
                                    const {store: {foreign_teacher: {filters: {others}}}} = this.props;
                                    const i = others.findIndex(x=>x.id=='package_editor');

                                    actions.setForeignTeacherFilterOtherTitle(i != 0 ? others[i].title : "其它服务");
                                    actions.setForeignTeacherFilterOtherSelectedIndex(i);
                                    actions.fetchForeignTeacher(1, {resetList: true});
                                }
                            }
                        });
                    }, showIcon: false
                })}
            </View>
        )
    }

    /**
     *  一站式申请服务
     * @returns {XML}
     */
    renderOneStepApply() {
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
                    {this.header(labelWidth, '一站式服务 ')}
                    {sep(true, {height: 16})}
                    {this.renderSelectable({
                        label: '申请国家',
                        content: applyCountryIndex < 0 ? '请选择您申请国家' : applyCountries[applyCountryIndex].label,
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
                    {this.hr}
                    {this._renderApplyFields(labelWidth)}
                    {this.pureText("系统会根据您需要申请的研究领域和申请学位匹配处理您的服务的顾问，因为这一点，全套文书服务中申请的每个项目都应该是这个领域的")}


                    {this._renderTeacher({labelWidth})}
                    {this._renderAdviser({labelWidth})}

                </ScrollView>
                <BottomBtns lefts={[{text: "收藏"}, {text: "客服"}]}
                            {...this._getBottomBtnsProps()}
                />
            </View>
        )
    }

    _renderApplyFields(labelWidth) {
        const {
            actions,
            store: {
                order_confirm: {
                    levels, levelIndex, applyCountries, applyCountryIndex,
                    aimLangs, aimLangIndex, applyDegrees, applyDegreeIndex,
                    applyFields, applyFieldIndex, applySubFields, applySubFieldIndex, selectAdviserIndex,
                    adviseEnable, paperManagerEnable, skypeEnable
                }
            }
        } = this.props;
        return (
            <View>
                {this.renderSelectable({
                    label: '申请领域',
                    content: applyFieldIndex < 0 ? '请选择您申请领域' : applyFields[applyFieldIndex].label,
                    labelWidth,
                    contentHighlight: applyFieldIndex >= 0,
                    onPress: () => actions.pickerModalOpen(applyFields.map(a => ({
                        ...a, onPress: (a, i) => {
                            actions.setOrderConfirmApplySubFieldIndex(-1)
                            actions.setOrderConfirmApplyFieldIndex(i)
                        }
                    })))
                })}
                {applyFieldIndex >= 0 && applyFields[applyFieldIndex].id !== -1 &&
                this.renderSelectable({
                    label: '子领域',
                    content: applySubFieldIndex < 0 ? '请选择您申请的子领域' : applySubFields[applyFieldIndex][applySubFieldIndex].label,
                    labelWidth,
                    contentHighlight: applySubFieldIndex >= 0,
                    onPress: () => actions.pickerModalOpen(applySubFields[applyFieldIndex].map(a => ({
                        ...a, onPress: (a, i) => {
                            actions.setOrderConfirmApplySubFieldIndex(i)
                        }
                    })))
                })}
            </View>
        )
    }

    /**
     *  全套文书服务
     * @returns {XML}
     */
    renderCompletePaperService() {
        // alert(2);
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
                    {this.header(labelWidth, '全套文书：')}
                    {sep(true, {height: 16})}
                    {this._renderApplyFields(labelWidth)}
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
                    {this._renderAdviser({labelWidth})}

                    {this.hr}
                    <LinkItem leftText={"空闲时间"} leftTextStyle={{color: '#848484'}} onPress={() => {
                        Actions.weeklyDay();
                    }}/>

                    {this.hr}
                    {this.renderInputAble({
                        label: '优惠码',
                        labelWidth,
                        placeholder: '请输入优惠码',
                        onPress: () => actions.pickerModalOpen(true),
                        onChangeText: (text) => this.setState({discount: text})
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
                    {this.header(labelWidth, '简历服务：')}
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
                        inputProps: {keyboardType: "numeric", onChangeText: (text) => this.setState({wordCount: text})}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '原稿页数', placeholder: '请输入原稿页数',
                        labelWidth,
                        inputProps: {keyboardType: "numeric", onChangeText: (text) => this.setState({originPageCount: text})}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '终稿页数', placeholder: '请输入终稿页数',
                        labelWidth,
                        inputProps: {keyboardType: "numeric", onChangeText: (text) => this.setState({targetPageCount: text})}
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
                    {this.header(undefined, '单项文书：', 'PS／Essay／RL／SoP')}
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
                    {this._renderApplyFields()}
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
                        inputProps: {keyboardType: "numeric", onChangeText: (text) => this.setState({wordCount: text})}
                    })}
                    {this.hr}
                    {this.renderInputAble({
                        label: '终稿字数', placeholder: '请输入终稿期望字数',
                        inputProps: {keyboardType: "numeric", onChangeText: (text) => this.setState({targetWordCount: text})}
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


export const renderInputAble = ({label, placeholder, labelWidth = 80, inputProps, ...rest}) => {
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

export const renderSelectable = ({label, content, onPress, labelWidth = 80, contentStyle, contentHighlight, ...rest}) => {
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

export default OrderConfirmPage;
