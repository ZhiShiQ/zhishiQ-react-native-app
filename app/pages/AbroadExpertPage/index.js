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
import {PADDING_SIZE, NAV_BAR_HEIGHT, DURATION} from '../../constant';
import * as Animatable from 'react-native-animatable';

import sty from './style';


import DropDown from '../../components/DropDown';
import CustomDropDown from '../../components/CustomDropDown';
import RightHalfMenu from '../../components/RightHalfMenu';
import Services from '../../components/Services';
import LinkItems from '../../components/LinkItems';

const AnimatableLinkItems = Animatable.createAnimatableComponent(LinkItems)

@autobind
class AbroadExpertPage extends Component {
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
    }
    static propTypes = {}

    render() {
        const {
            store: {
                abroad_expert: {}, actions
            }
        } = this.props

        return (
            <View style={sty.main}>
                {<Services
                    style={{marginTop: 33}}
                    items={[{
                        onPress: () => Actions.abroadExpertDetail({params: {title: 'titile'}}),
                        title: 'titile',
                        thumbnail: {},
                        tags: ["a", "b", "c", "d"],
                        points: ["a", "b", "c", "d"],
                        intro: "helllllll",
                        price: 12333,
                        mark: 4,
                        appointNum: 4
                    }]}
                />}
                {this.subMenu}
            </View>
        )
    }

    get computeFilterZone() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        return filterZone;
    }

    get computeFilterPro() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        const {showRightMenu} = this.state;


        return filterPro.map((pro, i) => {
            let {categories, ...rest} = pro;
            if (categories) {
                rest.onPress = () => {
                    this.setState({showRightMenu: !showRightMenu});
                }
                // rest = <CustomDropDown
                //     zIndex={20}
                //     title={rest.title}
                //     style={{backgroundColor: '#fff', alignItems: 'flex-start'}}
                //     items={[{
                //         title: "SUB1"
                //     }, {
                //         title: "SUB2"
                //     }]}
                //     icon={false}
                //     getModalStyle={(layout) => ({left: deviceWidth/2, right: 0, height: deviceHeight})}
                //     autoHidden
                //     dynamicTitle={false}
                // />
            }
            return rest;
        });
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
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        const {showRightMenu} = this.state;
        return (
            <View style={sty.menu}>

                {/*<DropDown*/}
                    {/*height={deviceHeight*.45}*/}
                    {/*options={this.computeFilterZone} title="地区"/>*/}

                <CustomDropDown
                    ref="submenu1"
                    showIcon={false}
                    dynamicTitle={false}
                    autoHidden
                    textStyle={sty.title}
                    getModalStyle={(layout) => ({right: -layout.width, left: 0})}
                    onPress={(show) => {this.hideMenus(["submenu1"])}}
                    title={"地区"}
                    selectedStyle={{}}
                    items={this.computeFilterZone}
                />

                <CustomDropDown
                    ref="submenu2"
                    showIcon={false}
                    dynamicTitle={false}
                    textStyle={sty.title}
                    onPress={(show) => {this.hideMenus(["submenu2"])}}
                    getModalStyle={(layout) => ({left: -layout.width, right: 0, height: deviceHeight-(layout.y+layout.height)})}
                    title={"专业"}
                    items={this.computeFilterPro}
                />

                {showRightMenu &&
                    <AnimatableLinkItems
                        animation="fadeIn"
                        duration={DURATION}
                        style={{
                            position: 'absolute',
                            top: this.refs.submenu2.btnLayout.height + 1,
                            left: deviceWidth/2,
                            height: deviceHeight - (this.refs.submenu2.btnLayout.height+this.refs.submenu2.btnLayout.y),
                            right: 0
                        }}
                        items={[{
                            leftText: "SUB1",
                            onPress: alert,
                            style: {backgroundColor: '#F7F7F7'}
                        }, {
                            leftText: "SUB2",
                            onPress: alert,
                            style: {backgroundColor: '#F7F7F7'}
                        }]}
                    />
                }
            </View>
        )
    }
}

export default AbroadExpertPage;
