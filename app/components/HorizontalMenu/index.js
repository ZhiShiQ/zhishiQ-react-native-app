import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
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


@autobind
class HorizontalMenu extends Component {
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

    static defaultProps = {
        items: [{
            title: 'HrMenu_A',
            active: true,
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }, {
            title: 'HrMenu_A',
            onPress: () => alert('HrMenu_A')
        }]
    }
    state = {}
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        style: React.PropTypes.object
    }

    render() {
        const {items, style} = this.props

        return (
            <View style={[sty.main, style]}>
                <ListView
                    contentContainerStyle={{}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2)),
                        }).cloneWithRows(items)
                    }
                    renderRow={this._renderRow}
                />
            </View>
        )
    }

    _renderRow({title, onPress, active}, sID, rID) {
        return (
            <TouchableHighlight
                style={[sty.rowContainer, active ? sty.active : {}]}
                onPress={onPress}
            >
                <Text style={sty.rowText}>{title}</Text>
            </TouchableHighlight>
        )
    }
}

export default HorizontalMenu;
