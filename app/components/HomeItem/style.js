import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant'

export default StyleSheet.create({
    container: {
        // padding: PADDING_SIZE,
        paddingVertical: PADDING_SIZE,
        backgroundColor: '#FFF',
    },
    main: {
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#4a4a4a',
        marginBottom: 6,
    },
    content: {
        marginTop: 2,
        fontSize: 13.5,
        color: '#848484',
        marginBottom: 10,
    },
    bottomTextContainer: {
        color: '#848484',
        fontSize: 13.5
    },
    bottomText: {
    }
});
