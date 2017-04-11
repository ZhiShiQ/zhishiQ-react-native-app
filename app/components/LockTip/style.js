import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
const TIP_BGCLR='#4A4A4A';
export default StyleSheet.create({
    lockTipContainer:{
        width:width,
        left: 0,
        top: 26,
        position:'absolute',
        zIndex:30
    },
    lockTipContent:{
        backgroundColor:TIP_BGCLR,
        color:'#fff',
        borderRadius: 2,
        paddingHorizontal:8,
        paddingVertical:7,
        textAlign:'center'
    },
    lockTipTop:{
        position:'absolute',
        top:-14,
        left:width/2,
        color:TIP_BGCLR,
        backgroundColor:'transparent'
    }
});
