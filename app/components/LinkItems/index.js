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

import style from './style';
import LinkItem from '../../components/LinkItem';
import Hr from '../../components/Hr';

@autobind
class LinkItems extends Component {
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
        items: []
    }
    state = {}
    static propTypes = {
        items: React.PropTypes.array.isRequired
    }
    render() {
        const {items} = this.props;

        return (
            <ListView
                renderRow={this._renderRow}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                    }).cloneWithRows(items)
                }
            />
        )
    }
    _renderRow(rowData, sectionID, rowID) {
        return <View>
            <LinkItem showBorder={rowID == 0 ? null : 'top'} {...rowData} />
        </View>
    }
}

export default LinkItems;
