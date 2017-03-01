import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {SWIPE_BLOCK_WIDTH} from '../../constant';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F700'
    },
    delBtn: {
        backgroundColor: '#f5f5f5'
    }
});
