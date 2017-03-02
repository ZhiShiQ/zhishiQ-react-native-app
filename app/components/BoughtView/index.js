import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ListView,
    Image,
    ScrollView,
} from 'react-native';

import Button from 'react-native-button';
import sty from './style';
import Hr from  '../Hr';

@autobind
class BoughtView extends Component {
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

    static defaultProps = {
        title: 'TITLE',
        state: "STATE",
        content: "CONTENT...CONTENT...CONTENT...CONTENT",
        prompt: "prompt",
        price: 12345,
        disCount: 233,
        btnTitle: 'BUTTON'
    }
    state = {}
    static propTypes = {
        onPress: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        state: React.PropTypes.string,
        prompt: React.PropTypes.string,
        content: React.PropTypes.string,
        price: React.PropTypes.number,
        disCount: React.PropTypes.number,
        btnText: React.PropTypes.string,
        onBtnPress: React.PropTypes.func,
        style: React.PropTypes.object,
        btnDisabled: React.PropTypes.bool
    }

    render() {
        const {onPress, style, btnTitle, onBtnPress, btnDisabled, title, thumbnail, prompt, state, content, price, disCount} = this.props
        const Touchable = btnDisabled ? TouchableWithoutFeedback : TouchableHighlight;
        return (
            <TouchableOpacity onPress={onPress} style={[sty.main, style]}>
                <View style={sty.mainContainer}>
                    <View style={sty.mainTitleContainer}>
                        <Text style={sty.titleText}>{title}</Text>
                        <Text style={sty.stateText}>{state}</Text>
                    </View>
                    <View style={sty.mainInnerContainer}>
                        <View style={sty.imageContainer}><Image style={sty.image} source={thumbnail} /></View>
                        <View style={sty.contentContainer}>
                            <Text style={sty.contentText}>{content}</Text>
                        </View>
                    </View>
                    <Hr/>
                    <View style={sty.footContainer}>
                        <View style={sty.footerLeft}>
                            <Text style={sty.promptText}>{prompt}</Text>
                        </View>
                        <View style={sty.footerRight}>
                            <Text style={sty.countText}>已优惠¥{disCount}</Text>
                        </View>
                        <View style={sty.footerRight}>
                            <Text style={sty.priceText}>¥{price}</Text>
                        </View>
                    </View>
                    <Hr/>
                    <View style={sty.bottomContainer}>
                    <Touchable
                        diabled={btnDisabled}
                        onPress={btnDisabled?null:onPress} >
                        <View>
                            <Text style={sty.btnText}>{btnTitle}</Text>
                        </View>
                    </Touchable>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default BoughtView;
