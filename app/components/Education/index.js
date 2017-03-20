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
class Education extends Component {
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
        style: React.PropTypes.object,
        status: React.PropTypes.string,
        date_from: React.PropTypes.string,
        date_to: React.PropTypes.string
    }

    render() {
        const {
            onPress, style, title, thumbnail,
            status, date_from, date_to
        } = this.props;
        const Touchable = onPress ? TouchableHighlight : View;
        return (
            <Touchable
                onPress={onPress}
                style={[sty.main, sty.mainContainer, style]}
            >
                <View style={sty.mainInnerContainer}>
                    <View style={[sty.contentContainer, {flex: 1}]}>
                        <Text style={sty.titleText}>{title}</Text>
                        <Text style={sty.secText}>{status}</Text>
                        <Text style={sty.thrText}>{date_from+" ~ "+date_to}</Text>
                    </View>
                    <View style={sty.imageContainer}><Image style={sty.image} source={thumbnail} /></View>
                </View>
            </Touchable>
        )
    }
}

export default Education;
