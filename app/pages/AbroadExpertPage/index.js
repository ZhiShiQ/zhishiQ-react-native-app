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
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import {PADDING_SIZE, NAV_BAR_HEIGHT, DURATION, OPACITY_BG_CLR} from '../../constant';
import * as Animatable from 'react-native-animatable';

import sty from './style';


import DropDown from '../../components/DropDown';
import CustomDropDown from '../../components/CustomDropDown';
import RightHalfMenu from '../../components/RightHalfMenu';
import Services from '../../components/Services';
import LinkItems from '../../components/LinkItems';
import CollapsibleItem from '../../components/CollapsibleItem';
import TextWithBgs from '../../components/TextWithBgs';
import Hr from '../../components/Hr';
import Loading from '../../components/Loading';

const AnimatableLinkItems = Animatable.createAnimatableComponent(LinkItems)

@autobind
class AbroadExpertPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {store: {abroad_expert: {list, isFetching, firstMount}}, actions} = this.props;
        if (!isFetching && firstMount) {
            actions.fetchAbroadExpert(1, {reset: true});
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
        showRightMenu: false,
        expended: false,
        refreshing: true,
        categories: []
    }
    static propTypes = {};
    pageSize = 15;

    render() {
        const {store: {abroad_expert: {
            list, isFetching, firstMount, hasMore
        }}, actions} = this.props;
        const NoMore = <View style={{marginVertical: 20, alignItems: 'center'}}><Text>没有更多了</Text></View>;

        return (
            <View style={{flex: 1}}>
                <View style={{marginTop: 33 + 35.5}}></View>
                {isFetching && (firstMount || !hasMore)
                    ? <Loading />
                    : hasMore ? <Services
                            items={list.map(data => ({
                                ...data, onPress: () => {
                                    const newData = {...data, avatar: data.thumbnail, name: data.title};
                                    delete newData.thumbnail;
                                    delete newData.title;
                                    delete newData.intro;
                                    newData.content = data.intro;
                                    newData.rate = data.mark;
                                    newData.reviews = data.appointNum;
                                    actions.setAbroadExpertDetailBase(newData);
                                    Actions.abroadExpertDetail();
                                }
                            }))}
                            onEndReachedThreshold={100}
                            onEndReached={this._onEndReached}
                            pageSize={this.pageSize}
                            renderFooter={() => {
                                if (isFetching) {
                                    return hasMore ? <Loading /> : NoMore;
                                }
                            }}
                        /> : NoMore}
                {this.subMenu}
            </View>
        )
    }

    _onEndReached(evt) {
        const {store: {abroad_expert: {list, isFetching, hasMore, currentPage}}, actions} = this.props;
        if (!isFetching && hasMore) {
            actions.fetchAbroadExpert(currentPage + 1);
        }
    }

    get collapsible() {
        const {
            store: {
                abroad_expert: {
                    filters: {
                        nations, domains, orders, degrees, ways,
                        degreeSelectedIndex, domainSelectedIndex, nationSelectedIndex,
                        waySelectedIndex, sortSelectedIndex, domainSubSelectedIndex,
                        degreeTitle, domainTitle, nationTitle, sortTitle,
                    }
                }
            }, actions
        } = this.props;
        const {expended} = this.state;
        const activeItem = (title, rest) => ({
            title,
            color: '#fff',
            style: {borderColor: 'transparent'},
            bgColor: '#fc6d34', ...rest
        });
        const showNum = 5;
        return (
            <View style={[{
                position: 'absolute', top: 33, left: 0, right: 0,
            }, expended && {backgroundColor: OPACITY_BG_CLR, height: deviceHeight,}]}>
                <CollapsibleItem
                    ref="collapsible"
                    activeOpacity={1}
                    onExpendOrColl={expended => this.setState({expended})}
                    style={{
                        backgroundColor: '#fff',
                        borderBottomWidth: expended ? 0 : StyleSheet.hairlineWidth, borderColor: '#e5e5e5'
                    }}
                    control={
                        <TextWithBgs
                            style={{paddingHorizontal: 15, paddingTop: 8, paddingBottom: expended ? 6 : 8}}
                            items={ways.slice(0, showNum).map((x, i) => (waySelectedIndex == i
                                    ? activeItem(x.title)
                                    : {
                                        ...x, onPress: () => {
                                            actions.setAbroadExpertFilterWaySelectedIndex(i)
                                            actions.fetchAbroadExpert(1, {resetList: true});
                                            this.refs.collapsible.collapse();
                                            this.setState({expended: false});
                                        }
                                    }
                            ))}
                            bgColor={'#fff'}
                            color={'#4a4a4a'}
                            eachStyle={{
                                borderRadius: 3,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: '#979797',
                                overflow: 'hidden'
                            }}
                        />
                    }
                >
                    <TextWithBgs
                        style={{paddingHorizontal: 15, paddingBottom: 8, backgroundColor: '#fff'}}
                        items={ways.slice(showNum).map((x, i) => (waySelectedIndex == i + showNum
                                ? activeItem(x.title)
                                : {
                                    ...x, onPress: () => {
                                        actions.setAbroadExpertFilterWaySelectedIndex(i + showNum);
                                        actions.fetchAbroadExpert(1, {resetList: true});
                                        this.refs.collapsible.collapse();
                                        this.setState({expended: false});
                                    }
                                }
                        ))}
                        bgColor={'#fff'}
                        color={'#4a4a4a'}
                        eachStyle={{
                            borderRadius: 3,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#979797',
                            overflow: 'hidden'
                        }}
                    />
                </CollapsibleItem>
            </View>
        )
    }


    get hiddenMenu() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;

        let menus = [];
        filterPro.forEach((o, i) => {
            if (Array.isArray(o.categories)) {
                menus.push({
                    options: o.categories,
                    ref: 'pro-' + i
                });
            }
        })
        return (
            <View>
                {
                    menus.map((m, i) =>
                        <DropDown
                            key={i}
                            {...m}
                            rightHalf
                            visible={false}
                        />
                    )
                }
            </View>
        )
    }


    hideMenus(ignores = []) {
        for (let key in this.refs) {
            if (key.startsWith("submenu") && ignores.indexOf(key) == -1) {
                this.refs[key].hide();
            }
        }
        this.setState({showRightMenu: false})
    }

    get subMenu() {
        const {
            store: {
                abroad_expert: {
                    filters: {
                        nations, domains, orders, degrees, ways,
                        degreeSelectedIndex, domainSelectedIndex, nationSelectedIndex,
                        waySelectedIndex, sortSelectedIndex, domainSubSelectedIndex,
                        degreeTitle, domainTitle, nationTitle, sortTitle,
                    }
                }
            }, actions
        } = this.props;
        const {showRightMenu, categories, selectedIndex, superIndex, tabIndex = -1, showRootMenu = false} = this.state;
        const n = 4;

        return (
            <View style={{position: 'absolute', flexDirection: 'row'}}>
                {this.collapsible}

                <CustomDropDown
                    ref="submenu1"
                    showIcon={false}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex != 0 && {color: '#848484'}]}
                    getModalStyle={(layout) => ({right: -(n - 1) * layout.width, left: 0})}
                    onPress={(show) => {
                        this.hideMenus(["submenu1"])
                    }}
                    onShowOrHide={show => this.setState({tabIndex: show ? 0 : -1, showRootMenu: show})}
                    title={nationTitle}
                    autoHidden
                    items={nations && nations.map((d, i) => ({
                        ...d, onPress: () => {
                            if (nationSelectedIndex != i) {
                                actions.setAbroadExpertFilterNationTitle(i != 0 ? d.title : "地区");
                                actions.setAbroadExpertFilterNationSelectedIndex(i);
                                actions.fetchAbroadExpert(1, {resetList: true});
                            }
                        }
                    }))}
                />

                <CustomDropDown
                    ref="submenu2"
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex != 0 && {color: '#848484'}]}
                    selectedIndex={domainSelectedIndex}
                    getModalStyle={(layout) => ({
                        backgroundColor: '#fff',
                        left: -layout.width,
                        right: -(n - 2) * layout.width,
                        height: deviceHeight - (layout.y + layout.height)
                    })}
                    onPress={(show) => {
                        this.hideMenus(["submenu2"])
                    }}
                    onShowOrHide={show => this.setState({tabIndex: show ? 0 : -1, showRootMenu: show})}
                    title={domainTitle}
                    items={domains && domains.map(({categories, ...r}, i) => ({
                        ...r,
                        onPress: categories ? (data, i) => {
                                this.setState({
                                    showRightMenu: (superIndex == i && showRightMenu) ? false : true, categories,
                                    selectedIndex: i == domainSelectedIndex ? domainSubSelectedIndex : 0,
                                    superIndex: i,
                                })
                            } : () => {
                                if (domainSelectedIndex != i) {
                                    actions.setAbroadExpertFilterDomainTitle(i != 0 ? d.title : "专业");
                                    actions.setAbroadExpertFilterDomainSelectedIndex(i);
                                    actions.fetchAbroadExpert(1, {resetList: true});
                                }
                                this.setState({showRightMenu: false})
                                this.refs.submenu2.hide();
                            },
                        style: showRightMenu && superIndex == i ? {backgroundColor: '#fafafa'} : {},
                        leftTextStyle: showRightMenu && superIndex != i ? {color: '#848484'} : {}
                    }))}
                />

                <CustomDropDown
                    ref="submenu3"
                    selectedIndex={degreeSelectedIndex}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex != 2 && {color: '#848484'}]}
                    onPress={(show) => {
                        this.hideMenus(["submenu3"])
                    }}
                    onShowOrHide={show => this.setState({tabIndex: show ? 2 : -1, showRootMenu: show})}
                    getModalStyle={(layout) => ({
                        left: -(n - 2) * layout.width,
                        right: -(n - 3) * layout.width,
                        height: deviceHeight - (layout.y + layout.height)
                    })}
                    title={degreeTitle}
                    autoHidden
                    items={degrees && degrees.map((d, i) => ({
                        ...d, onPress: () => {
                            if (degreeSelectedIndex != i) {
                                actions.setAbroadExpertFilterNationTitle(i != 0 ? d.title : "学位");
                                actions.setAbroadExpertFilterNationSelectedIndex(i);
                                actions.fetchAbroadExpert(1, {resetList: true});
                            }
                        }
                    }))}
                />

                <CustomDropDown
                    ref="submenu4"
                    selectedIndex={sortSelectedIndex}
                    dynamicTitle={false}
                    textStyle={[sty.title, showRootMenu && tabIndex != 3 && {color: '#848484'}]}
                    onPress={(show) => {
                        this.hideMenus(["submenu4"])
                    }}
                    onShowOrHide={show => this.setState({tabIndex: show ? 3 : -1, showRootMenu: show})}
                    getModalStyle={(layout) => ({
                        left: -(n - 1) * layout.width,
                        right: -(n - 4) * layout.width,
                        height: deviceHeight - (layout.y + layout.height)
                    })}
                    title={sortTitle}
                    autoHidden
                    items={orders && orders.map((d, i) => ({
                        ...d, onPress: () => {
                            if (sortSelectedIndex != i) {
                                actions.setAbroadExpertFilterSortTitle(i != 0 ? d.title : "排序");
                                actions.setAbroadExpertFilterSortSelectedIndex(i);
                                actions.fetchAbroadExpert(1, {resetList: true});
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
                        left: this.refs.submenu2.btnLayout.width << 1,
                        height: deviceHeight - (this.refs.submenu2.btnLayout.height + NAV_BAR_HEIGHT + this.refs.submenu2.btnLayout.y),
                        backgroundColor: '#F7F7F7',
                        right: 0,
                        borderLeftWidth: 1,
                        borderColor: '#e5e5e5'
                    }}
                    renderSeparator={() =>
                        <Hr marginBottom={0} color={'#e5e5e5'} style={{marginRight: 15}}/>
                    }
                    items={categories.map(({title, ...r}, i) => ({
                        ...r, leftText: title, rightStyle: {flex: 0},
                        style: {backgroundColor: '#F7F7F7'}, showBorder: null,
                        showIcon: superIndex == domainSelectedIndex && selectedIndex == i, iconName: "check",
                        onPress: () => {
                            actions.setAbroadExpertFilterDomainSubSelectedIndex(i);
                            actions.setAbroadExpertFilterDomainSelectedIndex(superIndex);
                            if (r.id != -1) {
                                actions.setAbroadExpertFilterDomainTitle(title);
                            } else {
                                actions.setAbroadExpertFilterDomainTitle(domains[superIndex].title);
                            }
                            actions.fetchAbroadExpert(1, {resetList: true});
                            this.hideMenus();
                        },
                    }))}
                />}
            </View>
        )
    }
}

export default AbroadExpertPage;
