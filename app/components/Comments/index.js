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
import Comment from '../Comment';

import sty from './style';


@autobind
class Comments extends Component {
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
    static propTypes = {
        style: PropTypes.object,
        items: PropTypes.array,
        noScroll: PropTypes.bool
    }
    render() {
        const {style, items, noScroll, ...rest} = this.props

        return (
            <ListView
                renderScrollComponent={noScroll?(p) => <View {...p}/>:ListView.defaultProps.renderScrollComponent}
                contentContainerStyle={[sty.main, style]}
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                    }).cloneWithRows(items)
                }
                {...rest}
            />
        )
    }
    _renderSeparator(a, i) {
        const {length} = this.props.items
        // if (i!=length-1)
            return <View style={{
                height: 10,
            }}></View>
    }
    _renderRow(data, s, i) {
        return <Comment key={i} {...data} />
    }
}

export default Comments;
