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
    Dimensions,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LoopedCarousel from 'react-native-looped-carousel';
let { width, height } = Dimensions.get('window');

import sty from './style';


@autobind
class Carousel extends Component {
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
    _onLayoutDidChange(e) {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }
    static defaultProps = {}
    state = {
        size: { width, height: 200 }
    }
    static propTypes = {
        style: PropTypes.object
    }
    render() {
        const {style, children} = this.props;
        return (
            <View  onLayout={this._onLayoutDidChange}>
                <LoopedCarousel
                    bullets
                    delay={4000}
                    bulletStyle={{backgroundColor: 'rgba(255,255,255,.6)'}}
                    chosenBulletStyle={{backgroundColor: '#ea5502'}}
                    style={[this.state.size, style]}
                    autoplay
                >
                    {React.Children.map(children, (Child, i) =>
                        React.cloneElement(Child, {key: i, style: [this.state.size, Child.props.style]})
                    )}
                </LoopedCarousel>
            </View>
        )
    }
}

export default Carousel;
