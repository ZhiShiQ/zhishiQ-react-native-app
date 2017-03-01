import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    mainContainer: {
        paddingVertical: 6,
    },
    mainTitleContainer: {
        marginVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row'
    },
    titleText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#4A4A4A',
        flex: 1,
    },
    mainInnerContainer: {
        flexDirection: 'row',
        padding: 6,
    },
    tags: {
        flexDirection: 'row',
    },
    imageContainer: {
        marginRight: 6,
        alignItems: 'flex-end',
    },
    image: {
        backgroundColor: '#D8D8D8',
        height: 50,
        width: 50,
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

    footContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    footerLeft: {
        flex: 1
    },
    promptText: {
        fontSize: 12.6,
        color: '#4A4A4A',
    },
    priceText: {
        fontSize: 14,
        color: '#4A4A4A'
    },
    countText: {

    },
    stateText: {
        flex: 1,
        textAlign: 'right'
    },
    footerRight: {
        textAlign: 'right',
        marginRight: 12
    },
    bottomContainer: {
        alignItems: 'flex-end'
    },
    btnText: {
        // backgroundColor: 'blue'
    }
});
