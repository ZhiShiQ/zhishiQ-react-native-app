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
import {PADDING_SIZE} from '../../constant'
import sty from './style';

import InputExtra from '../InputExtra';
import Hr from '../Hr';


@autobind
class InputExtras extends Component {
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
        items: PropTypes.array.isRequired,
        style: PropTypes.object,
    }
    render() {
        const {items, style, ...rest} = this.props

        return (
            <ListView
                contentContainerStyle={style}
                renderRow={this._renderRow}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                    }).cloneWithRows(items)
                }
                renderSeparator={
                    (data, i) => this._renderSeparator(data, i)
                }
                {...rest}
            />
        )
    }

    _renderSeparator(data, i) {
        const {length} = this.props.items
        return <Hr
            style={{
                marginHorizontal: PADDING_SIZE
            }}
            marginBottom={0} color={"#E5E5E5"}/>
    }

    _renderRow(data, s, index) {
        return (
            <InputExtra {...data} />
        )
    }
}

export default InputExtras;
