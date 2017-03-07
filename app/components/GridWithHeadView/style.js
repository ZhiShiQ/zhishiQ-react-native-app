import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {
    width: deviceWidth,
    height: deviceHeight
} = Dimensions.get('window');


export default StyleSheet.create({
    main: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
    },
    sectionContainer: {
        marginVertical: 7,
        alignItems: 'center',
        // height: 120
    },
    sectionText: {
        color: '#848484',
        fontSize: 14
    },
    gridContainer: {
        shadowColor: '#CCC',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',
        backgroundColor: 'rgba(255,255,255,0.8)',
        margin: 6,
        width: deviceWidth/2 - 20,
        padding: 5,
        height: 100
    },
    gridText: {

    },

    contentContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
