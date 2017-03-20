import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import sty from './style';
import Hr from '../../components/Hr';

@autobind
class LinkItem extends Component {
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
        style: {},
        borderColor: '#E5E5E5',
        showBorder: '',
        showIcon: true,
        iconName: "angle-right",
        iconSize: 14,
    };
    state = {};
    static propTypes = {
        leftText: React.PropTypes.string,
        rightText: React.PropTypes.string,
        showBorder: React.PropTypes.oneOf(["top", "both", "bottom", null, '', false]),
        borderColor: React.PropTypes.string,
        style: React.PropTypes.object,
        leftStyle: React.PropTypes.object,
        leftTextStyle: React.PropTypes.object,
        rightStyle: React.PropTypes.object,
        rightTextStyle: React.PropTypes.object,
        onPress: React.PropTypes.func,
        leftComponent: React.PropTypes.element,
        rightComponent: React.PropTypes.element,
        showIcon: React.PropTypes.bool,
        emphasize: React.PropTypes.bool,
        iconName: React.PropTypes.string,
        iconColor: React.PropTypes.string,
        iconSize: React.PropTypes.number
    };
    render() {
        const {style, leftText, emphasize, iconSize, rightStyle, leftTextStyle, leftStyle, rightTextStyle, leftComponent, rightComponent, showIcon, onPress, rightText, iconName, showBorder, borderColor} = this.props
        return (
            <View style={style}>
                {
                    (showBorder === 'both' || showBorder=== 'top') &&
                    <Hr marginBottom={0} style={sty.hr}/>
                }
                <TouchableHighlight
                    underlayColor={"#EEE"}
                    onPress={onPress} style={[sty.main, style, {borderColor}, emphasize && {
                        borderLeftWidth: 5, borderColor: '#fc6d34', paddingLeft: 15-5,
                }]}>
                    <View style={sty.container}>
                        <View style={[sty.left, leftComponent?{flex: 5}:{}, leftStyle]}>
                            {leftComponent}
                            {!leftComponent && <Text style={[{color: '#4a4a4a'}, leftTextStyle]}>{leftText}</Text>}
                        </View>
                        <View style={[sty.right, rightStyle]}>
                            {rightComponent}
                            {!rightComponent  && <Text style={[sty.rightText, rightTextStyle]}>{rightText}</Text>}
                            {showIcon &&
                                this.icon
                            }
                        </View>
                    </View>
                </TouchableHighlight>
                {
                    (showBorder === 'both' || showBorder=== 'bottom') &&
                    <Hr marginBottom={0} style={sty.hr}/>
                }
            </View>
        )
    }

    get icon() {
        const {style, leftText, emphasize, iconSize, rightStyle, leftStyle, rightTextStyle, iconColor, leftComponent, rightComponent, showIcon, onPress, rightText, iconName, showBorder, borderColor} = this.props;
        if (iconName === 'check') {
            return <MaterialCommunityIcon style={sty.rightIcon} name={iconName} size={iconSize} color={iconColor || "#4a4a4a"} />
        }
        return <Icon style={sty.rightIcon} name={iconName} size={iconSize} color={iconColor || "#C4C4C4"} />
    }
}

export default LinkItem;
