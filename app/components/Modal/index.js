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
import EvilIcons from 'react-native-vector-icons/EvilIcons'

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
        hiddenClose: false
    }
    static propTypes = {
        isOpen: PropTypes.bool,
        buttons: PropTypes.array,
        style: PropTypes.object,
        height: PropTypes.number,
        hiddenClose: PropTypes.bool,
        closeStyle: PropTypes.object
    }
    open() {
        return this.modal.open();
    }
    close() {
        return this.modal.close();
    }
    render() {
        const {isOpen, children, hiddenClose, buttons, height, style, closeStyle, ...rest} = this.props;
        return (
            <ModalBox
                backdropPressToClose={true}
                ref={r => this.modal = r}
                isOpen={isOpen}
                position={'bottom'}
                style={[sty.main, style, height ? {height} : {}]}
                {...rest}
            >
                <View style={{alignSelf: 'stretch', flex: 1}}>
                {children}
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    {buttons.map((p, i) =>
                        <BlockButton key={i} {...p} />
                    )}
                </View>
                    {!hiddenClose && <TouchableOpacity
                        onPress={() => {
                            this.close();
                        }}
                        style={{position: 'absolute', top: 6, right: 6, zIndex: 3, backgroundColor: 'transparent'}}
                    >
                        <EvilIcons size={30} name="close" color="#4a4a4a"/>
                    </TouchableOpacity>}
                </View>
            </ModalBox>
        )
    }
    resizeModal(ev) {
        this.setState({height: +ev.nativeEvent.layout.height + 10, first: true});
    }
}

export default Modal;
