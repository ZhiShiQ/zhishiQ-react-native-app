import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import TextWithBgs from '../TextWithBgs';
import CirImage from '../CirImage';

import sty from './style';


@autobind
class Comment extends Component {
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
        tags: []
    }
    state = {}
    static propTypes = {
        thumbnail: PropTypes.object,
        tags: PropTypes.array,
        title: PropTypes.string,
        comment: PropTypes.string,
        time: PropTypes.string,
        containerStyle: PropTypes.object
    }

    render() {
        const {thumbnail, title, containerStyle, tags, comment, time} = this.props

        return (
            <View style={[sty.main, containerStyle]}>
                <View style={sty.hor}>
                    <CirImage style={sty.img} size={46} source={thumbnail}/>
                    <View>
                        <Text style={sty.name}>{title}</Text>
                        <TextWithBgs
                            style={{maxWidth: width-46-15-10, marginRight: 20, flex: 0}}
                            items={tags} bgColor={"#fff"}
                            eachStyle={{
                                marginTop: 4,
                                borderRadius: 3,
                                borderWidth: .8,
                                borderColor: '#ccc',
                                paddingVertical: 2,
                                paddingHorizontal: 4,
                                fontSize: 11.5
                            }}
                        />
                    </View>
                </View>
                <Text style={{fontSize: 14, lineHeight: 18, color: '#4A4A4A', marginBottom: 14}}>{comment}</Text>
                <Text style={{fontSize: 12, color: '#848484'}}>{time}</Text>
            </View>
        )
    }
}

export default Comment;
