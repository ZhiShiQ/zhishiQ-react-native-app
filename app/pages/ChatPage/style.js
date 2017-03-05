import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

import {PADDING_SIZE} from '../../constant';

export default StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    chats: {
        // flex: 1,
        padding: PADDING_SIZE,
    },
    sender: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#D8D8D8',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        height: 46,
        paddingVertical: 9,
        paddingHorizontal: PADDING_SIZE
    },
    input: {
        backgroundColor: '#fff',
        flex: 1,
        // height: 30,
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
    },
    btn: {
        borderRadius: 20,
        height: 25,
        width: 25,
        flex: 0,
        backgroundColor: '#fff',
    }
});
