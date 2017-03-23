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
    RefreshControl,
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {PADDING_SIZE, DURATION, NAV_BAR_HEIGHT} from '../../constant';
import sty from './style';

import Collections from '../../components/Collections';
import DropDown from '../../components/DropDown';
import CustomDropDown from '../../components/CustomDropDown';
import CirImage from '../../components/CirImage';
import ForeignTeacherItem from '../../components/ForeignTeacherItem';
import Hr from '../../components/Hr';
import HomeItem from '../../components/HomeItem';
import Loading from '../../components/Loading';
import LinkItems from '../../components/LinkItems';

import * as Animatable from 'react-native-animatable';
const AnimatableLinkItems = Animatable.createAnimatableComponent(LinkItems)

@autobind
class ForeignTeacherPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {store: {foreign_teacher: {list, isFetching, firstMount}}, actions} = this.props;
        if (!isFetching && firstMount) {
            actions.fetchForeignTeacher(1, {reset: true});
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState));
    }

    componentWillUpdate(newProps, newState, newContext) {

    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {}
    state = {
        refreshing: true,
        showRightMenu: false,
        categories: []
    }
    static propTypes = {};
    pageSize = 15;

    render() {
        const {store: {foreign_teacher: {list, isFetching, firstMount, hasMore}}, actions} = this.props;
        const NoMore = <View style={{marginVertical: 20, alignItems: 'center'}}><Text>没有更多了</Text></View>;

        return (
            <View style={{flex: 1}}>
                <View style={{height: 33}}/>
                {isFetching && (firstMount || !hasMore)
                    ? <Loading />
                    : hasMore ? <ListView
                        enableEmptySections
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(list.map(x=>({...x, style: { paddingHorizontal: 15, backgroundColor: '#fff' }})))
                        }
                        renderRow={this._renderRow}
                        renderSeparator={(s, i) => this._renderSeparator(i ,list)}
                        onEndReachedThreshold={100}
                        onEndReached={this._onEndReached}
                        pageSize={this.pageSize}
                        /*refreshControl={
                         <RefreshControl
                         refreshing={isFetching}
                         onRefresh={this._onRefresh}
                         tintColor="#ff0000"
                         style={{}}
                         />
                         }*/
                        renderFooter={() => {
                            if (isFetching) {
                                return hasMore ? <Loading style={{backgroundColor: 'transparent'}} /> : NoMore;
                            }
                        }}
                    /> : NoMore
                }
                {this.subMenu}
            </View>
        )
    }
    _onRefresh() {
        const {store: {foreign_teacher: {list, isFetching, hasMore, currentPage}}, actions} = this.props;
        // actions.fetchForeignTeacher(currentPage+1);
    }

    _onEndReached(evt) {
        const {store: {foreign_teacher: {list, isFetching, hasMore, currentPage}}, actions} = this.props;
        if (!isFetching && hasMore) {
            actions.fetchForeignTeacher(currentPage+1);
        }
    }

    _renderSeparator(i, a) {
        if (i != a.length - 1)
            return <Hr key={i} marginBottom={0} color="#e5e5e5"/>
    }

    hideMenus(ignores=[]) {
        for (let key in this.refs) {
            if (key.startsWith("submenu") && ignores.indexOf(key)==-1 ) {
                this.refs[key].hide();
            }
        }
        this.setState({showRightMenu: false})
    }

    get subMenu() {
        const {
            store: {
                foreign_teacher: {filters: {
                    prices, domains, priceSelectedIndex, domainSelectedIndex,
                    otherSelectedIndex, sortSelectedIndex, domainSubSelectedIndex,
                    priceTitle, domainTitle, otherTitle, sortTitle,
                    orders, others
                }}
            }, actions
        } = this.props;
        const {showRightMenu, categories, selectedIndex, superIndex, tabIndex=-1, showRootMenu=false} = this.state;
        const n = 4;

        return (
            <View style={{position: 'absolute', flexDirection: 'row'}}>
                <CustomDropDown
                    ref="submenu1"
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex!=0 && {color: '#848484'}]}
                    selectedIndex={domainSelectedIndex}
                    getModalStyle={(layout) => ({backgroundColor: '#fff', right: -(n-1)*layout.width, left: 0})}
                    onPress={(show) => {this.hideMenus(["submenu1"])}}
                    onShowOrHide={show => this.setState({tabIndex: show?0:-1, showRootMenu: show})}
                    title={domainTitle}
                    selectedStyle={{}}
                    items={domains.map(({categories, ...r}, i) => ({
                        ...r,
                        onPress: categories? (data, i)=>{
                            this.setState({
                                showRightMenu: (superIndex==i && showRightMenu)?false:true, categories,
                                selectedIndex: i==domainSelectedIndex?domainSubSelectedIndex:0,
                                superIndex: i,
                            })
                        } : () => {
                                if (domainSelectedIndex != i) {
                                    actions.setForeignTeacherFilterDomainTitle(i != 0 ? d.title : "专业");
                                    actions.setForeignTeacherFilterDomainSelectedIndex(i);
                                    actions.fetchForeignTeacher(1, {resetList: true});
                                }
                                this.setState({showRightMenu: false})
                                this.refs.submenu1.hide();
                            },
                        style: showRightMenu && superIndex == i ? {backgroundColor: '#fafafa'} : {},
                        leftTextStyle: showRightMenu && superIndex != i ? {color: '#848484'} : {}
                    }))}
                />

                <CustomDropDown
                    ref="submenu2"
                    selectedIndex={priceSelectedIndex}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex!=1 && {color: '#848484'}]}
                    onPress={(show) => {this.hideMenus(["submenu2"])}}
                    onShowOrHide={show => this.setState({tabIndex: show?1:-1, showRootMenu: show})}
                    getModalStyle={(layout) => ({left: -layout.width, right: -(n-2)*layout.width, height: deviceHeight-(layout.y+layout.height)})}
                    title={priceTitle}
                    autoHidden
                    items={prices.map((d, i) => ({
                        ...d, onPress: () => {
                            if (priceSelectedIndex != i) {
                                actions.setForeignTeacherFilterPriceTitle(i!=0?d.title:"价格");
                                actions.setForeignTeacherFilterPriceSelectedIndex(i);
                                actions.fetchForeignTeacher(1, {resetList: true});
                            }
                        }
                    }))}
                />

                <CustomDropDown
                    ref="submenu3"
                    selectedIndex={otherSelectedIndex}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex!=2 && {color: '#848484'}]}
                    onPress={(show) => {this.hideMenus(["submenu3"])}}
                    onShowOrHide={show => this.setState({tabIndex: show?2:-1, showRootMenu: show})}
                    getModalStyle={(layout) => ({left: -(n-2)*layout.width, right: -(n-3)*layout.width, height: deviceHeight-(layout.y+layout.height)})}
                    title={otherTitle}
                    autoHidden
                    items={others.map((d, i) => ({
                        ...d, onPress: () => {
                            if (otherSelectedIndex != i) {
                                actions.setForeignTeacherFilterOtherTitle(i != 0 ? d.title : "其它服务");
                                actions.setForeignTeacherFilterOtherSelectedIndex(i);
                                actions.fetchForeignTeacher(1, {resetList: true});
                            }
                        }
                    }))}
                />
                <CustomDropDown
                    ref="submenu4"
                    selectedIndex={sortSelectedIndex}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex!=3 && {color: '#848484'}]}
                    onPress={(show) => {this.hideMenus(["submenu4"])}}
                    onShowOrHide={show => this.setState({tabIndex: show?3:-1, showRootMenu: show})}
                    getModalStyle={(layout) => ({left: -(n-1)*layout.width, right: -(n-4)*layout.width, height: deviceHeight-(layout.y+layout.height)})}
                    title={sortTitle}
                    autoHidden
                    items={orders.map((d, i) => ({
                        ...d, onPress: () => {
                            if (sortSelectedIndex != i) {
                                actions.setForeignTeacherFilterSortTitle(i!=0?d.title:"排序");
                                actions.setForeignTeacherFilterSortSelectedIndex(i);
                                actions.fetchForeignTeacher(1, {resetList: true});
                            }
                        }
                    }))}
                />

                {showRightMenu &&
                <AnimatableLinkItems
                    animation="fadeIn"
                    duration={DURATION}
                    style={{
                        position: 'absolute',
                        top: this.refs.submenu2.btnLayout.height + 1,
                        left: this.refs.submenu2.btnLayout.width<<1,
                        height: deviceHeight - (this.refs.submenu2.btnLayout.height + NAV_BAR_HEIGHT +this.refs.submenu2.btnLayout.y),
                        backgroundColor: '#F7F7F7',
                        right: 0,
                        borderLeftWidth: 1,
                        borderColor: '#e5e5e5'
                    }}
                    renderSeparator={()=>
                        <Hr marginBottom={0} color={'#e5e5e5'} style={{marginRight: 15}}/>
                    }
                    items={categories.map(({title, ...r}, i) => ({
                        ...r, leftText: title, rightStyle: {flex: 0},
                        style: {backgroundColor: '#F7F7F7'}, showBorder: null,
                        showIcon: superIndex == domainSelectedIndex && selectedIndex == i, iconName: "check",
                        onPress: () => {
                            actions.setForeignTeacherFilterDomainSubSelectedIndex(i);
                            actions.setForeignTeacherFilterDomainSelectedIndex(superIndex);
                            if (r.id != -1) {
                                actions.setForeignTeacherFilterDomainTitle(title);
                            } else {
                                actions.setForeignTeacherFilterDomainTitle(domains[superIndex].title);
                            }
                            actions.fetchForeignTeacher(1, {resetList: true});
                            this.hideMenus();
                        },
                    }))}
                />
                }
            </View>
        )
    }

    _renderRow2(data, s, i) {
        const {actions} = this.props;
        return <ForeignTeacherItem
            onPress={() => {
                const newData = {...data, avatar: data.thumbnail, name: data.title};
                delete newData.thumbnail;
                delete newData.title;
                newData.clients = data.client_count;
                newData.rate = data.average_rate;
                newData.content = data.brief;
                newData.reviews = data.review_count;
                actions.setForeignTeacherDetailBase(newData);
                Actions.foreignTeacherDetail();
            }} {...data} key={i}/>
    }

    _renderRow({experiences, educations, ...data}, s, i) {
        const {actions} = this.props;

        return <HomeItem
            onPress={() => {
                const newData = {...data, avatar: data.thumbnail, name: data.title};
                delete newData.thumbnail;
                delete newData.title;
                newData.content = data.brief;
                actions.setForeignTeacherDetailBase(newData);
                // actions.setForeignTeacherDetailExperiences(experiences);
                // actions.setForeignTeacherDetailEducations(educations);
                Actions.foreignTeacherDetail();
            }} {...data} key={data.id}/>
    }


    get computeFilterPro() {
        const {store: {foreign_teacher: {filterZone, filterPro}}, actions} = this.props;


        return filterPro.map((pro, i) => {
            const {categories, ...rest} = pro;
            if (categories) {
                rest.onPress = () => {
                }
            }
            return rest;
        });
    }

    get computeFilterZone() {
        const {
            store: {foreign_teacher: {filterZone, filterPro}}, actions
        } = this.props;
        return filterZone;
    }


}

export default ForeignTeacherPage;
