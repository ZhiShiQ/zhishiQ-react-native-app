import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import sty from './style';


@autobind
class TagsWithHead extends Component {
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
        tags: []
    }
    state = {}
    static propTypes = {
        title: React.PropTypes.string,
        tags: React.PropTypes.array.isRequired
    }
    render() {
        const {title, tags} = this.props

        return (
            <View style={sty.main}>
                <View style={sty.titleContainer}>
                    <Text style={sty.titleText}>{title}</Text>
                </View>
                <View style={sty.tagsContainer}>
                    <Text style={sty.tagText}>{tags.join('｜')}</Text>
                </View>
            </View>
        )
    }

    _renderTag(tag, index, tags) {
        return (
            <Text>{}</Text>
        )
    }
}

export default TagsWithHead;
