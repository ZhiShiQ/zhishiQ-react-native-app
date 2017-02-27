import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        minHeight: 118,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 0,
        width: 48,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    leftControl: {
        width: 20,
        height: 20
    },
    mainContainer: {
        // alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        marginVertical: 6,
    },
    mainTitleContainer: {
        // flex: 1,
        // marginVertical: 4,
    },
    titleText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#4A4A4A',
    },
    mainInnerContainer: {
        // flex: 2,
        minHeight: 48,
        flexDirection: 'row',
        marginVertical: 6,
        alignItems: 'flex-start'
    },
    imageContainer: {
        marginRight: 6,
    },
    image: {
        backgroundColor: '#D8D8D8',
        height: 44,
        width: 44,
    },
    contentContainer: {
        flex: 1
    },
    contentText: {
        justifyContent: 'flex-start',
        fontSize: 13,
        marginRight: 10,
        color: '#848484'
    },
    horizontal: {
        height: 1,
        marginBottom: 8,
        backgroundColor: '#C4C4C4'
    },
    footContainer: {
        flex: 2,
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
    footerRight: {
        // flex: 1,
        marginRight: 10
    }
});