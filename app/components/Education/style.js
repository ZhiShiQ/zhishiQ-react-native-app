import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    mainContainer: {
        paddingBottom: 14,
        paddingTop: 14,
    },
    mainTitleContainer: {
        marginVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row',
    },
    titleText: {
        fontWeight: '700',
        fontSize: 14,
        color: '#4A4A4A',
        flex: 1,
    },
    mainInnerContainer: {
        flexDirection: 'row',
        // padding: 6,
    },
    imageContainer: {
        marginRight: 6,
        alignItems: 'flex-end',
    },
    image: {
        backgroundColor: '#D8D8D8',
        height: 38,
        width: 38,
    },
    contentContainer: {
        // flex: 1
    },
    contentText: {
        justifyContent: 'flex-start',
        fontSize: 13,
        marginRight: 10,
        color: '#848484'
    },

    thrText: {
        // flex: 1,
        color: '#848484',
        fontSize: 13.5,
    },
    secText: {
        marginVertical: 2,
        flex: 1,
        color: '#4a4a4a',
        fontSize: 14,
    },
    footerRight: {
        marginRight: 12
    },
    bottomContainer: {
        alignItems: 'flex-end'
    },
    btnText: {
        // backgroundColor: 'blue'
    }
});
