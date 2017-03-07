import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 1000,
        backgroundColor: '#F7F7F7'
    },
    btn: {
        // alignItems: 'stretch',
        // alignSelf: 'stretch'
    },
    modal: {
        flexGrow: 1,
        position: 'absolute',
        top: 30,
        backgroundColor: 'rgba(0,0,0,.5)',
        // opacity: .1,
        height: height
        // bottom: 0,
    },
    text: {
        fontSize: 13.5,
        paddingHorizontal: 24,
        paddingTop: 6,
        paddingBottom: 10,
        color: '#4a4a4a'
    },
    dropdown: {
        backgroundColor: '#FFF'
        // position: 'absolute',

        // h

    }
});
