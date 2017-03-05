import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
export const IMGSIZE = 40;
export const BGCLR = "#D8D8D8";

export default StyleSheet.create({
    message: {
        marginBottom: 15
    },
    otherContentContainer: {
        marginLeft: 12,
        maxWidth: width-(2*IMGSIZE)-50,
    },
    otherContent: {
        backgroundColor: BGCLR,
        borderRadius: 8,
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
        backgroundColor: BGCLR,
        borderRadius: 8,
        // borderColor: '#fff',
        overflow: 'hidden',

        // textAlign: 'right',
        paddingHorizontal: 8,
        paddingVertical: 12,
        fontSize: 15,
        color: '#4A4A4A',
    }
});
