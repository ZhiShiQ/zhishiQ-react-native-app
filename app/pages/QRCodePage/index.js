import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import querystring from 'querystring';
import {getToken} from '../../helpers';
import sty from './style';
import QRCodeScreen from '../../components/QRCodeScreen'
import Loading from '../../components/Loading'


@autobind
class QRCodePage extends Component {
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
    static defaultProps = {}
    state = {
        fetching: false
    };
    static propTypes = {}
    render() {
        const {store: {common: {referer: {target}}}, actions} = this.props;

        return (
            <View style={sty.main}>
                <QRCodeScreen
                    ref={r=>this._qr=r}
                    cancelButtonTitle={"退出"}
                    cancelButtonVisible={false}
                    onSuccess={(data) => {
                        this.setState({fetching: true});
                        this._sendAuthKey(data).then(() => {
                            this.setState({fetching: false});
                        });
                    }}
                    loading={this.state.fetching}
                />
            </View>
        )
    }

    async _sendAuthKey(uid) {
        alert(uid);
        const {store: {common: {referer: {target}}}, actions} = this.props;
        const token = await getToken();
        const query = querystring.stringify({auth_key: token, target, uid});
        const remote = "";

        // fetch(remote+"?"+query, {})
    }
}

export default QRCodePage;
