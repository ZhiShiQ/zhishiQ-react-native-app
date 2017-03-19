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
import TextWithBgs from '../TextWithBgs';
import CollapsibleItem from '../CollapsibleItem';

import sty from './style';


@autobind
class CollapsibleService extends Component {
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
    static propTypes = {
        detail: PropTypes.object,
        table: PropTypes.object,
        name: PropTypes.string,
        rSubText: PropTypes.string,
        price: PropTypes.number,
        onBtnPress: PropTypes.func
    }

    render() {
        const {detail, table, name, rSubText, price, onBtnPress} = this.props

        return (
            <CollapsibleItem
                style={{
                    backgroundColor: '#fff', borderTopWidth: .5, borderColor: '#e5e5e5'
                }}
                control={
                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center', padding: 15, paddingRight: 0,
                        }}
                    >
                        <Text style={{flex: 1, fontSize: 15, lineHeight: 17.5, color: '#4a4a4a'}}>{name}</Text>
                        <View style={{flexDirection: 'row', flex: 0, alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Text style={{color: '#a1a1a1', fontSize: 12}}>{rSubText}</Text>
                            <Text numberOfLines={1} style={{marginLeft: 4, color: '#ea5502', fontSize: 15}}>¥{price}</Text>
                        </View>
                    </View>
                }
            >
                <View style={{
                    backgroundColor: '#fbfbfb',
                    paddingHorizontal: 15,
                    borderTopWidth: .5,
                    borderColor: '#e5e5e5'
                }}>
                    {table &&
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: .5,
                            borderBottomColor: '#e5e5e5'
                        }}>
                            {table.head && table.head.map((x, i, a) => this._renderCell(x, i, a, {color: '#848484'}))}
                        </View>
                        {table.body.map((row, i, a) =>
                            <View key={i} style={[{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }, i != a.length - 1 ? {borderBottomWidth: .5, borderBottomColor: '#e5e5e5'} : {}]}>
                                {row.map(this._renderCell)}
                            </View>
                        )}
                    </View>
                    }
                    {detail &&
                        <View  style={{marginVertical: 12}}>
                            <TextWithBgs items={detail.tags}
                                         eachStyle={{fontSize: 12.5, paddingVertical: 1, paddingHorizontal: 2, borderWidth: .5, borderRadius: 3}}
                                         borderColor={'#979797'} bgColor={'transparent'}/>
                            {
                                detail.contents && detail.contents.map((text, i) =>
                                    <View>
                                        <Text style={{color: '#4a4a4a', lineHeight: 16, fontSize: 13.3, marginTop: 8}} key={i}>
                                            {text}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    }

                    <View>
                        <TouchableOpacity
                            onPress={onBtnPress}
                            style={{
                                paddingVertical: 10, paddingHorizontal: 20,
                                borderRadius: 4, marginBottom: 10,
                                backgroundColor: '#ea5502', alignSelf: 'center'
                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 13}}>立即预约</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CollapsibleItem>
        )
    }

    _renderCell (x, i, a, style) {
        return (
            <View key={i} style={[{flex: 1, paddingVertical: 12}]}>
                <Text style={[{
                    fontSize: 13.5,
                    color: i == 0 ? '#4a4a4a' : '#ea5502'
                }, style, i == a.length - 1 && {textAlign: 'right'}, x.align && {textAlign: x.align}]}>
                    {x.name || x}
                    {x.append && <Text style={{color: '#4a4a4a'}}>{x.append}</Text>}
                </Text>
            </View>
        )
    }
}

export default CollapsibleService;
