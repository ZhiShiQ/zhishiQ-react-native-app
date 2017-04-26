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
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    titleText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#4A4A4A',
        flex: 1,

    },
    mainInnerContainer: {
        // flex: 2,
        // minHeight: 70,
        flexDirection: 'row',
        padding: 6,
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f7'
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
        marginTop: 4,
    },
    contentText: {
        justifyContent: 'flex-start',
        fontSize: 13,
        marginRight: 10,
        color: '#848484'
    },
    footContainer: {
        // flex: 2,
        marginVertical: 7,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    footerLeft: {
        flex: 1
    },
    promptText: {
        fontSize: 13.6,
        color: '#848484',
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4A4A4A'
    },
    countText: {
        color: '#848484',
        fontSize: 13.6
    },
    stateText: {
        // flex: 1,
        textAlign: 'right'
    },
    footerRight: {
        flex: 0,
        marginLeft: 10
    },
    bottomContainer: {
        paddingHorizontal: 15,
        marginVertical: 3,
        marginBottom: 1,
        alignItems: 'flex-end'
    },
    btnText: {
        fontSize: 12.4,
    }
});
