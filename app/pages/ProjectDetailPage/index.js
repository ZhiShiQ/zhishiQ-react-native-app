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
import {_renderMainItem, _renderSubject, _renderBottom} from '../OrderConfirmDetailPage/index'
import LinkItem from '../../components/LinkItem';
import sty from './style';
import * as HELPER from '../../helpers';
import Hr from '../../components/Hr';
const {sep}=HELPER;
@autobind
class ProjectDetailPage extends Component {
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
        const kvItems = [{
            title: "项目信息",
            keys: ["学校名称", "项目名称", "申请专业", "申请学位"],
            vals: ["Carleton University", "Master of Management - Internationa…", "工商管理/MBA", "MBA"],
            links:['http://www.baidu.com','http://www.baidu.com','','']
        }]
        return (
            <View style={sty.main}>
                <ScrollView>
                    {this._renderProjectHeader(kvItems)}
                    {this._renderProjectList()}
                </ScrollView>
                {this._renderBottom()}
            </View>
        )
    }

    _renderProjectHeader(kvItems) {
        return (
            <ListView
                scrollEnabled={false}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                    }).cloneWithRows(kvItems)
                }
                renderRow={(x, s, i) => _renderMainItem(x)}
                renderSeparator={(s, i) => kvItems.length - 1 != i && sep()}
            />
        )
    }

    _renderProjectList() {
        const data = {
            listItems:[
                {
                    name: "单项文书 ID：117289",
                    state: "已结束",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                    stateColor:'#848484'
                },
                {
                    name: "单项文书 ID：119077",
                    state: "已结束",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                    stateColor:'#848484'
                },
                {
                    name: "单项文书 ID：119106",
                    state: "待反馈",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                },
                {
                    name: "单项文书 ID：119106",
                    state: "待反馈",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                },
                {
                    name: "单项文书 ID：119106",
                    state: "待反馈",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                },{
                    name: "单项文书 ID：119106",
                    state: "待接单",
                    intro: "留学文书润色 • VIP文书辅导 • 市场营销学 • CV • 客户名字: Yanyu Xu",
                }
            ]
        }
        return (
            <View>
                {sep(true)}
                <LinkItem leftText={"项目内文书"}
                          onPress={null}
                          showIcon={false}
                />
                <Hr marginBottom={0} style={{marginHorizontal: 15}} color={'#e5e5e5'}/>
                <ListView
                    scrollEnabled={false}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(data.listItems)
                    }
                    renderRow={(x, s, i) => {
                        return _renderSubject(x)
                    }}
                    renderSeparator={(s, i) => data.listItems.length - 1 != i &&
                    <Hr marginBottom={0} style={{marginHorizontal: 15}} color={'#e5e5e5'}/>}
                />
            </View>
        )
    }

    _renderBottom() {
        return (
            _renderBottom({
                text: "联系顾问",
                mainText: "添加项目"
            })
        )
    }
}

export default ProjectDetailPage;
