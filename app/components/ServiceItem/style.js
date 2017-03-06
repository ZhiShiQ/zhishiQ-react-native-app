import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant'

export default StyleSheet.create({
    main: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        paddingHorizontal: PADDING_SIZE
    },
    mainContainer: {
        paddingVertical: 12,
    },
    mainTitleContainer: {
        marginVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#4A4A4A',
        flex: 1,
        marginBottom: 4,
    },
    mainInnerContainer: {
        flexDirection: 'row',
        // padding: 6,
    },
    tags: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 6,
    },
    imageContainer: {
        marginRight: 6,
        alignItems: 'flex-end',
    },
    image: {
        backgroundColor: '#D8D8D8',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 6
    },
    contentText: {
        justifyContent: 'flex-start',
        fontSize: 13,
        marginRight: 10,
        color: '#848484'
    },

    footContainer: {
        // alignSelf: 'stretch',
        flexDirection: 'row'
    },
    footerLeft: {
        flex: 1,
        flexDirection: 'row'
    },
    promptText: {
        fontSize: 12.6,
        color: '#4A4A4A',
    },
    priceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A4A4A'
    },
    countText: {
        marginRight: 8
    },
    stateText: {
        flex: 1,
        textAlign: 'right'
    },
    footerRight: {
        flex: 1,
        // alignSelf: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 12
    },
    bottomContainer: {
        alignItems: 'flex-end'
    },
    btnText: {
        // backgroundColor: 'blue'
    }
});
