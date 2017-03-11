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
import Collapsible from 'react-native-collapsible';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/EvilIcons'
import {PADDING_SIZE} from '../../constant';
import {upIcon, downIcon} from '../../helpers/resource';
import sty from './style';


@autobind
class CollapsibleIntro extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {}
    state = {
        expended: false
    }
    static propTypes = {
        showTexts: PropTypes.oneOfType(PropTypes.array, PropTypes.string),
        title: PropTypes.string,
        hideTexts: PropTypes.oneOfType(PropTypes.array, PropTypes.string),
        hideComponent: PropTypes.element,
        showComponent: PropTypes.element,
        style: PropTypes.object,
        textStyle: PropTypes.object,
    }
    render() {
        const {hideComponent, style, textStyle, hideTexts, title} = this.props;
        return (
            <View style={[sty.main, {backgroundColor: '#fff', padding: PADDING_SIZE, paddingTop: 20}, style]}>
                {title && CollapsibleIntro.getHead(title)}
                {this.props.children}
                {this.getText()}
                {this.getComponent()}
                {(hideComponent || hideTexts) && this.expendableCtl()}
            </View>
        )
    }

    getComponent() {
        const {hideComponent, showComponent} = this.props;
        const {expended} = this.state;
        if (!hideComponent && !showComponent) {
            return;
        }
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Collapsible collapsed={!expended} align={"center"} >
                    {hideComponent}
                </Collapsible>
            </View>
        )
    }

    getText() {
        let {showTexts, hideTexts, textStyle} = this.props;
        const {expended} = this.state;
        if (!showTexts && !hideTexts) {
            return;
        }
        showTexts = !Array.isArray(showTexts) ? [showTexts] : showTexts;
        if (hideTexts) {
            hideTexts = !Array.isArray(hideTexts) ? [hideTexts] : hideTexts;
        }

        return (
            <View style={{backgroundColor: '#fff'}}>
                <Text style={textStyle}>
                {showTexts.map((t, i) =>
                    <Text key={i} style={{color: '#848484', marginBottom: 10, lineHeight: 17}}>
                        {t+((i==showTexts.length-1 && !!t && hideTexts && hideTexts.length)?'...':'')}
                    </Text>
                )}
                </Text>
                <Collapsible
                    collapsed={!expended} align="center">
                    <Text style={textStyle}>
                    {hideTexts && hideTexts.map((t, i) =>
                        <Text key={i} style={{color: '#848484', marginBottom: 10, lineHeight: 17}}>
                            {t}
                        </Text>
                    )}
                    </Text>
                </Collapsible>
            </View>
        )
    }

    expendableCtl(onPress=() => this.setState({expended: !expended})) {
        const {expended} = this.state;

        return <TouchableOpacity
            style={{paddingTop: 12, alignItems: 'center'}}
            onPress={onPress}>
            <View style={{}}>
                <Text style={{color: '#ea5502', fontSize: 14, lineHeight: 17}}>
                    {!expended ? <Text>全部展开{downIcon}</Text> :
                        <Text>收起{upIcon}</Text>
                    }
                </Text>
            </View>
        </TouchableOpacity>
    }

    getHead2() {
        const {title} = this.props;
        return (
            <View style={{
                marginBottom: 15, alignItems: 'center'
            }}>
                <View style={{
                    paddingBottom: 3,
                }}>
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >{title}</Text>
                </View>
            </View>
        )
    }

    static getHead(title, noMargin) {
        return (
            <View style={[{
                marginBottom: noMargin?0:15, flexDirection: 'row'
            }]}>
                <View style={{
                    width: 2,
                    backgroundColor: '#ea5502',
                    marginRight: 6
                }}>
                </View>
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: '#4a4a4a'
                    }}
                >{title}</Text>
            </View>
        )
    }
}

export default CollapsibleIntro;
