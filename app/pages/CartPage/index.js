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

    itemsWithFunc() {
        const {store: {cart: {items}}, actions} = this.props;
        return items.reduce((a, x, index) => {
            a.items.push({
                ...x,
                onRemove: () => actions.delCartItemByIndex(index),
                onControlPress: () => actions.setCartItemSelectedByIndex(index, !x.selected),
                onBtnPress: () => actions.discountModalOpen()
            });
            if (x.selected) {
                a.saveSum += x.save || 0;
                a.sum += x.price || 0;
                a.selectedNum += 1;
            }
            return a;
        }, {items: [], saveSum: 0, sum: 0, selectedNum: 0});
    }

    render() {
        const {store: {cart: {items}}, actions} = this.props;
        const {items: computedItems, saveSum, sum, selectedNum} = this.itemsWithFunc();

        return (
            <View style={style.main}>
                <Carts disableSwipe={false} items={computedItems} />
                <View style={style.bottomBar}>
                    <View style={style.ctl}>
                        <Radio
                            onPress={() => actions.setAllCartItemSelected( !(selectedNum===items.length) )}
                            selected={selectedNum===items.length}>
                        </Radio>
                        <Text style={style.ctlText}>全选</Text>
                    </View>
                    <View style={style.info}>
                        <Text style={style.sum}>总计：{sum}</Text>
                        <Text style={style.save}>已节省：{saveSum}</Text>
                    </View>
                    <TouchableHighlight
                        style={[style.done, selectedNum>0&&{backgroundColor: '#fc6d34'}]}
                        onPress={selectedNum > 0 ? () => {
                            actions.simplePayModalOpen();
                        }: null}
                    >
                        <View>
                            <Text style={[style.doneText, selectedNum>0&&{color: '#fff'}]}>结算({selectedNum})</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default CartPage;
