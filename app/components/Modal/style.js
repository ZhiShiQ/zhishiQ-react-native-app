import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    btnModal: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },
    btn: {
        margin: 10,
        color: "#000",
        padding: 10
    },
    wrap: {
        position: 'absolute',
        flex: 1,
        paddingTop: 20,
    }
});
