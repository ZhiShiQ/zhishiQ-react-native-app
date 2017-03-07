import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7'
    },
    bottomBar: {
        // position: 'absolute',
        // bottom: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    ctl: {
        flex: 0,
        width: 132,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ctlText: {
        fontSize: 16,
        color: '#4A4A4A',
        marginLeft: 5
    },
    info: {
        flex: 1,
        paddingVertical: 5,
        alignSelf: 'stretch',
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end'
    },
    sum: {
        fontWeight: '600',
        fontSize: 14
    },
    save: {
        fontSize: 13
    },
    done: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 0,
        width: 120,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center'
    },
    doneText: {
        fontSize: 15,
    }
});
