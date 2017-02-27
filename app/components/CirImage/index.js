import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    ScrollView,
    Image,
    Button
} from 'react-native';

import sty from './style';


@autobind
class CirImage extends Component {
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
        size: 32
    }
    state = {}
    static propTypes = {
        size: React.PropTypes.number,
        style: React.PropTypes.object,
        source: React.PropTypes.object
    }
    render() {
        const {style, source, size} = this.props
        const halfSize = Math.ceil(size / 2);

        return (
            <Image
                source={source}
                style={[{width: size, height: size, borderRadius: halfSize, backgroundColor: '#D8D8D8'}, style]}
            />
        )
    }
}

export default CirImage;
