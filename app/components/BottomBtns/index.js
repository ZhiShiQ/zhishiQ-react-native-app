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
        mainText: "main"
    }
    state = {}
    static propTypes = {
        lefts: PropTypes.array,
        mainText: PropTypes.string,
        onMainPress: PropTypes.func
    }
    render() {
        const {lefts, onMainPress, mainText} = this.props

        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                }}
            >
                {
                    lefts.map(({text, onPress}, i) => <TouchableOpacity style={{
                        flex: 1, alignItems: 'center',
                        paddingVertical: 15, backgroundColor: "#fff"
                    }}>
                        <View><Text>{text}</Text></View>
                    </TouchableOpacity>)
                }


                <TouchableOpacity
                    style={{
                        flex: 2, alignItems: 'center',
                        paddingVertical: 15, backgroundColor: "#ea5502",
                    }}
                    onPress={onMainPress}
                >
                    <View><Text style={{color: '#fff'}}>{mainText}</Text></View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default BottomBtns;
