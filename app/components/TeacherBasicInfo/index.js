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

import CirImage from '../CirImage';
import TextWithBgs from '../TextWithBgs';
import HrFlexLayout from '../HrFlexLayout';


@autobind
class TeacherBasicInfo extends Component {
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
        style: PropTypes.object,
        thumbnail: PropTypes.object,
        name: PropTypes.string,
        content: PropTypes.string,
        tags: PropTypes.array,
        appointNum: PropTypes.number,
        average: PropTypes.number,
        commentNum: PropTypes.number,
        listKeys: PropTypes.array,
        listValues: PropTypes.array,
    }
    render() {
        const {style, listValues, listKeys, thumbnail, name, content, tags, appointNum, average, commentNum} = this.props
        return (
            <View style={[sty.main]}>
                <CirImage size={110} source={thumbnail} style={{marginBottom: 6}}/>
                <Text style={sty.name}>{name}</Text>
                <Text style={sty.content}>{content}</Text>
                <TextWithBgs
                    items={tags}
                    eachStyle={{borderRadius: 2, paddingVertical: .5, fontSize: 12}}
                    bgColor="#FFF"
                    borderColor="#4a4a4a"
                />
                <HrFlexLayout
                    style={{marginTop: 14}}
                    renders={this.renders}
                    separator={
                        <View
                            style={{
                                width: StyleSheet.hairlineWidth,
                                backgroundColor: '#C4C4C4',
                            }}
                        />
                    }
                />
            </View>
        )
    }

    get renders() {
        const {style, listValues, listKeys, thumbnail, name, content, tags, appointNum, average, commentNum} = this.props
        return listKeys ? listKeys.map((k, i) => (
            <View style={sty.tag} key={i}>
                <Text>{listValues[i]}</Text>
                <Text style={sty.tip}>{k}</Text>
            </View>
        )) : [
            <View style={sty.tag}>
                <Text>{appointNum}</Text>
                <Text style={sty.tip}>预约人数</Text>
            </View>,
            <View style={sty.tag}>
                <Text>{average}</Text>
                <Text style={sty.tip}>平均评分</Text>
            </View>,
            <View style={sty.tag}>
                <Text>{commentNum}</Text>
                <Text style={sty.tip}>用户评价</Text>
            </View>
        ]
    }
}

export default TeacherBasicInfo;
