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
        paddingVertical: PADDING_SIZE,
        paddingHorizontal: PADDING_SIZE,
    },
    sender: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        // height: 49,
        paddingVertical: 10,
        paddingHorizontal: PADDING_SIZE
    },
    input: {
        backgroundColor: '#f7f7f7',
        flex: 1,
        justifyContent: 'center',
        fontSize: 16,
        paddingHorizontal: 18,
        // paddingVertical: 8,
        height: 34,
        // alignSelf: 'center',
        paddingTop: 3,
        borderRadius: 20,
        borderColor: '#e5e5e5',
        borderWidth: .5
    },
    btn: {
        borderRadius: 14,
        height: 28,
        width: 28,
        flex: 0,
        borderColor: '#4a4a4a',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
