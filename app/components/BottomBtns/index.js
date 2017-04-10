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

import sty from './style';


@autobind
class BottomBtns extends Component {
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
    static defaultProps = {
        lefts: [
            {text: '收藏', onPress: null},
            {text: '客服', onPress: null}
        ],
        mainButtonStyle:{}
    }
    state = {}
    static propTypes = {
        lefts: PropTypes.array,
        mainText: PropTypes.string,
        subText: PropTypes.string,
        onMainPress: PropTypes.func,
        onSubPress: PropTypes.func,
        mainButtonStyle: PropTypes.object,
    }
    render() {
        const {lefts, onMainPress, onSubPress, mainText, subText, mainButtonStyle} = this.props

        return (
            <View
                style={{
                    flexDirection: 'row',
                    // position: 'absolute',
                    // bottom: 0,
                    height: 49,
                    justifyContent: 'center',
                }}
            >
                {
                    lefts.map(({text, onPress}, i) => <TouchableOpacity style={{
                        flex: 0, alignItems: 'center', width: 70,
                        // paddingVertical: 16.5,
                        justifyContent: 'center',
                        backgroundColor: "#fff"
                    }} onPress={onPress} key={i}
                    >
                        <View>
                            <View></View>
                            <Text style={{fontSize: 11, color: '#4a4a4a'}}>{text}</Text>
                        </View>
                    </TouchableOpacity>)
                }


                {!!subText && <TouchableOpacity
                    style={{
                        flex: 2, alignItems: 'center',
                        // paddingVertical: 15,
                        justifyContent: 'center',
                        backgroundColor: "#ffb12e",
                    }}
                    onPress={onSubPress}
                >
                    <View><Text style={{color: '#fff', fontSize: 16}}>{subText}</Text></View>
                </TouchableOpacity>}

                {!!mainText && <TouchableOpacity
                    style={{
                        flex: 2, alignItems: 'center',
                        // paddingVertical: 15,
                        justifyContent: 'center',
                        backgroundColor: "#ea5502",
                        ...mainButtonStyle
                    }}
                    onPress={onMainPress}
                >
                    <View><Text style={{color: '#fff', fontSize: 16}}>{mainText}</Text></View>
                </TouchableOpacity>}
            </View>
        )
    }
}

export default BottomBtns;
