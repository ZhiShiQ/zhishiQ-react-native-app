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


@autobind
class SubMenu extends Component {
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
        onPress: PropTypes.func,
        active: PropTypes.bool,
        activeStyle: PropTypes.object,
        textActive: PropTypes.bool,
        style: PropTypes.object
    }
    render() {
        const {title, onPress, active, activeStyle, textActive, style} = this.props

        return (
            <View>
            { !textActive
                ? <TouchableOpacity
                    style={[sty.rowContainer, active && sty.active, active && !textActive && activeStyle, style]}
                    onPress={onPress}
                >
                        <Text style={[sty.rowText]}>{title}</Text>
                </TouchableOpacity>
                : <TouchableOpacity
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    onPress={onPress}
                >
                        <View style={[{ paddingVertical: 10, alignItems: 'center', justifyContent: 'center'},
                            sty.rowContainer, active && sty.active
                        ]}>
                            <Text style={sty.rowText}>{title}</Text>
                        </View>
                </TouchableOpacity>
            }
            </View>
        )
    }
}

export default SubMenu;
