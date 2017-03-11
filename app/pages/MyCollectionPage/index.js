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
import HomeItems from '../../components/HomeItems';

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

    render() {
        const {
            store: {
                my_collections: {activeIndex}
            },
            actions
        } = this.props;
        return (
            <View style={sty.main}>
                {this.menu}
                <View style={{marginTop: 34, flex: 1}}>
                {activeIndex ==0 && this.renderFirstItems()}
                {activeIndex ==1 && this.renderSecondItems()}
                </View>
            </View>
        )
    }
    render2() {
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
                    initialPage={activeIndex}
                    /*onChangeTab={({i}) => actions.setMyActiveCollectionTab(+i)}*/
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
                    <SubMenu textActive title="收藏的顾问" active={activeIndex==0} onPress={() => actions.setMyActiveCollectionTab(0)}/>
                </View>
                <View style={sty.submenu}>
                    <SubMenu textActive title="收藏的服务" active={activeIndex==1} onPress={() => {actions.setMyActiveCollectionTab(1)}}/>
                </View>
            </View>
        )
    }

    renderSecondItems() {
        return (
            <HomeItems
                swipout
                bottomSep
                style={{backgroundColor: '#fff'}}
                items={[{
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    style: {paddingHorizontal: 15},
                    bottomValues: [4.9, 1666],
                    content: '由留学行家、外籍文书导师、面试导师、签证导师和辅导员组成的5V1导师团队，为您提...'
                }, {
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    bottomValues: [4.9, 1666],
                    style: {paddingHorizontal: 15},
                    content: '由留学行家、外籍文书导师、面试导师、签证导师和辅导员组成的5V1导师团队，为您提...'
                }, ]}
            />
        )
    }

    renderFirstItems() {
        return (
            <HomeItems
                swipout
                bottomSep
                style={{backgroundColor: '#fff'}}
                items={[{
                    style: {paddingHorizontal: 15},
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    bottomValues: [4.9, 599],
                    content: '伦敦艺术大学面试招生官',
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
                    style: {paddingHorizontal: 15},
                    onPress: alert,
                    onRemove: alert,
                    thumbnail: null,
                    title: 'Abby R',
                    content: '伦敦艺术大学面试招生官',
                    bottomValues: [4.9, 599],
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
                }, ]}
            />
        )
    }
}

export default MyCollectionPage;
// export default connect((a, b) => {
//     debugger;
//     return p;
// })(MyCollectionPage);
