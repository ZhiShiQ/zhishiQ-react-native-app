import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import style from './style';

import GridGroupView from '../../components/GridGroupView';


@autobind
class ServicePage extends Component {
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
        headers: ["热门服务", "更多服务"],
        groups: [
            [
                {text: "外籍导师", onPress: () => Actions.foreignTeacher()},
                {text: "留学行家", onPress: () => Actions.abroadExpert()}
            ], [
                {text: "一站式服务", onPress: () => null},
                {text: "全套文书", onPress: () => Actions.serviceDetail()},
                {text: "国际优化快递", onPress: null},
                {text: "单项文书", onPress: () => Actions.serviceDetail()},
                {text: "简历", onPress: () => Actions.serviceDetail()},
                {text: "模拟考试", onPress: null}
            ]
        ]
    }
    state = {}
    static propTypes = {}
    render() {
      const {store: {service}, headers, groups} = this.props

      return (
          <View style={style.main}>
              <GridGroupView groups={groups} headers={headers} />
          </View>
      )
    }
}

export default ServicePage;
