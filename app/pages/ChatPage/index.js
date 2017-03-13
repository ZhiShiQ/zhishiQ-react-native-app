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

import sty, {BGCLR, IMGSIZE} from './style';

import ChatMessage from '../../components/ChatMessage';


@autobind
class ChatPage extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {
        // this.refs.listView.scrollToEnd({animated: false})
        setTimeout(() => this.refs.listView.scrollToEnd({animated: false}), 0);
    }
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {
    }
    static defaultProps = {}
    state = {}
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
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "",
                            type: 'self'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "",
                            type: 'self'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "内容是什么内容是什么内容是什么内容内容...",
                            type: 'other'
                        }, {
                            content: "",
                            type: 'self'
                        }])
                    }
                />
                <View style={sty.sender}>
                    <TextInput
                        style={sty.input}
                    />
                    <View style={[sty.btn, {marginHorizontal: 10}]}></View>
                    <View style={sty.btn}></View>
                </View>
            </View>
        )
    }

    _renderRow(data, s, index) {
        return <ChatMessage {...data} />
    }

}

export default ChatPage;
