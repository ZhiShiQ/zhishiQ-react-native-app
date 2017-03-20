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
        return !Map(this.props).equals(Map(newProps))
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
        input: <TextInput></TextInput>
    }
    state = {
        _value: ''
    }
    static propTypes = {
        label: PropTypes.string.isRequired,
        rText: PropTypes.string,
        onRight: PropTypes.func,
        inputProps: PropTypes.object,
        input: PropTypes.element,
        style: PropTypes.object,
        labelStyle: PropTypes.object,
    }

    get value() {
        return this.state._value;
    }

    render() {
        const {label, input, rText, onRight, style,
            inputProps, labelStyle} = this.props;
        const {onChangeText, ...rest} = inputProps;

        const Touchable = onRight? TouchableOpacity: View

        return (
            <View style={[sty.main, style]}>
                {label && <Text style={[sty.label, labelStyle]}>{label}</Text>}
                {React.cloneElement(input, {
                    style: [sty.input, label ? {paddingRight: 14} : {}],
                    onChangeText: (text) => {
                        onChangeText && onChangeText(text);
                        this.setState({_value: text});
                    },
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
