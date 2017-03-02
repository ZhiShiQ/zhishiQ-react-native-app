import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        justifyContent: 'center',
        backgroundColor: '#F7F7F7'
    },
    menus: {
        backgroundColor: '#F7F7F7',
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    submenu: {
        flex: 1
    }
});
