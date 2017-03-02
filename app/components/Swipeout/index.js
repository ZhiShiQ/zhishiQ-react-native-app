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
import SwipeOut3rd from 'react-native-swipeable';
import {SWIPE_BLOCK_WIDTH} from '../../constant';

import sty from './style';


@autobind
class Swipeout extends Component {
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
        children: <View><Text>SwipeOut</Text></View>
    }
    state = {}
    static propTypes = {
        onRemove: PropTypes.func,
        swipeBlockStyle: PropTypes.object
    }
    render() {
        const {children, onRemove, swipeBlockStyle, ...rest} = this.props
        return (
            <SwipeOut3rd
                leftButtonWidth={SWIPE_BLOCK_WIDTH}
                rightButtonWidth={SWIPE_BLOCK_WIDTH}
                rightButtons={[
                    <TouchableOpacity
                        style={[sty.btn, sty.delBtn, swipeBlockStyle]}
                        onPress={onRemove}
                    >
                        <Text>删除</Text>
                    </TouchableOpacity>
                ]}
                {...rest}
            >
                {children}
            </SwipeOut3rd>
        )
    }
}

export default Swipeout;
