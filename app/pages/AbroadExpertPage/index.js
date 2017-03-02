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
import sty from './style';


import DropDown from '../../components/DropDown';
import RightHalfMenu from '../../components/RightHalfMenu';
import Services from '../../components/Services';

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
        return !Map(this.props).equals(Map(newProps));
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
        rightMenuTop: 0
    }
    static propTypes = {}

    render() {
        const {
            store: {
                abroad_expert: {}, actions
            }
        } = this.props

        /* TODO: HERE */
        return (
            <View style={sty.main}>
                {this.subMenu}
                <Services
                    items={[{
                        onPress: null,
                        title: 'titile',
                        thumbnail: {},
                        tags: ["a", "b", "c", "d"],
                        points: ["a", "b", "c", "d"],
                        intro: "helllllll",
                        price: 12333,
                        mark: 4,
                        appointNum: 4
                    }]}
                />
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


        return filterPro.map((pro, i) => {
            const {categories, ...rest} = pro;
            if (categories) {
                rest.onPress = () => {
                    this.setState({
                        rightMenuTop: this.drop.bound.top,
                        showRightMenu: true
                    })
                }
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

    get subMenu() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        return (
            <View style={sty.menu}>

                <DropDown
                    height={deviceHeight*.45}
                    options={this.computeFilterZone} title="地区"/>

                <DropDown
                    ref={r => this.drop = r}
                    textStyle={sty.title}
                    title={"专业"}
                    options={this.computeFilterPro}
                />
                {/*showRightMenu && <RightHalfMenu
                    items={[{
                        leftText: "hhhh",
                        showIcon: false
                    }]}
                    top={rightMenuTop}
                    style={{
                        zIndex: 10000,
                    }}
                />*/}
            </View>
        )
    }
}

export default AbroadExpertPage;
