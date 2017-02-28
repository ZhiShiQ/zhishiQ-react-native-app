import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Button
} from 'react-native';

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
            ["外籍导师", "留学行家"], ["一站式服务", "全套文书", "国际优化快递", "单项文书", "简历", "模拟考试"]
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
