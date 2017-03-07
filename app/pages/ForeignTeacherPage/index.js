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
import {Actions, ActionConst} from 'react-native-router-flux';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {PADDING_SIZE} from '../../constant';
import sty from './style';

import Collections from '../../components/Collections';
import DropDown from '../../components/DropDown';
import CustomDropDown from '../../components/CustomDropDown';
import CirImage from '../../components/CirImage';
import ForeignTeacherItem from '../../components/ForeignTeacherItem';


@autobind
class ForeignTeacherPage extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {}
    state = {}
    static propTypes = {}
    render() {
        const {...props} = this.props

        return (
            <View style={{flex: 1}}>
                <ListView
                    contentContainerStyle={{marginTop: 33}}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows([{
                            title: "Ssssss",
                            tags: ["1", "b", "x"],
                            experience: "~ 2015/12 Texarkana Gazette | assistant city editor…",
                            clients: 994,
                            rate: 4.9,
                            reviews: 141,
                            onPress: () => Actions.foreignTeacherDetail(),
                            dollar: 25.08
                        }, {
                            title: "Ssssss",
                            tags: ["1", "b", "x"],
                            experience: "~ 2015/12 Texarkana Gazette | assistant city editor…",
                            education: "~ 2015/12 Texarkana Gazette | assistant city editor…",
                            clients: 994,
                            rate: 4.9,
                            reviews: 141,
                            onPress: () => Actions.foreignTeacherDetail(),
                            dollar: 25.08
                        }])
                    }
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                />
                {this.subMenu}
            </View>
        )
    }
    _renderSeparator() {
        return <View style={{height: 10}}></View>
    }

    _renderRow(data, s, i) {
        return <ForeignTeacherItem {...data} key={i} />
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
                rest.onPress = () => {}
            }
            return rest;
        });
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

                <CustomDropDown
                    showIcon={false}
                    getModalStyle={(layout) => ({right: -layout.width, left: 0})}
                    items={this.computeFilterZone}
                    dynamicTitle={false}
                    autoHidden
                    title="地区"/>

                <CustomDropDown
                    showIcon={false}
                    autoHidden
                    dynamicTitle={false}
                    ref={r => this.drop = r}
                    getModalStyle={(layout) => ({left: -layout.width, right: 0, height: deviceHeight-(layout.y+layout.height)})}
                    title={"专业"}
                    items={this.computeFilterPro}
                />
            </View>
        )
    }
}

export default ForeignTeacherPage;
