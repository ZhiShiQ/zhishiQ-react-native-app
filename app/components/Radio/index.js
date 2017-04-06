import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import sty from './style';

import {RadioButton, RadioButtonInput} from 'react-native-simple-radio-button';


@autobind
class Radio extends Component {
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
        selected: false,
        children: <View/>,
        disabled: false,
        color: "#fc6d34"
    }
    state = {}
    static propTypes = {
        selected: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onPress: React.PropTypes.func,
        selectedStyle: React.PropTypes.object,
        color: React.PropTypes.string,
    }
    render() {
        const {selected, disabled, color, onPress, selectedStyle=sty.selected, style, children} = this.props

        return (
            <View style={style}>
                <RadioButtonInput
                    onPress={onPress}
                    isSelected={selected}
                    disabled={disabled}
                    obj={{}}
                    buttonInnerColor={color}
                    buttonOuterColor={color}
                    buttonSize={10}
                    buttonOuterSize={16}
                    buttonStyle={{borderWidth: 1.5}}
                    buttonWrapStyle={{style}}
                >
                </RadioButtonInput>
            </View>
        )

    }
}

export default Radio;
