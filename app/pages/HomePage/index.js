import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    Button,
    View,
    Dimensions,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import sty from './style';

import Carousel from '../../components/Carousel';
import HrFlexLayout from '../../components/HrFlexLayout';

@autobind
class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps))
    }

    componentWillUpdate(newProps, newState, newContext) {
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
    }

    componentWillUnmount() {
    }

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {...props} = this.props;
        return (
            <View style={sty.main}>
                <Carousel>
                    <View style={[{ backgroundColor: '#BADA55'}, {height: 100}]}><Text>1</Text></View>
                    <View style={[{ backgroundColor: 'red' }, {height: 100}]}><Text>2</Text></View>
                    <View style={[{ backgroundColor: 'blue' }, {height: 100}]}><Text>3</Text></View>
                </Carousel>
                <HrFlexLayout
                    style={{
                        justifyContent: 'space-around',
                        alignSelf: 'stretch',
                        paddingHorizontal: 10,
                        marginVertical: 20
                    }}
                >
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                </HrFlexLayout>

                <HrFlexLayout
                    style={{
                        justifyContent: 'space-around',
                        alignSelf: 'stretch',
                        paddingHorizontal: 10
                    }}
                >
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                    <View style={sty.rect}></View>
                </HrFlexLayout>
            </View>
        )
    }
}

export default HomePage;
