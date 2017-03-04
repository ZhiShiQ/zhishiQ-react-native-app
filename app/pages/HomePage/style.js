import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const rectSize = (width - 5*20)/4;


export default StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
    },
    rect: {
        width: rectSize,
        height: rectSize,
        borderRadius: 3,
        backgroundColor: '#ccc'
    }
});
