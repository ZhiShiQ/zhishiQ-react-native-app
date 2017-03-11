import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
export const IMGSIZE = 40;
export const SELF_BGCLR = "#fc6d34";
export const OTHER_BGCLR = "#fff";

export default StyleSheet.create({
    message: {
        marginBottom: 15
    },
    main: {

    },
    otherContentContainer: {
        marginLeft: 12,
        maxWidth: width-(2*IMGSIZE)-50,
    },
    otherContent: {
        backgroundColor: OTHER_BGCLR,
        borderRadius: 5,
        // borderColor: '#fff',
        overflow: 'hidden',

        padding: 8,
        fontSize: 15,
        color: '#4A4A4A',
    },

    selfContentContainer: {
        marginRight: 12,
        maxWidth: width-(2*IMGSIZE)-50,
    },
    selfContent: {
        backgroundColor: SELF_BGCLR,
        borderRadius: 5,
        overflow: 'hidden',

        paddingHorizontal: 8,
        paddingVertical: 12,
        fontSize: 15,
        color: '#fff',
    }
});
