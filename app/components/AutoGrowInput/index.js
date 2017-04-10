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
    ScrollView,
    TextInput,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class AutoGrowInput extends Component {
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
    state = {
        text: '',
    }
    static propTypes = {
        maxHeight: PropTypes.number,
        ...TextInput.propTypes
    }
    render() {
        const {onChangeText, style, maxHeight, ...rest} = this.props

        const {height, width, text} = this.state;
        const numOfLine = text.split('\n').length;
        // alert(numOfLine+','+height);
        const isSetHeight = height>0 || numOfLine>1;
        return (
            <TextInput
                style={[style, isSetHeight&&{height}, maxHeight && {maxHeight}]}
                autoCorrect={false}
                multiline={true}
                autoCapitalize={'none'}
                onChangeText={(text) => {
                    onChangeText && onChangeText(text);
                    this.setState({text})
                }}
                onChange={({nativeEvent: {contentSize}}) => {
                    const size = {...contentSize};
                    size.height = size.height - 8;
                    this.setState({...size});
                }}
                {...rest}
            />
        )
    }
}

export default AutoGrowInput;
