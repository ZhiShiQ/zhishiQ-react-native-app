import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant'

export default StyleSheet.create({
    main: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F7F7F7'
    },
    container: {
        paddingHorizontal: PADDING_SIZE,
        backgroundColor: '#fff'
    },
    menus: {
        backgroundColor: '#FFF',
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
        // position: 'absolute',

    },
    submenu: {
        // flex: 1
    }
});
