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
    Dimensions,
    ListView,
    ScrollView,
    Button
} from 'react-native';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import {PADDING_SIZE, NAV_BAR_HEIGHT, DURATION} from '../../constant';
import sty from './style';
import LinkItem from '../LinkItem'
import Hr from '../Hr'
import Icon from 'react-native-vector-icons/FontAwesome';


AnimatableListView = Animatable.createAnimatableComponent(ListView);


@autobind
class CustomDropDown extends Component {
    constructor(props) {
        super(props)
    }

    _mapPropsState(props = this.props) {
        this.setState({
            title: props.title,
            selectedIndex: props.selectedIndex
        })
    }


    componentWillMount() {
        this._mapPropsState();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
        this._mapPropsState(newProps);
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps)) || !Map(this.state).equals(Map(newState))
    }

    componentWillUpdate(newProps, newState, newContext) {
        const animate = (height) => {
            if (newState.showDropdown)
                this._modal.transitionTo({opacity: 1, height: height})
            else {
                // this.setState({_hiddenModal: true})
                // this._modal.transitionTo({opacity: 0})
            }
        }
        const {modalStyle, getModalStyle} = this.props;
        if (newState.showDropdown !== this.state.showDropdown) {
            // const flattedStyle =  StyleSheet.flatten([modalStyle, getModalStyle && getModalStyle(this._btnLayout)])
            // animate(flattedStyle.height || deviceHeight-(this._btnLayout.height+this._btnLayout.y));
        }
    }

    componentDidUpdate(oldProps, oldState, oldContext) {
        const {onHidden, onShow, duration, onShowOrHide} = this.props;
        if (this.state.showDropdown != oldState.showDropdown) {

            if (this.state.showDropdown) {
                this.setState({__noModal: false});
                onShow && onShow();
                onShowOrHide && onShowOrHide(true);
            } else {
                setTimeout(() => {
                    this.setState({__noModal: true}, () => {
                        onHidden && onHidden();
                        onShowOrHide && onShowOrHide(false);
                    });
                }, duration>>1)
            }
        }
    }

    componentWillUnmount() {
    }

    static defaultProps = {
        dynamicTitle: true,
        itemTextKey: 'title',
        selectedStyle: {},
        modalStyle: {},
        icon: <Icon name="caret-down" size={12}/>,
        showIcon: true,
        duration: DURATION,
        selectedIndex: 0,
        hideBackground: false
    }
    state = {
        title: "",
        selectedIndex: 0,
        showDropdown: false,
    }
    static propTypes = {
        title: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
        items: PropTypes.array,
        dynamicTitle: PropTypes.bool,
        selectedIndex: PropTypes.number,
        selectedStyle: PropTypes.object,
        textStyle: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
        itemTextKey: PropTypes.string,
        modalStyle: PropTypes.object,
        getModalStyle: PropTypes.func,
        renderSeparator: PropTypes.func,
        icon: PropTypes.element,
        showIcon: PropTypes.bool,
        autoHidden: PropTypes.bool,
        withoutTitle: PropTypes.bool,
        onPress: PropTypes.func,
        onHidden: PropTypes.func,
        zIndex: PropTypes.number,
        onShow: PropTypes.func,
        onShowOrHide: PropTypes.func,
        duration: PropTypes.number,
        hideBackground: PropTypes.bool,
    }

    get btnLayout() {
        return this._btnLayout;
    }

    show() {
        this.setState({showDropdown: true});
    }

    hide() {
        this.setState({showDropdown: false});
    }

    renderDropDown() {
        const {modalStyle, getModalStyle, duration} = this.props;
        const {showDropdown, __noModal} = this.state;
        if (showDropdown/*!__noModal*/ && this._btnLayout) {
            const {items} = this.props;
            return (
                <Animatable.View
                    ref={r => this._modal = r}
                    animation={showDropdown ? "fadeIn": "fadeOut"}
                    duration={duration}
                    style={[
                        sty.modal, {top: this._btnLayout.height}, modalStyle,
                        getModalStyle && getModalStyle(this._btnLayout),
                    ]}
                >
                    {this._renderSeparator(null, -1)}
                    <ListView
                        contentContainerStyle={[sty.dropdown]}
                        dataSource={
                            new ListView.DataSource({
                                rowHasChanged: (a, b) => !Map(a).equals(Map(b))
                            }).cloneWithRows(items)
                        }
                        renderRow={(data, s, i) => this._renderRow(data, i)}
                        renderSeparator={(data, s, i) => this._renderSeparator(data, i)}
                    />
                </Animatable.View>
            )
        }
    }

    _renderRow(data, i) {
        const {onPress, ...rest} = data;
        const {selectedStyle, itemTextKey, autoHidden, showIcon} = this.props;
        const {selectedIndex} = this.state;
        if (React.isValidElement(data)) {
            return (
                <View key={i}>
                    {data}
                </View>
            )
        }
        return (
            <LinkItem
                key={i}
                rightStyle={{flex: 0}}
                style={selectedIndex == i ? selectedStyle : {}}
                onPress={() => {
                    this._itemPress(rest, i);
                    onPress && onPress(rest, i);
                }}
                leftText={rest[itemTextKey]}
                showIcon={showIcon && selectedIndex == i}
                iconName="check"
                {...rest}
            />
        )
    }

    _renderSeparator(data, i) {
        if (i < 0) {
            return <Hr marginBottom={0}/>
        }
        const {renderSeparator} = this.props;
        return renderSeparator ? renderSeparator(data, i) :
            <Hr color="#EEE" style={{marginHorizontal: PADDING_SIZE}} marginBottom={0}/>
    }

    render() {
        const {textStyle, icon, withoutTitle, containerStyle, hideBackground, zIndex, style} = this.props;
        const {title} = this.state;

        if (withoutTitle) {
            return (
                <View style={[zIndex!=null&&{zIndex}]}>
                    {this.renderDropDown()}
                </View>
            )
        }
        return (
            <View style={[{flex: 1}, zIndex!=null&&{zIndex}, containerStyle]}
                  onLayout={(e) => this._btnLayout = e.nativeEvent.layout}
            >
                <TouchableOpacity
                    style={[sty.main, {flexDirection: 'row',
                        paddingHorizontal: 4, paddingTop: 6,
                        paddingBottom: 10, flex: 0,
                        justifyContent: 'center', alignItems: 'center'
                    }, style]}
                    onPress={this._btnPress}>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={[sty.text, {paddingLeft: 4, }, textStyle]}>
                            {title+''+(icon?' ':'')}
                        </Text>
                        <Text style={textStyle}>
                            {icon}
                        </Text>
                </TouchableOpacity>
                {this.renderDropDown()}
            </View>
        )
    }

    _itemPress(rest, i) {
        const {dynamicTitle, itemTextKey, autoHidden} = this.props;
        if (dynamicTitle) {
            this.setState({title: rest[itemTextKey]})
        }
        this.setState({selectedIndex: i});

        (autoHidden || rest.autoHidden) && setTimeout(()=>this.hide(), 100);
    }

    _btnPress() {
        const {onPress} = this.props;
        const {showDropdown} = this.state;
        this.setState(
            {showDropdown: !showDropdown},
            ()=> onPress && onPress(!showDropdown)
        );
    }

}

export default CustomDropDown;
