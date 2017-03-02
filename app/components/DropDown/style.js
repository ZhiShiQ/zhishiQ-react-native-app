import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {PADDING_SIZE, NAV_BAR_HEIGHT} from '../../constant';

export default StyleSheet.create({
    style: {
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 6,
        // paddingBottom: 7,

        flex: 1,
    },
    hidden: {
        width: 0,
        zIndex: 100,
        height: 0,
        overflow: 'hidden'
    },
    title: {
        fontSize: 13.5,
        color: '#4A4A4A',
        paddingTop: 6,
        paddingBottom: 10,
        paddingHorizontal: 24
    },
    dropdown: {
        // height: 10,
        // alignItems: 'center',
        // width: deviceWidth,
        height: deviceHeight,
    }
});
