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
} from 'react-native';
import ModalBox from 'react-native-modalbox';

import Button from 'react-native-button';
import sty from './style';
import BlockButton from '../BlockButton'

@autobind
class Modal extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
        this.setState({height: this.props.height});
    }
    componentDidMount() {
    }
    componentWillReceiveProps(newProps) {
        this.setState({height: newProps.height});
    }
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {
        isOpen: false,
        buttons: [],
        showClose: false
    }
    static propTypes = {
        isOpen: PropTypes.bool,
        buttons: PropTypes.array,
        style: PropTypes.object,
        height: PropTypes.number,
        showClose: PropTypes.bool,
        closeStyle: PropTypes.object
    }
    open() {
        return this.modal.open();
    }
    close() {
        return this.modal.open();
    }
    render() {
        const {isOpen, children, showClose, buttons, height, style, closeStyle, ...rest} = this.props;
        const CloseBtn = <Button onPress={() => this.setState({isOpen: false})} style={[sty.btn, sty.btnModal, closeStyle]}>X</Button>;
        return (
            <ModalBox
                {...rest}
                ref={r => this.modal = r}
                isOpen={isOpen}
                position={'bottom'}
                style={[sty.main, style, height ? {height} : {}]}
            >
                <View style={{alignSelf: 'stretch', flex: 1}}>
                {children}
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    {buttons.map((p, i) =>
                        <BlockButton key={i} {...p} />
                    )}
                </View>
                {showClose ? CloseBtn : null}
                </View>
            </ModalBox>
        )
    }
    resizeModal(ev) {
        this.setState({height: +ev.nativeEvent.layout.height + 10, first: true});
    }
}

export default Modal;
