import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {PADDING_SIZE, NAV_BAR_HEIGHT} from '../../constant';

import sty from './style';

import Hr from '../Hr';
import LinkItem from '../LinkItem';


@autobind
class DropDown extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {}
    componentDidMount() {
        // setTimeout(() => this.dropdown.show(), 1000)
    }
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
        return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    show() {
        this.dropdown.show();
    }

    hide() {
        this.dropdown.hide();
    }
    select(idx) {
        this.dropdown.select(idx);
    }
    static defaultProps = {
        rightHalf: false,
        leftHalf: false,
        hidden: false,
        dropdownStyle: {}
    }
    state = {}
    static propTypes = {
        rightHalf: PropTypes.bool,
        options: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onSelect: PropTypes.func,
        selectedIndex: PropTypes.number,
        height: PropTypes.number,
        dropdownStyle: PropTypes.object,
        hidden: PropTypes.bool,
        leftHalf: PropTypes.bool,
        onPress: PropTypes.func
    }
    render() {
        const {options, onPress, leftHalf, height, hidden, dropdownStyle, rightHalf, title, onSelect, selectedIndex, ...rest} = this.props
        return (
            <ModalDropdown
                ref={r => this.dropdown = r}
                options={options}
                onSelect={onSelect}
                adjustFrame={(p) => {
                    const bound = {...p, left: (rightHalf?deviceWidth/2:0), right: (leftHalf?deviceWidth/2:0)};
                    if (height!=null) {
                        bound.height = height;
                    }
                    this.bound = bound;
                    return bound;
                }}
                style={[sty.style, hidden && sty.hidden]}
                dropdownStyle={[sty.dropdown, dropdownStyle]}
                renderRow={this._renderRow}
                textStyle={sty.title}
                renderSeparator={(s, i, h) =>
                    i!=options.length-1 && <Hr color="#EEE" style={{marginHorizontal: PADDING_SIZE}} marginBottom={0} />
                }
                defaultIndex={selectedIndex}
                {...rest}
            >
                <View>
                    <Text style={sty.title}>
                        {title+' '}
                        <Icon name="caret-down" size={12}/>
                    </Text>
                </View>
            </ModalDropdown>
        )
    }
    _renderRow(rowData, sID, rID) {
        const {selectedIndex, dropdownStyle, options} = this.props;
        sID = parseInt(sID);
        return (
            <View key={sID} >
                <LinkItem
                    onPress={() => {
                        rowData.onPress && rowData.onPress(sID, rowData.title, rowData);
                    }}
                    leftText={typeof rowData === 'string' ? rowData : rowData.title}
                    showBorder={null}
                    showIcon={selectedIndex == sID}
                    style={[dropdownStyle]}
                    iconName="check"
                />
            </View>
        )
    }
}

export default DropDown;
