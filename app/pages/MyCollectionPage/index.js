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
        const {store: {my_collections: {services}}, actions} = this.props;

        return (
            <HomeItems
                swipout
                bottomSep
                style={{backgroundColor: '#fff'}}
                items={services.map(({avatar, name, content, appointNum, rate, ...rest}, i) => ({
                    ...rest, key: name,
                    content, thumbnail: {uri: avatar}, title: name, bottomValues: [rate, appointNum],
                    onPress: alert, onRemove: () => actions.delMyCollectionServiceByIndex(i), style: {paddingHorizontal: 15},
                }))}
            />
        )
    }

    renderFirstItems() {
        const {store: {my_collections: {people}}, actions} = this.props;
        return (
            <HomeItems
                swipout
                bottomSep
                style={{backgroundColor: '#fff'}}
                items={people.map(({rate, appointNum, name, avatar, content, tags, ...rest}, i) => ({
                    ...rest, content, key: name,
                    title: name, thumbnail: {uri: avatar},
                    bottomValues: [rate, appointNum],
                    onPress: null, onRemove: () => actions.delMyCollectionPeopleByIndex(i), style: {paddingHorizontal: 15},
                    tags
                }))}
            />
        )
    }
}

export default MyCollectionPage;
// export default connect((a, b) => {
//     debugger;
//     return p;
// })(MyCollectionPage);
