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
    Image,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';
import * as RES from '../../helpers/resource';


@autobind
class WeeklyDayPage extends Component {
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
        let {store: {weekly_day: {items}}, actions} = this.props;
        items = items.map((x) => ({items: x}))

        return (
            <ListView
                contentContainerStyle={{padding: 15}}
                renderHeader={() =>
                    <View style={{marginBottom: 10}}>
                        {this._renderRow({
                            items: [
                                <View style={{
                                    flex: 1,
                                    marginRight: 5,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}>
                                    <Text style={{fontWeight: '600', fontSize: 14, color: '#4a4a4a', marginBottom: 4}}>上午</Text>
                                    <Text style={{fontSize: 11, color: '#848484'}}>6:00~12:00</Text>
                                </View>,
                                <View style={{
                                    flex: 1,
                                    marginRight: 5,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}>
                                    <Text style={{fontWeight: '600', fontSize: 14, color: '#4a4a4a', marginBottom: 4}}>下午</Text>
                                    <Text style={{fontSize: 11, color: '#848484'}}>12:00~18:00</Text>
                                </View>,
                                <View style={{
                                    flex: 1,
                                    marginRight: 5,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}>
                                    <Text style={{fontWeight: '600', fontSize: 14, color: '#4a4a4a', marginBottom: 4}}>晚上</Text>
                                    <Text style={{fontSize: 11, color: '#848484'}}>18:00~24:00</Text>
                                </View>,
                                <View style={{
                                    flex: 1,
                                    marginRight: 0,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}>
                                    <Text style={{fontWeight: '600', fontSize: 14, color: '#4a4a4a', marginBottom: 4}}>凌晨</Text>
                                    <Text style={{fontSize: 11, color: '#848484'}}>0:00~6:00</Text>
                                </View>
                            ],
                        })}
                    </View>
                }
                renderRow={(d, s, i) => this._renderRow(d, i)}
                renderSeparator={(d, i) => this._renderSeparator(d, i)}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(items)}

            />
        )
    }

    _renderSeparator(d, i) {
        return (
            <View style={{height: 10}}></View>
        )
    }

    _renderRow({items, text}, i) {
        const {actions} = this.props;
        const keyTexts = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[{
                    width: 30,
                    marginRight: 10,
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#4a4a4a'
                }, i >= 5 && {color: '#ea5502'}]}>{text || keyTexts[i]}</Text>
                {items.map((b, j) => (
                    !React.isValidElement(b) ?
                        <TouchableOpacity
                            key={j}
                            onPress={() => {
                                actions.setWeeklyDayCell(i, j, !b)
                            }}
                            style={[
                                {
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    borderRadius: 4,
                                    borderColor: b ? '#ea5502' : '#e5e5e5',
                                    borderWidth: 1.25
                                },
                                j != items.length - 1 && {marginRight: 5},
                                {paddingVertical: 13, backgroundColor: b ? '#fc6d34' : '#f3f3f3'},
                            ]}
                        >
                            <Image
                                resizeMode={"cover"}
                                source={{uri: b?RES.FACE_SMILE:RES.FACE_NORMAL}}
                                style={{height: 31, width: 31}}
                            />
                        </TouchableOpacity>
                        : React.cloneElement(b, {key: i})
                ))}
            </View>
        )
    }
}

export default WeeklyDayPage;
