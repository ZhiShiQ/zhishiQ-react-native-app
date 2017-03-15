import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        // height: 52,
        flex: 0,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        // alignSelf: 'stretch'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    left: {
        flex: 1
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    rightIcon: {
        marginLeft: 6
    },
    rightText: {
        color: '#4a4a4a'
    },
    hr: {
        marginBottom: 0,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 15
    }
});
