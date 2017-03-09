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
import * as Animatable from 'react-native-animatable';
import {upIcon, downIcon, starIcon} from '../../helpers/resource';
import Collapsible from 'react-native-collapsible';

import sty from './style';


@autobind
class CollapsibleItem extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {
        if (this.props.collapsed != newProps.collapsed) {
            this.setState({collapsed: newProps.collapsed});
        }
    }
    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {
        collapsed: true,
        style: {backgroundColor: '#fff'},
        upIcon: upIcon,
        downIcon: downIcon
    };
    state = {
        collapsed: true,
    };
    static propTypes = {
        control: PropTypes.element,
        upIcon: PropTypes.element,
        downIcon: PropTypes.element,
        collapsed: PropTypes.bool,
        style: PropTypes.object
    };
    get collapsible() {
        return this.state.collapsed
    }
    render() {
        const {control, children, downIcon, upIcon, style} = this.props;
        const {collapsed} = this.state;
        return (
            <View>
                <TouchableOpacity style={style} onPress={() => this.setState({collapsed: !collapsed})}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            {control}
                        </View>
                        {React.cloneElement(!collapsed ? upIcon : downIcon, {
                            style: {marginRight: 15, marginLeft: 5}
                        })}
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsed} align={"center"}>
                    {children}
                </Collapsible>
            </View>
        )
    }
}

export default CollapsibleItem;
