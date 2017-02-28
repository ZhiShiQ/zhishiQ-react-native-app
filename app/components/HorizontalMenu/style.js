import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        backgroundColor: '#F7F7F7',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    rowContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginHorizontal: 18,
        paddingVertical: 8
    },
    rowText: {
        fontSize: 14,
        color: '#4A4A4A'
    },
    active: {
        borderBottomColor: '#4A4A4A'
    }
});