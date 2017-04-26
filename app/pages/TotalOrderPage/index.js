import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Button
} from 'react-native';

import sty from './style';

import HorizontalMenu from '../../components/HorizontalMenu'
import ScrollTab from '../../components/ScrollTab';
import BoughtViews from '../../components/BoughtViews';
import Loading from '../../components/Loading';
import {NoMore} from '../../pages/ForeignTeacherPage';
import {sep} from '../../helpers';
import ModalDropdown from 'react-native-modal-dropdown';

@autobind
class TotalOrderPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.firstFetch();
    }

    firstFetch(id=this.activeId) {
        // alert(id+","+this.activeId);
        const {actions, store: {my_total_order: {
            [id+'_isFirst']: isFirst=true
        }}} = this.props;

        setTimeout(() => {
            isFirst && actions.fetchMyTotalOrder("reset");
        }, 0)
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
        this.props.actions.resetMyTotalOrderFirst();
    }

    static defaultProps = {
        menus: [
            {title: '全部', active: true, onPress: null},
            {title: '待付款', onPress: null},
            {title: '待开始', onPress: null},
            {title: '进行中', onPress: null},
            {title: '待反馈', onPress: null},
            {title: '待确认', onPress: null},
            {title: '待评价', onPress: null},
            {title: '已取消', onPress: null},
        ],
    }
    state = {}
    static propTypes = {}

    render() {
        const {
            store: {
                my_total_order: {
                    items, menus, titleIndex, activeIndex
                }
            }, actions
        } = this.props;

        return (
            /*<View sty={sty.main}>*/
            <ScrollTab
                style={{flex: 1}}
                onChangeTab={({i})=>{
                    actions.setMyTotalOrderIndex(+i);
                    this.firstFetch(menus[i].id);
                }}
                page={activeIndex}
                initialPage={0}
                /*tabContainerStyle={{flexWrap: 'wrap'}}*/
                tabBarStyle={{height: 33}}
                tabBarTextStyle={{fontSize: 13}}
            >
                {
                    menus.map(({name, id}, i) => (
                        <View style={{flex: 1}} tabLabel={name} key={i}>
                            {this.renderList(id)}
                        </View>
                    ))
                }
            </ScrollTab>
            /*</View>*/
        )
    }

    get activeId() {
        const {
            store: {
                my_total_order: {
                    menus, activeIndex
                }
            }, actions
        } = this.props;
        return menus[activeIndex].id;
    }

    get activeItems() {
        return this._getItems(this.activeId);
    }

    _getItems(id = this.activeId) {
        const {
            store: {
                my_total_order
            }, actions
        } = this.props;
        return my_total_order[id + '_items'];
    }

    renderList(id) {
        const {store: {my_total_order}, actions} = this.props;
        const {
            [id + '_currentPage']: currentPage,
            [id + '_items']: items = [],
            [id + '_isRefreshing']: isRefreshing=false,
            [id + '_isFirst']: isFirst=true,
            [id + '_hasMore']: hasMore=true,
            [id + '_isFetching']: isFetching=true,
        } = my_total_order;
        if (isFirst && isFetching) {
            return <Loading />;
        }
        return (
            <BoughtViews
                initialListSize={10}
                onEndReachedThreshold={0}
                onEndReached={(evt) => {
                    if (!isFetching && hasMore) {
                        actions.fetchMyTotalOrder("append");
                    }
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => {
                            actions.fetchMyTotalOrder("refresh");
                        }}
                    />
                }
                renderFooter={() => {
                    if (isFetching && !isRefreshing) {
                        return <Loading/>;
                    }
                    if (!hasMore) {
                        return NoMore;
                    }
                }}
                renderHeader={() => sep(true)}
                items={items}
            />
        )
    }
}

export default TotalOrderPage;
