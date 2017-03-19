import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const rectSize = 56.5; //(width - 5*30)/4;


export default StyleSheet.create({
    main: {
        // alignItems: 'center',
    },

    container: {
        width: rectSize+15*2,
        height: rectSize+15*2,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rect: {
        width: rectSize,
        height: rectSize,
        // flex: 1,
        borderRadius: rectSize/2,
        backgroundColor: '#ccc',
    },
    text: {
        marginTop: 10,
        color: '#4a4a4a'
    },
    horText: {
        marginTop: 4,
        fontSize: 13,
        color: '#848484'
    }
});
