import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant'

export default StyleSheet.create({
    main: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: PADDING_SIZE,
    },
    input: {
        flex: 2,
        // paddingLeft: 14.5,
        fontSize: 15,
    },
    label: {
        // paddingLeft: 14.5,
        fontSize: 15,
        color: '#4A4A4A',
        flex: 0,
        width: 80-PADDING_SIZE,
        textAlign: 'left'
    },
    rBtn: {
        flex: 0,
        // maxWidth: 100,
        // paddingRight: 14,
    },
    rText: {
        fontSize: 16,
        color: '#4A4A4A',
    }
});
