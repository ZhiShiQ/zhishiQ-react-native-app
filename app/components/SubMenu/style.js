import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    rowContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginHorizontal: 18,
        paddingVertical: 8
    },
    rowText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#4A4A4A'
    },
    active: {
        borderBottomColor: '#4A4A4A'
    }
});
