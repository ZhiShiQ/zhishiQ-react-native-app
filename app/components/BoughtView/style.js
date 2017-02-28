import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        // minHeight: 182,
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
        // flex: 2,
        // minHeight: 70,
        flexDirection: 'row',
        padding: 6,
        backgroundColor: '#F7F7F7'
    },
    imageContainer: {
        marginRight: 6,
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
        // flex: 2,
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
        fontWeight: '600',
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
        // flex: 1,
        marginRight: 10
    },
    bottomContainer: {
        alignItems: 'flex-end'
    },
    btnText: {
        // backgroundColor: 'blue'
    }
});