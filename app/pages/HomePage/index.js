import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    Button,
    ScrollView,
    View,
    Dimensions,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
const {height, width} = Dimensions.get('window');
import sty from './style';

import Carousel from '../../components/Carousel';
import HrFlexLayout from '../../components/HrFlexLayout';
import HomeItems from '../../components/HomeItems';

@autobind
class HomePage extends Component {
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
    static propTypes = {}

    render() {
        const {...props} = this.props;
        return (
            <ScrollView contentContainerStyle={sty.main}>
                <Carousel
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                >
                    <View style={{backgroundColor: '#BADA55'}}></View>
                    <View style={{backgroundColor: 'red'}}></View>
                    <View style={{backgroundColor: 'blue'}}></View>
                </Carousel>
                {this.cirbtns}
                {this.sep()}
                {this.horitems}
                {this.sep()}
                {this.activity}
                {this.sep()}
                {this.hottopic}
                {this.sep()}
                <View style={{height: 120, backgroundColor: '#fff'}}></View>
                {this.sep()}
                {this.hotteacher}
            </ScrollView>
        )
    }

    renderMoreHead(title, onMore) {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', textAlign: 'left', fontSize: 16, color: '#4a4a4a'}}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={onMore}
                    style={{
                        flex: 1, alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}><View style={{}}>
                    <Text style={{color: '#848484'}}>更多 </Text></View></TouchableOpacity>

            </View>
        )
    }

    get hotteacher() {
        return (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
                {this.renderMoreHead('热门导师')}
                <HomeItems
                    items={[{
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }, {
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }, {
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }]}
                />
            </View>
        )
    }

    get hottopic() {
        return (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
                {this.renderMoreHead('推荐话题')}
                <HomeItems
                    items={[{
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }, {
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }, {
                        title: "艺术与设计类申请咨询（英国）",
                        tags: ["其他", "选校", "生活", "无效退款"],
                        content: "Viviney Wang  伦敦艺术大学, Service Experience Design and Innovation",
                        bottomValues: [5, 30]
                    }]}
                />
            </View>
        )
    }

    get activity() {
        const imgHeight = 100;
        return (
            <View style={{backgroundColor: '#fff', padding: 15}}>
                <Text
                    style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 15, fontSize: 16, color: '#4a4a4a'}}>
                    热门活动
                </Text>
                <View
                    style={{justifyContent: 'space-between', flexDirection: 'row'}}
                >
                    <Image style={{flex: 1, height: imgHeight, backgroundColor: '#ccc'}}/>
                    <View style={{width: 10}}></View>
                    <Image style={{flex: 1, height: imgHeight, backgroundColor: '#ccc'}}/>
                </View>
                {this.sep()}
                <View
                    style={{justifyContent: 'space-between', flexDirection: 'row'}}
                >
                    <Image style={{flex: 1, height: imgHeight, backgroundColor: '#ccc'}}/>
                    <View style={{width: 10}}></View>
                    <Image style={{flex: 1, height: imgHeight, backgroundColor: '#ccc'}}/>
                </View>
            </View>
        )
    }

    get horitems() {
        return <View style={{
            flexDirection: 'row', height: 125,
            justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#fff'
        }}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={sty.horText}>外籍导师</Text>
            </View>
            <View style={{height: 50, width: 1, backgroundColor: '#e5e5e5'}}></View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={sty.horText}>留学行家</Text>
            </View>
        </View>
    }

    sep() {
        return <View style={{
            height: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e5e5e5'
        }}></View>
    }

    get cirbtns() {
        return (
            <View style={{backgroundColor: '#fff', alignSelf: 'stretch', padding: 15}}>
                <HrFlexLayout
                    style={{
                        marginBottom: 13,
                        justifyContent: 'space-around',
                        alignSelf: 'stretch',
                        marginTop: 5
                    }}
                >
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>申请档案</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>留学文书</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>一站式</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>国际快递</Text>
                        </View>
                    </TouchableOpacity>
                </HrFlexLayout>

                <HrFlexLayout
                    style={{
                        paddingTop: 0,
                        justifyContent: 'space-around',
                        alignSelf: 'stretch',
                        marginBottom: 5
                    }}
                >
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>学术文章</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>模拟面试</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>留学资讯</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <View style={sty.rect}></View>
                            <Text style={sty.text}>天天特惠</Text>
                        </View>
                    </TouchableOpacity>
                </HrFlexLayout>
            </View>
        )
    }
}

export default HomePage;
