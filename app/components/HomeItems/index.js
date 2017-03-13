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
import HomeItem from '../HomeItem';
import Swipeout from '../Swipeout';
import Hr from '../Hr';

@autobind
class HomeItems extends Component {
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
        noScroll: PropTypes.bool,
        swipout: PropTypes.bool,
        bottomSep: PropTypes.bool
    }
    render() {
        const {style, swipout, items, noScroll, ...rest} = this.props

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
        const {bottomSep} = this.props;
        if (i != this.props.items.length-1 || bottomSep)
            return <Hr color="#e5e5e5" marginBottom={0}></Hr>
    }
    _renderRow({onRemove, key, ...data}, s, i) {
        const {swipout} = this.props;
        if (!swipout)
            return <HomeItem key={key || i} {...data} />
        else {
            return (
                <Swipeout onRemove={onRemove} key={key || i} >
                    <HomeItem {...data} />
                </Swipeout>
            )
        }
    }
}

export default HomeItems;
