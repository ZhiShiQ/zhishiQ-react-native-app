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

import sty from './style';
import LinkItems from '../../components/LinkItems';
import * as Helper from '../../helpers';


@autobind
class TimezoneNFreeTimePage extends Component {
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
            <View style={{}}>
                <LinkItems
                    items={[{
                        leftText: "时区"
                    }, {
                        leftText: "国家"
                    }]}
                    renderFooter={() => (
                        <LinkItems
                            renderHeader={() => Helper.sep()}
                            scrollEnabled={false}
                            items={[{
                                leftText: "每周空闲时间",
                                iconName: "plus",
                                onPress: this._onAdd
                            }, {
                                leftText: "周三上午8:45－周四下午6:00",
                                onPress: this._onEdit
                            }]}
                        />
                    )}
                />
            </View>
        )
    }

    _onEdit() {
        const {actions} = this.props;
        actions.setTimeRangeDeletable(true);
        actions.timeRangeModalOpen();
    }

    _onAdd() {
        const {actions} = this.props;
        actions.setTimeRangeDeletable(false);
        actions.timeRangeModalOpen();
    }
}

export default TimezoneNFreeTimePage;
