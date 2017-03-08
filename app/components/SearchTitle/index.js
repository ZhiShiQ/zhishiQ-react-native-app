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
    TextInput,
    ListView,
    Platform,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import sty from './style';

const styles = StyleSheet.create({
    titleWrapper: {
        marginTop: 10,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 5,
            },
            windows: {
                top: 5,
            },
        }),
        left: 0,
        right: 0,
    },
})

@autobind
class SearchTitle extends Component {
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
    static propTypes = {}
    render() {
        const {...props} = this.props

        return (
            <View style={[styles.titleWrapper, {left: 20, right: 60},]}>
                <View
                    style={[ {
                        backgroundColor: '#f7f7f7',
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#e5e5e5',
                        alignItems: 'center',
                        overflow: 'hidden',
                        flexDirection: 'row',
                        height: 30,
                        top: -3
                    }]}
                >
                    <View style={{
                        flex: 0, marginLeft: 5
                    }}>
                        <EvilIcon name="search" color="#4a4a4a" size={26}/>
                    </View>
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 15,
                            paddingRight: 13,
                            paddingLeft: 3,
                            // paddingVertical: 13,
                            // left: 30,
                            // right: 120,
                        }}
                        placeholder={"搜索顾问、行家、关键词或领域"}
                    />
                </View>
            </View>
        )
    }
}

export default SearchTitle;
