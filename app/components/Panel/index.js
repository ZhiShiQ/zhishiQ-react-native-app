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
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class Panel extends Component {
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
    static propTypes = {
        title: PropTypes.string
    }
    render() {
        const sep = <View style={{backgroundColor: '#e5e5e5', height: 1, marginHorizontal: -10, marginVertical: 4}} />;
        let {title, style, children=[]} = this.props
        const titleStyle = {fontWeight: '600', color: '#4a4a4a', fontSize: 14, lineHeight: 20};
        if (!Array.isArray(children)) {
            children = [children];
        }
        return (
            <View style={[{borderWidth: 1, borderColor: '#e5e5e5', backgroundColor: '#fff'}, style]}>
                <Text style={{fontSize: 16, color: '#4a4a4a', textAlign: 'center', padding: 13, fontWeight: '600'}}>{title}</Text>
                <ListView
                    scrollEnabled={false}
                    contentContainerStyle={{borderTopColor: '#e5e5e5', borderTopWidth: 1, paddingVertical: 5, paddingTop: 10, paddingHorizontal: 10, backgroundColor: '#fafafa'}}
                    dataSource={
                        new ListView.DataSource({
                            rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                        }).cloneWithRows(children)
                    }
                    renderRow={(child, s, i) => React.cloneElement(child, {key: i})}
                    renderSeparator={(s, i) => i!=children.length-1 && sep}
                />
            </View>
        )
    }
}

export default Panel;
