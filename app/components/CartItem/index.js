import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    ListView,
    Image,
    ScrollView,
    Button
} from 'react-native';

import style from './style';

import Radio from '../Radio';

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
    static defaultProps = {}
    state = {}
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        content: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        prompt: React.PropTypes.string,
        onControlPress: React.PropTypes.func
    }
    render() {
        const {title, price, content, thumbnail, prompt, onControlPress} = this.props;

        return (
            <View style={style.main}>
                <View style={style.leftContainer}>
                    <Radio onPress={onControlPress} />
                </View>
                <View style={style.mainContainer}>
                    <View style={style.mainTitleContainer}><Text style={style.titleText}>{title}</Text></View>
                    <View style={style.mainInnerContainer}>
                        <View style={style.imageContainer}><Image style={style.image} {...thumbnail} /></View>
                        <View style={style.contentContainer}>
                            <Text style={style.contentText}>{content}</Text>
                        </View>
                    </View>
                    <View style={style.horizontal}/>
                    <View style={style.footContainer}>
                        <View style={style.footerLeft}><Text style={style.promptText}>{prompt}</Text></View>
                        <View style={style.footerRight}><Text style={style.priceText}>¥{price}</Text></View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CartItem;
