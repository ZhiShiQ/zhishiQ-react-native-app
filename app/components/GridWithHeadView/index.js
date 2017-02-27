import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button,
    ScrollView,
    ListView
} from 'react-native';

import style from './style';


@autobind
class GridGroupView extends Component {
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
        grids: ['G1A', 'G1B'],
        head: "head"
    }
    state = {}
    static propTypes = {}

    render() {
        const {...props} = this.props

        return this.renderListView();
    }

    renderListView() {
        const {head, renderHeader, grids, ...rest} = this.props;
        return (
            <ScrollView>
                {(renderHeader||this.renderHeader)(head)}
                <ListView
                    contentContainerStyle={style.contentContainer}
                    renderFooter={() => null}
                    renderRow={GridGroupView.renderRow}
                    enableEmptySections={true}
                    initialListSize={20}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={true}
                    removeClippedSubviews={true}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2)=>!Map(r1).equals(Map(r2)),
                            //sectionHeaderHasChanged: (s1, s2)=> s1!==s2,
                            getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID],
                            //getSectionHeaderData: (dataBlob, sectionID)=> groups[sectionID]
                        }).cloneWithRows(grids)
                    }
                    {...rest}
                />
            </ScrollView>
        )
    }

    renderHeader() {
        const {head} = this.props;
        return (
            <View style={style.sectionContainer}>
                <Text style={style.sectionText}>—— {head} ——</Text>
            </View>
        )
    }
    static renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={style.sectionContainer}>
                <Text style={style.sectionText}>sectionData => {sectionData}</Text>
            </View>
        )
    }

    static renderRow(rowData, sectionID, rowID) {
        return (
            <View style={style.gridContainer}>
                <Text style={style.gridText}>{rowData}</Text>
            </View>
        )
    }
}

export default GridGroupView;
