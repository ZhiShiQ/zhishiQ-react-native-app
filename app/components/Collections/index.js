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

import sty from './style';

import Collection from '../Collection';
import Swipeout from '../Swipeout';

@autobind
class Collections extends Component {
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
        disableSwipe: false
    }
    state = {}
    static propTypes = {
        ...ListView.propTypes,
        items: PropTypes.array,
        style: PropTypes.object,
        disableSwipe: PropTypes.bool
    }
    render() {
        const {items, style, ...rest} = this.props

        return (
            <ListView
                contentContainerStyle={[style]}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (a, b) => !Map(a).equals(b)
                    }).cloneWithRows(items)
                }
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
                {...rest}
            />
        )
    }
    _renderSeparator() {
        return (
            <View style={{height: 10}}></View>
        )
    }
    _renderRow(data, s, i) {
        const {disableSwipe} = this.props;
        if (!disableSwipe) {
            return <Swipeout key={i} onRemove={data.onRemove} >
                <Collection {...data} />
            </Swipeout>
        } else {
            return <Collection key={i} {...data} />
        }
    }
}

export default Collections;
