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
import CirImage from '../CirImage';
import TextWithBgs from '../TextWithBgs';

import sty from './style';


@autobind
class HomeItem extends Component {
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

    static defaultProps = {
        bottomKeys: ["评分", "预约"]
    }
    state = {}
    static propTypes = {
        title: PropTypes.string,
        tags: PropTypes.array,
        thumbnail: PropTypes.object,
        style: PropTypes.object,
        content: PropTypes.string,
        bottomKeys: PropTypes.array,
        bottomValues: PropTypes.array,
        price: PropTypes.number,
        onPress: PropTypes.func
    }

    render() {
        const {title, thumbnail, style, price, tags, onPress, content, bottomKeys, bottomValues} = this.props

        return (
            <TouchableOpacity
                onPress={onPress}
                style={[sty.container, price!=null && {paddingBottom: 20}, style]}
            >
                <View style={sty.main}>
                    <CirImage style={{
                        marginRight: 10, flex: 0,
                    }} source={thumbnail} size={50}/>
                    <View style={{flex: 1, marginTop: 4}}>
                        <Text style={sty.title}>{title}</Text>
                        {tags && <TextWithBgs
                            style={{marginBottom: 6}}
                            bgColor={"#fff"}
                            eachStyle={{
                                fontSize: 12.5,
                                paddingVertical: 1,
                                paddingHorizontal: 2,
                                borderColor: '#979797',
                                borderWidth: .5,
                                borderRadius: 2
                            }}
                            items={tags}/>}
                        <Text style={sty.content}>{content}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text
                                style={[sty.bottomTextContainer, {
                                    flex: 1
                                }]}>
                                {bottomKeys.map((k, i) =>
                                    <Text style={sty.bottomText}>{k} {bottomValues[i]}   </Text>
                                )}
                            </Text>
                            {price!=null && <Text style={[{
                                flex: 0,
                            }, sty.bottomTextContainer]}>
                                <Text style={{fontWeight: 'bold', fontSize: 17, color: '#ea5502'}}>{price}</Text>
                                <Text> 起</Text>
                            </Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default HomeItem;
