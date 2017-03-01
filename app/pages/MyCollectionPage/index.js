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

import sty from './style';

import SubMenu from '../../components/SubMenu';
import Collections from '../../components/Collections';

@autobind
class MyCollectionPage extends Component {
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
                <View style={sty.menus}>
                    <View style={sty.submenu}>
                        <SubMenu title="收藏的顾问" active onPress={alert}/>
                    </View>
                    <View style={sty.submenu}>
                        <SubMenu title="收藏的服务" onPress={alert}/>
                    </View>
                </View>

                <Collections
                    style={{marginTop: 33}}
                    items={[{
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [{
                            title: '一站式申请',
                            onPress: alert
                        }, {
                            title: '全套文书导师',
                            onPress: alert
                        }, {
                            title: '文书导师',
                            onPress: alert
                        }]
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [
                            '一站式申请',
                            '全套文书导师',
                            '文书导师'
                        ]
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [
                            '一站式申请',
                            '全套文书导师',
                            '文书导师'
                        ]
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [
                            '一站式申请',
                            '全套文书导师',
                            '文书导师'
                        ]
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [
                            '一站式申请',
                            '全套文书导师',
                            '文书导师'
                        ]
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        tags: [
                            '一站式申请',
                            '全套文书导师',
                            '文书导师'
                        ]
                    }]}
                />
            </View>
        )
    }
}

export default MyCollectionPage;
