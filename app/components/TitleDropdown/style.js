import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
import {PADDING_SIZE, NAV_BAR_HEIGHT} from '../../constant';

export default StyleSheet.create({
    style: {
        height: 20,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        color: '#0a0a0a',
        top: 4
    },
    dropdown: {
        alignSelf: 'stretch', width: deviceWidth,
        height: deviceHeight
    }
});
