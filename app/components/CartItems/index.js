import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import style from './style';
import CartItem from '../CartItem'


@autobind
class CartItems extends Component {
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
        items: React.PropTypes.array.isRequired
    }
    render() {
        const {items} = this.props

        return (
            <ListView
                renderRow={(data, sectionId, rowId) => <CartItem {...data}/>}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                    }).cloneWithRows(items)
                }
            />
        )
    }
}

export default CartItems;
