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
// react-native-modal-picker
import ModalPicker3rd from '../react-native-modal-picker';


@autobind
class ModalPicker extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {
        this.open();
    }
    close() {
        this.picker.close();
    }
    open() {
        this.picker.open();
    }
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {
    }
    componentWillUnmount() {}
    static defaultProps = {
        items: []
    }
    state = {}
    static propTypes = {
        items: PropTypes.array
    }
    render() {
        const {items, ...rest} = this.props;
        return (
            <ModalPicker3rd
                selectStyle={{padding: 0}}
                ref={r => this.picker = r}
                data={items}
                cancelText="取消"
                {...rest}
            />
        )
    }
}

export default ModalPicker;
