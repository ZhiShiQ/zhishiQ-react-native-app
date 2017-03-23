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
import {getToken, getTokenSync, _debugger, open} from '../../helpers';
import {saoRedirect} from '../../helpers/remote-urls';
import {parse} from 'url';

import sty from './style';
import QRCodeScreen from '../../components/QRCodeScreen';
import Loading from '../../components/Loading';


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

    async _sendAuthKey(data) {
        const obj = parse(data, true);
        if (obj.pathname !== '/sao/wechat') {
            open(obj.href);
            return true;
        }
        const {store: {common: {referer: {target}}}, actions} = this.props;
        const token = await getToken();
        const tokenObj = JSON.parse(token);
        const query = querystring.stringify({
            auth_key: tokenObj.auth_key,
            user_id: tokenObj.id,
            redirect_url: 'http://blog.moyuyc.xyz',
            id: obj.query.id,
            code: obj.query.code
        });
        return fetch(saoRedirect, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: query
        })
            .then(r => r.json())
            .then(json => {
                if (!json.success) {
                    alert(json.message);
                    return false;
                } else {
                    return true;
                }
            })
            .catch(ex => {
                _debugger(ex);
                return false;
            })
    }
}

export default QRCodePage;
