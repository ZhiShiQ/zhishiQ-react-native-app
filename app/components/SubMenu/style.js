import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    rowContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginHorizontal: 18,
        paddingVertical: 10,
    },
    rowText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#4A4A4A'
    },
    active: {
        color: "#EA5502",
        borderBottomColor: '#EA5502'
    }
});
