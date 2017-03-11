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
import Hr from '../../components/Hr';
import HomeItem from '../../components/HomeItem';


@autobind
class ForeignTeacherPage extends Component {
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
        return !Map(this.props).equals(Map(newProps))
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
                foreign_teacher: {
                    list
                }
            }, actions
        } = this.props

        return (
            <View style={{flex: 1}}>
                <ListView
                    contentContainerStyle={{marginTop: 33, backgroundColor: '#fff', paddingHorizontal: 15}}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(list)
                    }
                    renderRow={this._renderRow}
                    renderSeparator={(s, i) => this._renderSeparator(i ,list)}
                />
                {this.subMenu}
            </View>
        )
    }

    _renderSeparator(i, a) {
        if (i != a.length - 1)
            return <Hr marginBottom={0} color="#e5e5e5"/>
    }

    _renderRow2(data, s, i) {
        const {actions} = this.props;
        return <ForeignTeacherItem
            onPress={() => {
                const newData = {...data, avatar: data.thumbnail, name: data.title};
                delete newData.thumbnail;
                delete newData.title;
                actions.setForeignTeacherDetailBase(newData);
                Actions.foreignTeacherDetail();
            }} {...data} key={i}/>
    }

    _renderRow(data, s, i) {
        const {actions} = this.props;
        data.bottomValues = [data.rate, data.appointNum]

        return <HomeItem
            onPress={() => {
                const newData = {...data, avatar: data.thumbnail, name: data.title};
                delete newData.thumbnail;
                delete newData.title;
                actions.setForeignTeacherDetailBase(newData);
                Actions.foreignTeacherDetail();
            }} {...data} key={i}/>
    }


    get computeFilterPro() {
        const {
            store: {
                foreign_teacher: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;


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
            store: {
                foreign_teacher: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        return filterZone;
    }

    get subMenu() {
        const {
            store: {
                foreign_teacher: {
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
                    getModalStyle={(layout) => ({
                        left: -layout.width,
                        right: 0,
                        height: deviceHeight - (layout.y + layout.height)
                    })}
                    title={"专业"}
                    items={this.computeFilterPro}
                />
            </View>
        )
    }
}

export default ForeignTeacherPage;
