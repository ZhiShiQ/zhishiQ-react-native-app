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

import BoughtView from '../BoughtView';

@autobind
class BoughtViews extends Component {
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
        items: new Array(10).fill({})
    }
    state = {}
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        style: React.PropTypes.object
    }
    render() {
        const {items, style} = this.props

        return (
            <ListView
                renderRow={this._renderRow}
                contentContainerStyle={[sty.main, style]}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                    }).cloneWithRows(items)
                }
            />
        )
    }
    _renderRow(data, sectionId, rowId) {
        return (
            <BoughtView key={rowId} {...data} style={rowId!=0?{marginTop: 20}:{}} />
        )
    }
}

export default BoughtViews;
