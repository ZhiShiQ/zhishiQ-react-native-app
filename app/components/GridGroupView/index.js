import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    ListView,
    Button
} from 'react-native';

import style from './style';
import GridWithHeadView from '../GridWithHeadView';


@autobind
class GridGroupView extends Component {
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
        headers: ["H1", "H2", "H3", "H4"],
        groups: [["H1A", "H1B"], ["H2A", "H2B", "H2A", "H2B"], ["H2A", "H2B"], ["H2A", "H2B"]]
    }
    state = {}
    static propTypes = {
        headers: React.PropTypes.array.isRequired,
        groups: React.PropTypes.array.isRequired
    }
    render() {
        const {headers, groups} = this.props

        return (
            <ListView
                renderRow={(data, sectionId, rowId) => <GridWithHeadView grids={groups[rowId]} head={data}/>}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                    }).cloneWithRows(headers)
                }
            />
        )
    }
}

export default GridGroupView;
