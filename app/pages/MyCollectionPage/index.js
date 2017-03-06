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
import { connect } from 'react-redux';


import sty from './style';

import SubMenu from '../../components/SubMenu';
import Collections from '../../components/Collections';
import ScrollTab from '../../components/ScrollTab';

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
        return true;
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

    renderOld() {
        const {
            store: {
                my_collections: {activeIndex}
            },
            actions
        } = this.props;
        return (
            <View style={sty.main}>
                {this.menu}
                {activeIndex ==0 && this.renderFirstItems()}
                {activeIndex ==1 && this.renderSecondItems()}
            </View>
        )
    }
    render() {
        const {
            store: {
                my_collections: {activeIndex}
            },
            actions
        } = this.props;

        return (
            <View style={sty.main}>
                <ScrollTab
                    tabBarStyle={{height: 40}}
                    tabBarTextStyle={{fontSize: 15}}
                    page={activeIndex}
                    onChangeTab={({i}) => actions.setMyActiveCollectionTab(+i)}
                >
                    <View style={{flex: 1}} tabLabel="收藏的顾问">
                        {this.renderFirstItems()}
                    </View>
                    <View style={{flex: 1}} tabLabel="收藏的服务">
                        {this.renderSecondItems()}
                    </View>
                </ScrollTab>
            </View>
        )
    }

    get menu() {
        const {
            store: {
                my_collections: {activeIndex}
            },
            actions
        } = this.props;
        return (
            <View style={sty.menus}>
                <View style={sty.submenu}>
                    <SubMenu title="收藏的顾问" active={activeIndex==0} onPress={() => actions.setMyActiveCollectionTab(0)}/>
                </View>
                <View style={sty.submenu}>
                    <SubMenu title="收藏的服务" active={activeIndex==1} onPress={() => actions.setMyActiveCollectionTab(1)}/>
                </View>
            </View>
        )
    }

    renderSecondItems() {
        return (
            <Collections
                /*style={{marginTop: 33}}*/
                items={[{
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    numerator: 4.9,
                    deNumerator: 5,
                    serviceTimes: 1666,
                    content: ''
                }, {
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    numerator: 4.9,
                    deNumerator: 5,
                    serviceTimes: 1666,
                    content: '一站式申请'
                }, {
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    numerator: 4.9,
                    deNumerator: 5,
                    serviceTimes: 1666,
                }, {
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    numerator: 4.9,
                    deNumerator: 5,
                    serviceTimes: 1666,
                    content: 'xxxxxxxxx'
                }]}
            />
        )
    }

    renderFirstItems() {
        return (
            <Collections
                /*style={{marginTop: 33}}*/
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
        )
    }
}

export default MyCollectionPage;
// export default connect((a, b) => {
//     debugger;
//     return p;
// })(MyCollectionPage);
