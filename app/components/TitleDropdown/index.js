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
    }
    state = {}
    static propTypes = {
        options: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onSelect: PropTypes.func,
        selectedIndex: PropTypes.number
    }
    render() {
        const {options, title, onSelect, selectedIndex} = this.props

        return (
            <ModalDropdown
                options={options}
                onSelect={onSelect}
                adjustFrame={(p) => ({...p, left: 0, top: NAV_BAR_HEIGHT})}
                style={sty.style}
                dropdownStyle={sty.dropdown}
                renderRow={this._renderRow}
                textStyle={sty.title}
                defaultIndex={selectedIndex}
                /*defaultValue={title}*/
            >
                <Text style={sty.title}>
                    {title}
                    <Icon name="check" size={18}/>
                </Text>
            </ModalDropdown>
        )
    }
    _renderRow(rowData, sID, rID) {
        const {selectedIndex} = this.props;
        return (
            <View>
                <LinkItem
                    leftText={rowData} showBorder={rID!=0?'top':null}
                    showIcon={selectedIndex == sID}
                    iconName="check"
                />
            </View>
        )
    }
}

export default TitleDropdown;
