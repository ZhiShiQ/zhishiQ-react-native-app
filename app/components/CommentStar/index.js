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
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import {upIcon, downIcon, starIcon} from '../../helpers/resource';
import CollapsibleItem from '../CollapsibleItem';

import sty from './style';


@autobind
class CommentStar extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({collapsed: this.props.collapsed});
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        if (this.props.collapsed != newProps.collapsed) {
            this.setState({collapsed: newProps.collapsed});
        }
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        levels: [],
        rate: 0,
        commentNum: 100
    }
    state = {
        collapsed: true,
        mainStarLayout: {},
        subStarLayout: {},
        lineLayout: {}
    }
    static propTypes = {
        collapsed: PropTypes.bool,
        quality: PropTypes.number,
        manner: PropTypes.number,
        pro: PropTypes.number,
        speed: PropTypes.number,
        commentNum: PropTypes.number,
        rate: PropTypes.number,
        levels: PropTypes.array,
    }

    render() {
        const {levels, speed, pro, manner, quality, rate, commentNum} = this.props;
        const {collapsed, mainStarLayout} = this.state;
        const keys = [/*"服务质量", */"服务态度", "专业程度", "响应速度"];
        const vals = [/*Number(quality).toFixed(1), */Number(manner).toFixed(1), Number(pro).toFixed(1), Number(speed).toFixed(1)];
        return (
            <CollapsibleItem
                ref="collapsible"
                collapsed={true}
                control={
                    <View
                        style={[{
                            padding: 15, paddingRight: 0,
                            backgroundColor: '#fff', justifyContent: 'center',
                        }, !collapsed ? {borderBottomColor: '#e5e5e5', borderBottomWidth: StyleSheet.hairlineWidth} : {}]}
                    >
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#848484'}}>服务质量</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 14,
                                maxWidth: 200
                            }}
                                  onLayout={(e) => this.setState({mainStarLayout: e.nativeEvent.layout})}
                            >

                                {new Array(5).fill({}).map((x, i) => React.cloneElement(starIcon, {key: i}))}
                                {this._renderOverflow(rate, mainStarLayout.width, null, 17)}
                            </View>
                            <Text style={{
                                marginRight: 12,
                                fontSize: 16,
                                color: '#4a4a4a',
                                fontWeight: "bold"
                            }}>{rate}</Text>
                            <View style={{
                                textAlign: 'right',
                                alignItems: 'center',
                                flex: 1,
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                            }}>
                                <Text style={{color: '#848484', fontSize: 11.5, marginRight: 20}}>{commentNum}人评价</Text>
                            </View>
                        </View>
                    </View>
                }
            >
                <View style={{padding: 15, backgroundColor: "#fbfbfb"}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            {keys.map((name, i) => this._renderStar(name, vals[i], i))}
                        </View>
                        <View style={{flex: 1}}>
                            {levels.map((lev, i) => this._renderPercentage(lev, i))}
                        </View>
                    </View>
                </View>
            </CollapsibleItem>
        )
    }

    render2() {
        const {levels, speed, pro, manner, quality, rate, commentNum} = this.props;
        const {collapsed, mainStarLayout} = this.state;
        const keys = ["服务质量", "服务态度", "专业程度", "响应速度"];
        const vals = [quality, manner, pro, speed];

        return (
            <View>
                <TouchableOpacity
                    style={[{
                        padding: 15,
                        backgroundColor: '#fff', justifyContent: 'center',
                    }, !collapsed ? {borderBottomColor: '#e5e5e5', borderBottomWidth: StyleSheet.hairlineWidth} : {}]}
                    onPress={() => this.setState({collapsed: !collapsed})}
                >
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{color: '#848484'}}>服务质量</Text>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 14,
                            maxWidth: 200
                        }}
                              onLayout={(e) => this.setState({mainStarLayout: e.nativeEvent.layout})}
                        >

                            {new Array(5).fill({}).map((x, i) => React.cloneElement(starIcon, {key: i}))}
                            {this._renderOverflow(rate, mainStarLayout.width, null, 17)}
                        </View>
                        <Text
                            style={{marginRight: 12, fontSize: 16, color: '#4a4a4a', fontWeight: "bold"}}>{rate}</Text>
                        <View style={{
                            textAlign: 'right',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                        }}>
                            <Text style={{color: '#848484', fontSize: 11.5, marginRight: 20}}>{commentNum}人评价</Text>
                            {React.cloneElement(collapsed ? downIcon : upIcon, {})}
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsed} align={"center"}>
                    <View style={{padding: 15, backgroundColor: "#fbfbfb"}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                {keys.map((name, i) => this._renderStar(name, vals[i], i))}
                            </View>
                            <View style={{flex: 1}}>
                                {levels.map((lev, i) => this._renderPercentage(lev, i))}
                            </View>
                        </View>
                    </View>
                </Collapsible>
            </View>
        )
    }

    _computeVisibleWidth(totalWidth, starWidth, value, starNum) {
        const gap = this._computeGapWidth(totalWidth, starWidth, starNum);
        const int = (value >> 0);
        // starWidth * int + (int)*gap + starWidth*(value-int)
        return int * gap + starWidth * value;
    }

    _computeGapWidth(totalWidth, starWidth, starNum = 5) {
        return (totalWidth - 5 * starWidth) / (starNum - 1);
    }

    _renderOverflow(rate, width, bgColor, starWidth) {
        const w = this._computeVisibleWidth(width, starWidth, rate, 5);
        return <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: w,
            right: 0,
            backgroundColor: (bgColor || '#fff')
        }}></View>
    }

    _renderStar(name, val, i) {
        return (
            <View key={i} style={{alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <Text style={{fontSize: 12, color: '#848484'}}>{name}</Text>
                <View style={{
                    flex: 0,
                    width: 75,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 6
                }}
                      onLayout={i == 0 ? (e) => this.setState({subStarLayout: e.nativeEvent.layout}) : null}
                >
                    {val >= 0 && new Array(5).fill({}).map((x, i) => React.cloneElement(starIcon, {key: i, size: 12}))}
                    {this._renderOverflow(val, this.state.subStarLayout.width, "#fbfbfb", 11.5)}
                </View>
                {val >= 0 && <Text
                    style={{flex: -1, marginRight: 4, fontSize: 12, color: '#4a4a4a', fontWeight: "bold"}}>{val}</Text>}
            </View>
        )
    }

    _renderPercentage(p, i) {
        const {lineLayout: {width = 130}} = this.state;
        let w = width * (p / 100);
        w = w <= 25 ? w : w - 25;
        return (
            <View key={i} style={{alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <Text
                    style={{color: '#848484', width: 20, fontSize: 11.5, marginLeft: 4, marginRight: 6}}>{5 - i}星</Text>
                <View
                    style={{alignItems: 'center', flexDirection: 'row', flex: 1}}
                    /*onLayout={i==0?(e) => this.setState({lineLayout: e.nativeEvent.layout}):() => {}}*/
                >
                    <View style={[
                        {flex: 0, width: w, height: 7, borderRadius: 1, backgroundColor: '#ffc96f'},
                        /*this.state.lineLayout.width?{flex: 0, width: (this.state.lineLayout.width*(p/100)) - 10}:{}*/
                    ]}
                    >
                    </View>
                    <Text style={{color: '#4a4a4a', marginLeft: 8, fontSize: 12, marginRight: 3}}>{p}%</Text>
                </View>
            </View>
        )
    }
}

export default CommentStar;
