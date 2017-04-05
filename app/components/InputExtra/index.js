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
class InputExtra extends Component {
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
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        label: "LABEL",
        inputProps: {},
        input: <TextInput></TextInput>,
        autoGrow: false,
    }
    state = {
        _value: '',
        height: 0,
        width: 0,
    }
    static propTypes = {
        label: PropTypes.string.isRequired,
        rText: PropTypes.string,
        onRight: PropTypes.func,
        inputProps: PropTypes.object,
        input: PropTypes.element,
        style: PropTypes.object,
        labelStyle: PropTypes.object,
        inputStyle: PropTypes.object,
        autoGrow: PropTypes.bool,
        maxHeight: PropTypes.number
    }

    get value() {
        return this.state._value;
    }

    render() {
        const {label, input, rText, onRight, style, autoGrow, maxHeight,
            inputProps, labelStyle, inputStyle} = this.props;
        const {onChangeText, ...rest} = inputProps;
        const {height, width, _value} = this.state;
        const Touchable = onRight? TouchableOpacity: View;
        const numOfLine = _value.split('\n').length;
        const isSetHeight = height>0 || numOfLine>1;
        return (
            <View style={[sty.main, style]}>
                {label && <Text style={[sty.label, isSetHeight&&{alignSelf: 'flex-start'}, labelStyle]}>{label}</Text>}
                {React.cloneElement(input, {
                    style: [sty.input, label && {paddingRight: 0}, isSetHeight&&{height}, inputStyle, maxHeight && {maxHeight}],
                    onChangeText: (text) => {
                        onChangeText && onChangeText(text);
                        this.setState({_value: text});
                    },
                    onChange: autoGrow ? ({nativeEvent: {contentSize}}) => {
                        const size = {...contentSize};
                        size.height = size.height - 8;
                        this.setState({...size});
                        // alert("update "+JSON.stringify(nativeEvent))
                    }: null,
                    /*onLayout: ({nativeEvent: {layout: {x, y, height}}}) => this.initialHeight = height,*/
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    ...rest
                })}
                {rText && <Touchable
                    style={[sty.rBtn, ]}
                    onPress={onRight}
                >
                    <View>
                        <Text style={[sty.rText, !onRight && {color: '#ccc'}]}>{rText}</Text>
                    </View>
                </Touchable>}
            </View>
        )
    }
}

export default InputExtra;
