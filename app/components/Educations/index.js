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

import Education from '../Education';
import Hr from '../Hr';

@autobind
class Collections extends Component {
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

    static defaultProps = {
        noScroll: false
    }
    state = {}
    static propTypes = {
        ...ListView.propTypes,
        items: PropTypes.array,
        style: PropTypes.object,
        noScroll: PropTypes.bool
    }

    render() {
        const {items, style, noScroll, ...rest} = this.props

        // if (noScroll) {
        //     return (
        //         <View style={[style]}>
        //             {items.map((data, i) => {
        //                 return (
        //                     <View>
        //                         {i>0 && this._renderSeparator(data, i)}
        //                         {this._renderRow(data, null, i)}
        //                     </View>
        //                 )
        //             })}
        //         </View>
        //     )
        // } else {
            return (
                <ListView
                    renderScrollComponent={noScroll?(p) => <View {...p}></View>:ListView.defaultProps.renderScrollComponent}
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
        // }
    }

    _renderSeparator(n, i) {
        const {items} = this.props;
        if (i != items.length-1) {
            return (
                <Hr marginTop={0}
                    marginBottom={0}
                    color={'#e5e5e5'}
                />
            )
        }
    }

    _renderRow(data, s, i) {
        return <Education key={i} {...data} />
    }
}

export default Collections;
