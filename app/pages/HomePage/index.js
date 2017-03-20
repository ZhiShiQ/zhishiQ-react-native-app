import React, {Component} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    Button,
    ScrollView,
    ListView,
    View,
    Dimensions,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

const {height, width} = Dimensions.get('window');
import sty from './style';
import {open, sep} from '../../helpers'

import Carousel from '../../components/Carousel';
import HrFlexLayout from '../../components/HrFlexLayout';
import HomeItems from '../../components/HomeItems';
import Loading from '../../components/Loading';


@autobind
class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {actions, store: {home: {isFirst}}} = this.props;
        isFirst && actions.fetchHomePage({reset: true})
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
    state = {

    }
    static propTypes = {}

    _onRefresh() {
        const {actions} = this.props;
        actions.fetchHomePage({refresh: true})
    }

    render() {
        const {
            actions, store: {
            home: {
                sliders, singlePicture,
                isRefreshing, isFirst, isFetching
            }
        }
        } = this.props;
        if (isFirst && isFetching) {
            return <Loading />;
        } else {
            return this.renderMain();
        }
    }

    renderMain () {
        const {
            actions, store: {
            home: {
                sliders, singlePicture,
                isRefreshing
            }
        }
        } = this.props;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                contentContainerStyle={sty.main}
            >
                <Carousel
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                >
                    {sliders.map(({thumbnail, route, type}, i) => (
                        <TouchableOpacity key={i}
                            style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                this.routeHandle({route, type});
                            }}
                        >
                            <Image style={{alignSelf: 'stretch', flex: 1}} resizeMode={'center'} source={thumbnail}/>
                        </TouchableOpacity>
                    ))}
                </Carousel>
                {this.cirbtns}
                {this.sep()}
                {this.horitems}
                {this.sep()}
                {this.activity}
                {this.sep()}
                {this.hottopic}
                {this.sep()}
                <TouchableOpacity
                    style={{height: 120, backgroundColor: '#fff'}}
                    onPress={() => this.routeHandle(singlePicture)}
                >
                    <Image resizeMode={"cover"} style={{alignSelf: 'stretch', flex: 1}} source={singlePicture.thumbnail} />
                </TouchableOpacity>
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
        const {store: {home: {hotTeachers}}} = this.props;
        return (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
                {this.renderMoreHead('热门导师', () => {
                    Actions.foreignTeacher();
                })}
                <HomeItems
                    items={hotTeachers}
                />
            </View>
        )
    }

    get hottopic() {
        const {store: {home: {recommendTopics}}} = this.props;
        return (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
                {this.renderMoreHead('推荐话题', () => {
                    Actions.abroadExpert();
                })}
                <HomeItems
                    items={recommendTopics}
                />
            </View>
        )
    }

    routeHandle({route, type}) {
        if (type === 'url') {
            open(route);
        }
    }

    get activity() {
        const {actions, store: {home: {activities}}} = this.props;
        const imgHeight = 100;
        return (
            <View style={{padding: 15, backgroundColor: '#fff'}}>
                <Text
                    style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 15, fontSize: 16, color: '#4a4a4a'}}>
                    热门活动
                </Text>
                <ListView
                    scrollEnabled={false}
                    dataSource={new ListView.DataSource({
                        rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                    }).cloneWithRows(activities)}
                    renderRow={(data, s, i) => (
                        <ListView
                            key={i}
                            scrollEnabled={false}
                            contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'row'}}
                            dataSource={new ListView.DataSource({
                                rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                            }).cloneWithRows(data)}
                            renderRow={(data, s, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={{flex: 1, height: imgHeight, backgroundColor: '#ccc'}}
                                    onPress={() => this.routeHandle(data)}
                                >
                                    <Image style={{alignSelf: 'stretch', flex: 1}} resizeMode={'center'} source={data.thumbnail}/>
                                </TouchableOpacity>
                            )}
                            renderSeparator={(s, i) => i != data.length - 1 &&
                            <View key={i} style={{width: 10, flex: 0}}></View>}
                        />
                    )}
                    renderSeparator={(s, i) => i != activities.length - 1 && this.sep(true, null, { key: i })}
                />
            </View>
        )
    }

    get horitems() {
        const {store: {home: {subItems}}, actions} = this.props;
        return (
            <ListView
                scrollEnabled={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    flexDirection: 'row', height: 125,
                    justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#fff'
                }}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(subItems)}
                renderRow={({name, thumbnail, type, route}, s, i) => (
                    <TouchableOpacity
                        key={i}
                        style={{flex: 1, alignItems: 'center', paddingVertical: 15}}
                        onPress={null}
                    >
                        <Image style={{alignSelf: 'stretch', flex: 1}} resizeMode={'center'} source={thumbnail}/>
                        <Text style={sty.horText}>{name}</Text>
                    </TouchableOpacity>
                )}
                renderSeparator={(a, i) =>
                i != subItems.length - 1 && <View key={i} style={{height: 60, width: 1, backgroundColor: '#e5e5e5'}}></View>
                }
            />
        )
    }

    sep(noBorder, style, props) {
        return sep(noBorder, style, props)
    }

    get cirbtns() {
        const {store: {home: {mainItems}}} = this.props;
        return (
            <ListView
                contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    backgroundColor: '#fff', paddingVertical: 15,
                    paddingTop: 5, paddingHorizontal: 5
                }}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => !Map(r1).equals(Map(r2))
                }).cloneWithRows(mainItems)}
                renderRow={({name, thumbnail, type, route}, s, i) => (
                    <TouchableOpacity
                        key={i}
                        style={sty.container}
                    >
                        <View style={sty.rect}>
                            <Image style={{alignSelf: 'stretch', flex: 1}} resizeMode={'center'} source={thumbnail}/>
                        </View>
                        <Text style={sty.text}>{name}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

export default HomePage;
