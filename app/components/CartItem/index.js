import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    StyleSheet,
    Image,
    ScrollView,
    Button
} from 'react-native';

import style from './style';

import Radio from '../Radio';
import Hr from '../Hr';
import Swipeout from '../Swipeout';

@autobind
class CartItem extends Component {
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
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        content: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        prompt: React.PropTypes.string,
        save: React.PropTypes.number,
        onControlPress: React.PropTypes.func,
        onBtnPress: React.PropTypes.func,
        onRemove: React.PropTypes.func,
        disableSwipe: React.PropTypes.bool,
        selected: React.PropTypes.bool,
    }
    renderChildren() {
        const {title, price, save, disableSwipe, selected, onBtnPress, onRemove, content, thumbnail, prompt, onControlPress} = this.props;
        return (
            <View style={style.main}>
                <View style={style.leftContainer}>
                    <Radio selected={selected} onPress={onControlPress} />
                </View>
                <View style={style.mainContainer}>
                    <View style={style.mainTitleContainer}><Text style={style.titleText}>{title}</Text></View>
                    <View style={style.mainInnerContainer}>
                        <View style={style.imageContainer}><Image style={style.image} source={thumbnail} /></View>
                        <View style={style.contentContainer}>
                            <Text style={style.contentText}>{content}</Text>
                        </View>
                    </View>
                    <Hr/>
                    <View style={style.footContainer}>
                        {save && <View style={style.footerLeft}>
                            <Text style={style.promptText}>{'已优惠'+save+'元'}</Text>
                        </View>}
                        <TouchableWithoutFeedback onPress={onBtnPress}>
                            <View style={style.footerLeft}>
                                <Text style={style.promptText}>
                                    {save && '更改'}
                                    {!save && prompt}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={style.footerRight}><Text style={style.priceText}>¥{price}</Text></View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const {title, price, save, disableSwipe, onBtnPress, onRemove, content, thumbnail, prompt, onControlPress} = this.props;
        if (!disableSwipe) {
            return (
                <Swipeout onRemove={onRemove} swipeBlockStyle={{marginTop: StyleSheet.flatten(style.main).marginTop}}>
                    {this.renderChildren()}
                </Swipeout>
            )
        } else {
            return (
                <View>
                    {this.renderChildren()}
                </View>
            )
        }
    }
}

export default CartItem;
