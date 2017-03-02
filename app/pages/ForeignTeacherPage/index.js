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
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import sty from './style';

import Collections from '../../components/Collections';
import DropDown from '../../components/DropDown';


@autobind
class ForeignTeacherPage extends Component {
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
            <View style={{flex: 1}}>
                {this.subMenu}
                <Collections
                    items={[{
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        content: ''
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        content: '一站式申请'
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                    }, {
                        onPress: alert,
                        onRemove: alert,
                        thumbnail: null,
                        title: 'Abby R',
                        numerator: 4.9,
                        deNumerator: 5,
                        serviceTimes: 1666,
                        content: 'xxxxxxxxx'
                    }]}
                />
            </View>
        )
    }

    get computeFilterPro() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;


        return filterPro.map((pro, i) => {
            const {categories, ...rest} = pro;
            if (categories) {
                rest.onPress = () => {}
            }
            return rest;
        });
    }


    get subMenu() {
        const {
            store: {
                abroad_expert: {
                    filterZone, filterPro
                }
            }, actions
        } = this.props;
        return (
            <View style={sty.menu}>

                <DropDown
                    height={deviceHeight*.45}
                    options={this.computeFilterZone} title="地区"/>

                <DropDown
                    ref={r => this.drop = r}
                    textStyle={sty.title}
                    title={"专业"}
                    options={this.computeFilterPro}
                />
            </View>
        )
    }
}

export default ForeignTeacherPage;
