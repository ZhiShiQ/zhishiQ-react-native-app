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
import CirImage from '../CirImage';


@autobind
class PersonInOrder extends Component {
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
        normal: false
    }
    state = {}
    static propTypes = {
        avatar: PropTypes.object,
        clients: PropTypes.number,
        average: PropTypes.number,
        school: PropTypes.string,
        intro: PropTypes.string,
        name: PropTypes.string,
        onPress: PropTypes.func,
        style: PropTypes.object,
        normal: PropTypes.bool
    }
    render() {
        const {clients, average, name, avatar, school, normal, intro, onPress, style} = this.props
        const Container = onPress ? TouchableOpacity : View;
        return (
            <Container
                onPress={onPress}
                style={[{flexDirection: 'row', flex: 1, alignSelf: 'stretch', padding: 15, backgroundColor: '#fff'},
                    style
                ]}
            >
                <View style={{marginRight: 10}}>
                    <CirImage size={45} source={avatar} />
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, fontSize: 16, fontColor: '#4a4a4a', fontWeight: '600'}}>{name}</Text>
                        <Text style={{fontSize: 14, color: '#848484', alignSelf: 'flex-end'}}>
                            <Text style={{color: !normal?'#ea5502':'#4a4a4a'}}>{Number(average).toFixed(1)} </Text>分
                            <Text> </Text>
                            <Text style={{color: !normal?'#ea5502':'#4a4a4a'}}>{clients} </Text>服务
                        </Text>
                    </View>
                    <View style={{marginTop: 6}}>
                        <Text style={{fontSize: 14, color: '#848484', flex: 1}}>
                            <Text style={{}}>{school}</Text>
                            <Text> </Text>
                            <Text style={{}}>{intro}</Text>
                        </Text>
                    </View>
                </View>
            </Container>
        )
    }

}

export default PersonInOrder;
