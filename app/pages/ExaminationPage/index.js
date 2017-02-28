import React, {Component} from 'react';
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
import {Actions} from 'react-native-router-flux';

import sty from './style';

import LinkItems from '../../components/LinkItems';
import TagsWithHead from '../../components/TagsWithHead';
import CirImageWithText from '../../components/CirImageWithText';

@autobind
class ExaminationPage extends Component {
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

    static defaultProps = {}
    state = {}
    static propTypes = {}

    render() {
        const {...props} = this.props

        return (
            <View style={sty.main}>
                <LinkItems
                    items={[{
                        leftComponent: <TagsWithHead tags={['阅读9.9', '阅读9.9', '阅读9.9']} title="TOEFL" />,
                        onPress: () => Actions.examinationDetail({params: {title: 'TOEFL'}})
                    }, {
                        leftComponent: <TagsWithHead tags={['阅读9.9', '阅读9.9', '阅读9.9']} title="GMAT" />,
                        onPress: () => Actions.examinationDetail({params: {title: 'GMAT'}})
                    }]}
                    renderFooter={() =>
                        <CirImageWithText
                            style={{marginTop: 80}}
                            text={["暂无考试成绩", "点击添加"]} size={150} />
                    }
                />

            </View>
        )
    }
}

export default ExaminationPage;
