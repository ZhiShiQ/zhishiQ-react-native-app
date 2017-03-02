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
    Modal,
    Button
} from 'react-native';

import sty from './style';

import LinkItems from '../LinkItems';


@autobind
class RightHalfMenu extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
        if (this.props.visible!=null) {
            this.setState({visible: this.props.visible});
        }
    }
    componentDidMount() {}
    componentWillReceiveProps(newProps) {
        if (newProps.visible!=null) {
            this.setState({visible: newProps.visible});
        }
    }
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {}
    state = {
        visible: true
    }
    static propTypes = {
        onShow: PropTypes.func,
        visible: PropTypes.bool,
        items: PropTypes.array.isRequired,
        style: PropTypes.object,
        listStyle: PropTypes.object,
    }
    render1() {
        const {onShow, items, style, top, left, bottom, right, listStyle} = this.props;
        const {visible} = this.state;

        return (
            <Modal
                style={style}
                transparent={true}
                onShow={onShow}
                visible={visible}
                onRequestClose={()=>this.setState({visible: false})}
                animationType="fade"
            >
                <LinkItems
                    style={[listStyle, {top, bottom, left, right}]}
                    items={items}
                />
            </Modal>
        )
    }

    render() {
        const {onShow, items, style, top, left, bottom, right, listStyle} = this.props;

        return (
            <LinkItems
                style={[listStyle, {top, bottom, left, right, position: 'absolute'}]}
                items={items}
            />
        )
    }
}

export default RightHalfMenu;
