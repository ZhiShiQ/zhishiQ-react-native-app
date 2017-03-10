import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    RefreshControl,
    ActivityIndicator,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import sty from './style';

import ServiceItem from '../ServiceItem';
import Hr from '../Hr';

@autobind
class Services extends Component {
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
    static defaultProps = {
    }
    state = {
        refreshing: false
    }
    static propTypes = {
        ...ListView.propTypes,
        items: PropTypes.array,
        style: PropTypes.object,
    }
    render() {
        const {items, style, ...rest} = this.props
        /*
         <ActivityIndicator
         animating
         size="small"
         style={{height: 40}}
         />
         */
        return (
            <ListView
                renderHeader={() => null}
                contentContainerStyle={[style]}
                dataSource={
                    new ListView.DataSource({
                        rowHasChanged: (a, b) => !Map(a).equals(b)
                    }).cloneWithRows(items)
                }
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
                pageSize={8}
                initialListSize={8}
                scrollRenderAheadDistance={60}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        style={{}}
                    />
                }
                onEndReachedThreshold={100}
                {...rest}
            />
        )
    }
    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 1000);
    }
    _renderSeparator() {
        return (
            <Hr marginBottom={0} color={'#e5e5e5'}
                style={{marginHorizontal: 15}}
            />
        )
    }
    _renderRow(data, s, i) {
        return <ServiceItem key={i} {...data} />
    }
}

export default Services;
