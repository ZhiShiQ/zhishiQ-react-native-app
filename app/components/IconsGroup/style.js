import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        height: 62,
        backgroundColor: '#fff',
        flex: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        color: '#4A4A4A'
    }
});