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
    ListView,
    Image,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class Experience extends Component {
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
        title: PropTypes.string,
        origination: PropTypes.string,
        date_from: PropTypes.string,
        date_to: PropTypes.string,
        words: PropTypes.oneOfType(PropTypes.array, PropTypes.string),
        thumbnail: PropTypes.object,
        style: PropTypes.object,
        noPoint: PropTypes.bool
    }
    render() {
        let {title, origination, noPoint, thumbnail, date_from, date_to, style, words = []} = this.props;
        if (!Array.isArray(words)) {
            words = [words];
            noPoint = true;
        }


        return (
            <View style={[{paddingVertical: 15, justifyContent: 'flex-start'}, style]}>
                {thumbnail && <Image source={thumbnail} style={{width: 40, height: 40, borderRadius: 5, backgroundColor: '#ccc'}}/>}
                <Text style={{
                    marginVertical: 3,
                    fontSize: 14,
                    lineHeight: 18,
                    fontWeight: 'bold',
                    color: '#4a4a4a'
                }}>{title}</Text>
                <Text style={{color: '#4a4a4a', marginBottom: 8}}>
                    {origination ? origination+'｜': ''}
                    {date_from}{date_to ? (' ~ '+date_to) : ''}
                </Text>
                {words.map((w, i, a) =>
                    <Text style={{color: '#848484', lineHeight: 17, fontSize: 14}} key={i}>
                        {noPoint?'':'• '}{w}
                    </Text>
                )}
            </View>
        )
    }
}

export default Experience;
