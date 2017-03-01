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

import style from './style';
import CirImage from '../../components/CirImage'

@autobind
class IconsGroup extends Component {
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
        items: React.PropTypes.array.isRequired
    }
    render() {
        const {items} = this.props

        return (
            <View style={style.main}>
                {items.map(this._renderItem)}
            </View>
        )
    }

    _renderItem({text, onPress}, index) {
        return (
            <TouchableHighlight
                key={index}
                onPress={onPress}
                >
                <View style={style.container}>
                    <CirImage size={30} />
                    <Text style={style.text}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default IconsGroup;
