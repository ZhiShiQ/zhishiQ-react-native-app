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
import TextWithBgs from  '../TextWithBgs';

@autobind
class ServiceItem extends Component {
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
        tags: [],
        points: []
    }
    state = {}
    static propTypes = {
        onPress: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        style: React.PropTypes.object,
        tags: React.PropTypes.array,
        points: React.PropTypes.oneOfType(React.PropTypes.array, React.PropTypes.string),
        intro: React.PropTypes.string,
        price: React.PropTypes.number,
        mark: React.PropTypes.number,
        appointNum: React.PropTypes.number,
        // content: React.PropTypes.string
    }

    render() {
        let {
            onPress, style, title, thumbnail, price,
            tags, points, intro, mark, appointNum
        } = this.props;
        points = Array.isArray(points) ? points.join("｜") : points;
        const Touchable = TouchableHighlight;
        return (
            <TouchableOpacity onPress={onPress} style={[sty.main, style]}>
                <View style={sty.mainContainer}>
                    <View style={sty.mainInnerContainer}>
                        <View style={sty.imageContainer}>
                            <Image style={sty.image} source={thumbnail} />
                        </View>
                        <View style={sty.contentContainer}>
                            <Text style={sty.titleText}>{title}</Text>
                            <View style={sty.tags} >
                                <TextWithBgs
                                    items={tags}
                                    eachStyle={{borderRadius: 2, fontSize: 12, paddingVertical: 0}}
                                    bgColor="#FFF"
                                    borderColor="#979797"
                                />
                            </View>
                            {/*<Hr />*/}
                            <Text style={{color: '#4a4a4a', marginBottom: 4, lineHeight: 17 }}>{points}</Text>
                            <Text style={{color: '#848484', marginBottom: 4}}>{intro}</Text>

                            <View style={sty.footContainer}>
                                <View style={sty.footerLeft}>
                                    <Text style={[sty.countText]}>
                                        <Text style={{color: '#848484'}}>评分 </Text>
                                        {mark}
                                    </Text>
                                    <Text style={sty.countText}>
                                        <Text style={{color: '#848484'}}>预约 </Text>
                                        {appointNum}
                                    </Text>
                                </View>
                                <View style={sty.footerRight}>
                                    <Text style={sty.priceText}>
                                        <Text style={sty.price}>{'¥'+price}</Text>
                                        <Text> /次</Text>
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    {/*<Hr/>*/}

                </View>
            </TouchableOpacity>
        )
    }
}

export default ServiceItem;
