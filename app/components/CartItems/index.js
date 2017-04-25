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
    static defaultProps = {
        disableSwipe: false
    }
    state = {}
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        disableSwipe: React.PropTypes.bool
    }
    render() {
        const {items, disableSwipe, ...rest} = this.props

        return (
            <ListView
                renderRow={(data, sectionId, rowId) => <CartItem disableSwipe={disableSwipe} key={data.title} {...data}/>}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                    }).cloneWithRows(items)
                }
                {...rest}
            />
        )
    }
}

export default CartItems;
