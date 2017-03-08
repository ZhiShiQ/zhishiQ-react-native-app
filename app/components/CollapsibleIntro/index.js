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
import {PADDING_SIZE} from '../../constant'
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
    }
    render() {
        return (
            <View style={[sty.main, {backgroundColor: '#fff', padding: PADDING_SIZE}]}>
                {CollapsibleIntro.getHead(this.props.title)}
                {this.getText()}
                {this.props.children}
            </View>
        )
    }
    getText() {
        let {showTexts, hideTexts} = this.props;
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
                <Text>
                {showTexts.map((t, i) =>
                    <Text key={i} style={{color: '#848484', marginBottom: 10, lineHeight: 17}}>
                        {t}
                    </Text>
                )}
                </Text>
                <Collapsible collapsed={!expended} align="center">
                    <Text>
                    {hideTexts && hideTexts.map((t, i) =>
                        <Text key={i} style={{color: '#848484', marginBottom: 10, lineHeight: 17}}>
                            {t}
                        </Text>
                    )}
                    </Text>
                </Collapsible>
                {hideTexts && this.expendableCtl(() => {
                    this.setState({expended: !expended});
                })}
            </View>
        )
    }

    expendableCtl(onPress) {
        const {expended} = this.state;

        return <TouchableOpacity
            style={{paddingTop: 12, alignItems: 'center'}}
            onPress={onPress}>
            <View style={{}}>
                <Text style={{color: '#ea5502', fontSize: 14, lineHeight: 17}}>
                    {!expended ? <Text>全部展开<Entypo size={18} color="#c4c4c4" name="chevron-down" /></Text> :
                        <Text>部分收缩<Entypo size={18} color="#c4c4c4" name="chevron-up" /></Text>
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
