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
                {this.subMenu}
                <ListView
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
            </View>
        )
    }
}

export default ForeignTeacherPage;
