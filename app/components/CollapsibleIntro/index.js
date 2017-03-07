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
                {this.getHead()}
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
                <Text style={{color: '#4A4A4A', fontSize: 14, lineHeight: 17}}>{!expended ? "全部展开" : "部分收缩"}</Text>
            </View>
        </TouchableOpacity>
    }

    getHead() {
        const {title} = this.props;
        return (
            <View style={{
                marginBottom: 15, alignItems: 'center'
            }}>
                <View style={{
                    borderBottomWidth: 2, paddingBottom: 3,
                    borderBottomColor: '#4a4a4a'
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
}

export default CollapsibleIntro;
