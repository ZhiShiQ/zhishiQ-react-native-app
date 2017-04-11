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
    TextInput,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Collapsible from 'react-native-collapsible';

import sty, {BGCLR, IMGSIZE} from './style';

import {pickImage} from '../../helpers/picker';
import ChatMessage from '../../components/ChatMessage';
import AutoGrowInput from '../../components/AutoGrowInput';


@autobind
class ChatPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.refs.listView.scrollToEnd({animated: false})
        // setTimeout(() => this.refs.listView.scrollToEnd({animated: false}), 0);
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {}
    state = {
        menuVisible: false
    }
    static propTypes = {};

    render() {
        const {store} = this.props

        return (
            <View style={sty.main}>
                <ListView
                    ref="listView"
                    pageSize={10}
                    initialListSize={20}
                    contentContainerStyle={sty.chats}
                    renderRow={this._renderRow}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows([{
                            content: "上午 12：00",
                            type: 'text'
                        },{
                            content: "内容...",
                            type: 'other',
                            lock:true,
                            lockTip:'该消息为私密消息，仅Lori May可见'
                        }, {
                            content: "内容是什么内容...",
                            type: 'self',
                            lock: true,
                            lockTip:'该消息为私密消息，仅 老司机 可见'
                        }, {
                            content: "下午 12：00",
                            type: 'text'
                        },{
                            content: "内容是什么内容是什么内容...",
                            type: 'self'
                        }, {
                            content: "内容是什么内容是什...",
                            type: 'other',
                            lock: true,
                            lockTip:'该消息为私密消息，仅 moyu 可见'
                        }].map((item, i, {length})=>({...item, style: {zIndex: length-i+2}})))
                    }

                    renderFooter={() => (
                        null
                    )}
                />
                <View style={{flex: 0}}>
                    <View style={sty.sender}>
                        <AutoGrowInput
                            autoCorrect={false}
                            multiline={true}
                            autoCapitalize={'none'}
                            style={sty.input}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({menuVisible: !this.state.menuVisible})
                            }}
                            style={[sty.btn, {marginLeft: 10, overflow: 'hidden'}]}
                        >
                            <Text style={{overflow: 'hidden'}}>
                                <MaterialCommunityIcons
                                    color="#4a4a4a"
                                    style={{overflow: 'hidden'}}
                                    name="plus"
                                    size={18}
                                />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Collapsible collapsed={!this.state.menuVisible}>
                        <View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-around'}}>
                            <TouchableOpacity
                                style={{alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => {
                                    pickImage()
                                        .then(data => alert(JSON.stringify(data)), data => alert(JSON.stringify(data)))
                                }}
                            >
                                <View style={{height: 70, width: 70, backgroundColor: '#eee', marginBottom: 5}}>

                                </View>
                                <Text style={{fontSize: 12, color: '#848484'}}>图片</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => {

                                }}
                            >
                                <View style={{height: 70, width: 70, backgroundColor: '#eee', marginBottom: 5}}>

                                </View>
                                <Text style={{fontSize: 12, color: '#848484'}}>文件</Text>
                            </TouchableOpacity>
                        </View>
                    </Collapsible>
                </View>
            </View>
        )
    }

    _renderRow(data, s, index) {
        return <ChatMessage {...data} />
    }

}

export default ChatPage;
