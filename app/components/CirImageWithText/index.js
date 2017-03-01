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
import CirImage from '../../components/CirImage';

@autobind
class CirImageWithText extends Component {
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
        ...CirImage.propTypes,
        imageStyle: React.PropTypes.object,
        text: React.PropTypes.oneOfType(React.PropTypes.array, React.PropTypes.string)
    }
    render() {
        const {style, imageStyle, text, size, source} = this.props

        return (
            <View style={[sty.main, style]}>
                <CirImage style={imageStyle} size={size} source={source} />
                {this._renderText()}
            </View>
        )
    }
    _renderText() {
        const {text} = this.props;
        let TextView;
        if (typeof text === 'string') {
            TextView = <Text style={sty.text}>{text}</Text>
        } else {
            TextView = <View style={sty.textContainer}>
                {text.map((x, i) => <Text key={i} style={sty.text}>{x}</Text>)}
            </View>
        }
        return TextView;
    }
}

export default CirImageWithText;
