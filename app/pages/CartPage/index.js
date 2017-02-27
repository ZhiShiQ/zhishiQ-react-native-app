import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button
} from 'react-native';

import style from './style';
import Carts from '../../components/CartItems'
import Radio from '../../components/Radio'


@autobind
class CartPage extends Component {
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

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {store: {cart: {sum, save, items}}} = this.props
        const selectedNum = items.filter(x => x.selected).length

        return (
            <View style={style.main}>
                <Carts items={items} />
                <View style={style.bottomBar}>
                    <View style={style.ctl}>
                        <Radio selected={selectedNum===items.length}>
                        </Radio>
                        <Text style={style.ctlText}>全选</Text>
                    </View>
                    <View style={style.info}>
                        <Text style={style.sum}>总计：{sum}</Text>
                        <Text style={style.save}>已节省：{save}</Text>
                    </View>
                    <TouchableHighlight style={style.done}>
                        <Text style={style.doneText}>结算({selectedNum})</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default CartPage;
