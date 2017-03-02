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
import TextWithBg from  '../TextWithBg';

@autobind
class Collection extends Component {
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
        prompt: "prompt",
        price: 12345,
        count: 233,
        btnTitle: 'BUTTON',
        tags: [],
        content: ''
    }
    state = {}
    static propTypes = {
        onPress: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        numerator: React.PropTypes.number,
        deNumerator: React.PropTypes.number,
        serviceTimes: React.PropTypes.number,
        style: React.PropTypes.object,
        tags: React.PropTypes.array,
        content: React.PropTypes.string
    }

    render() {
        const {
            onPress, style, title, thumbnail, serviceTimes,
            numerator, deNumerator, tags, content
        } = this.props;
        const Touchable = TouchableHighlight;
        return (
            <TouchableOpacity onPress={onPress} style={[sty.main, style]}>
                <View style={sty.mainContainer}>
                    <View style={sty.mainInnerContainer}>
                        <View style={sty.imageContainer}><Image style={sty.image} source={thumbnail} /></View>
                        <View style={sty.contentContainer}>
                            <Text style={sty.titleText}>{title}</Text>
                            <View style={sty.tags} >
                                {!!content && <Text>{content}</Text>}
                                {tags.map((tag, i) => <TextWithBg k onPress={tag.onPress} title={typeof tag === 'string' ? tag : tag.title} key={i} />)}
                            </View>
                        </View>
                    </View>
                    <Hr/>
                    <View style={sty.footContainer}>
                        <View style={sty.footerRight}>
                            <Text style={sty.countText}>平均分数：{numerator}/{deNumerator}</Text>
                        </View>
                        <View style={sty.footerRight}>
                            <Text style={sty.priceText}>服务次数：{serviceTimes}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Collection;
