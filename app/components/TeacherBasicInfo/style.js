import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant';

export default StyleSheet.create({
    main: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: PADDING_SIZE,
        paddingVertical: 20
    },
    name: {
        color: '#4A4A4A',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 25,
        marginBottom: 3,
    },
    content: {
        lineHeight: 16,
        fontSize: 14,
        color: '#848484',
        textAlign: 'center',
        marginBottom: 10
    },
    tag: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    tip: {
        fontSize: 12,
        color: '#848484',
        fontWeight: 'normal'
    }
});
