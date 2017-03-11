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
        width: SWIPE_BLOCK_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    delBtn: {
        backgroundColor: '#db4949'
    }
});
