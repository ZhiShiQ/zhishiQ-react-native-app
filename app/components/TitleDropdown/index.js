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
import CustomDropDown from "../CustomDropDown";


@autobind
class TitleDropdown extends Component {
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
        showTitleIcon: false
    }
    state = {}
    static propTypes = {
        options: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onSelect: PropTypes.func,
        selectedIndex: PropTypes.number,
        showTitleIcon: PropTypes.bool,
        style: PropTypes.object
    }
    hideDropDown() {
        this.dropdown.hide();
    }
    showDropDown() {
        this.dropdown.show();
    }
    render() {
        const {options, title, showTitleIcon, onSelect, style, selectedIndex, ...rest} = this.props
        return (
            <ModalDropdown
                ref={r => this.dropdown = r}
                options={options}
                onSelect={onSelect}
                adjustFrame={(p) => ({...p, left: 0, top: NAV_BAR_HEIGHT})}
                style={[sty.style, style]}
                dropdownStyle={sty.dropdown}
                renderRow={this._renderRow}
                renderSeparator={(s, i, h) =>
                    i!=options.length-1 && <Hr color="#EEE" style={{marginHorizontal: PADDING_SIZE}} marginBottom={0} />
                }
                textStyle={sty.title}
                defaultIndex={selectedIndex}
                {...rest}
                defaultValue={title}
            >
                <View>
                <Text style={[sty.title, {textAlign: 'center'}]}>
                    {title+(showTitleIcon?" ":"")}
                    {showTitleIcon && <Icon name="check" size={12}/>}
                </Text>
                </View>
            </ModalDropdown>
        )
    }
    rendercus() {
        const {options, title, onSelect, selectedIndex, ...rest} = this.props
    }

    _renderRow(rowData, sID, rID) {
        const {selectedIndex} = this.props;
        sID = parseInt(sID);
        return (
            <View key={sID} >
                <LinkItem
                    onPress={() => {
                        rowData.onPress && rowData.onPress(sID, rowData.title);
                    }}
                    leftText={typeof rowData === 'string' ? rowData : rowData.title} showBorder={null}
                    showIcon={selectedIndex == sID}
                    iconName="check"
                />
            </View>
        )
    }
}

export default TitleDropdown;
