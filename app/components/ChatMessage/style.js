import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
export const IMGSIZE = 40;
export const SELF_BGCLR = "#fc6d34";
export const OTHER_BGCLR = "#fff";
export const MAX_WIDTH = width - (2 * IMGSIZE) - 50;
export default StyleSheet.create({
    message: {
        marginBottom: 15
    },
    main: {},
    textContentContainer: {
        alignItems:'center',
        marginBottom:16,
        marginTop:9
    },
    textContent: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        backgroundColor:'#e5e5e5',
        borderRadius:2,
        paddingVertical:3,
        paddingHorizontal:8,
        overflow:'hidden'
    },
    otherContentContainer: {
        marginLeft: 12,
        maxWidth: MAX_WIDTH,
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
        maxWidth: MAX_WIDTH,
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
