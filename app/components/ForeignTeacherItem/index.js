import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ListView,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

import Button from 'react-native-button';
import sty from './style';
import Hr from  '../Hr';
import TextWithBgs from  '../TextWithBgs';
import HrFlexLayout from  '../HrFlexLayout';

@autobind
class ForeignTeacherItem extends Component {
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
        title: 'TITLE',
        tags: [],
    }
    state = {}
    static propTypes = {
        onPress: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.object,
        style: React.PropTypes.object,
        tags: React.PropTypes.array,
        experience: React.PropTypes.string,
        education: React.PropTypes.string,
        brief: React.PropTypes.string,
        clients: React.PropTypes.number,
        rate: React.PropTypes.number,
        reviews: React.PropTypes.number,
        dollar: React.PropTypes.number,
    }

    render() {
        const {
            onPress, style, title, thumbnail, dollar, brief,
            tags, experience, education, clients, rate, reviews
        } = this.props;
        const Touchable = TouchableHighlight;
        return (
            <TouchableOpacity onPress={onPress} style={[sty.main, style]}>
                <View style={sty.mainContainer}>
                    <View style={sty.mainInnerContainer}>
                        <View style={sty.imageContainer}>
                            <Image style={sty.image} source={thumbnail} />
                        </View>
                        <View style={sty.contentContainer}>
                            <Text style={sty.titleText}>{title}</Text>
                            <View style={sty.tags} >
                                <TextWithBgs
                                    bgColor='#fff'
                                    eachStyle={{
                                        paddingVertical: 0,
                                        fontSize: 12, borderRadius: 3,
                                        borderWidth: StyleSheet.hairlineWidth, borderColor: '#979797'
                                    }}
                                    items={tags} />
                            </View>
                        </View>
                    </View>
                    <Hr marginTop={10}/>

                    {brief && <Text style={{marginBottom: 8, fontSize: 13}}>
                        <Text style={{color: '#848484'}}>{brief}</Text>
                    </Text>}
                    {experience && <Text style={{marginBottom: 8, fontSize: 13}}>
                        <Text style={{color: '#4A4A4A'}}>Experience：</Text>
                        <Text style={{color: '#848484'}}>{experience}</Text>
                    </Text>}
                    {education && <Text style={{marginBottom: 8, fontSize: 13}}>
                        <Text style={{color: '#4A4A4A'}}>Education：</Text>
                        <Text style={{color: '#848484'}}>{education}</Text>
                    </Text>}

                    <Hr marginTop={0}/>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <HrFlexLayout
                            style={{marginTop: 2, flex: 1}}
                            separator={
                                <View
                                    style={{
                                        width: StyleSheet.hairlineWidth,
                                        backgroundColor: '#C4C4C4',
                                    }}
                                />
                            }
                        >
                            <View style={sty.tag}>
                                <Text>{clients}</Text>
                                <Text style={sty.tip}>Clients</Text>
                            </View>
                            <View style={sty.tag}>
                                <Text>{rate}</Text>
                                <Text style={sty.tip}>Rate</Text>
                            </View>
                            <View style={sty.tag}>
                                <Text>{reviews}</Text>
                                <Text style={sty.tip}>Reviews</Text>
                            </View>
                        </HrFlexLayout>

                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 12, color: '#848484'}}>(文书价)</Text>
                            <Text style={{color: '#4A4A4A'}}><Text style={{fontWeight: '500'}}>$ {dollar}</Text><
                                Text style={{}}>/300单词</Text></Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ForeignTeacherItem;
