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
    Button
} from 'react-native';

import sty from './style';
import TextWithBg from '../TextWithBg';
import HrFlexLayout from '../HrFlexLayout';

@autobind
class TextWithBgs extends Component {
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
        items: [],
        borderColor: 'transparent'
    }
    state = {}
    static propTypes = {
        style: PropTypes.object,
        bgColor: PropTypes.string,
        color: PropTypes.string,
        borderColor: PropTypes.string,
        items: PropTypes.array,
        eachStyle: PropTypes.object
    }
    render() {
        const {style, items, eachStyle, bgColor, color, borderColor} = this.props
        return (
            <HrFlexLayout style={[sty.main, style]}>
                {
                    items.map((item, i) =>
                        <TextWithBg
                            key={i}
                            title={typeof item === 'string' ? item : item.title}
                            onPress={item.onPress}
                            bgColor={bgColor}
                            color={color}
                            style={[
                                {borderColor, borderWidth: StyleSheet.hairlineWidth}, eachStyle,
                                (i==items.length-1)?{marginRight: 0}:{}
                            ]}
                        />
                    )
                }
            </HrFlexLayout>
        )
    }
}

export default TextWithBgs;
