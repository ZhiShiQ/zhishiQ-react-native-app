import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        paddingHorizontal:35
    },
    avatar:{
        width:160,
        height:160,
        backgroundColor:'#1097ec',
        opacity:0.2,
        borderRadius:80,
        marginBottom:20,
        marginTop:40
    },
    mainText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#4a4a4a',
        marginBottom:10
    },
    subText:{
        fontSize:16,
        color:'#4a4a4a',
        marginBottom:30
    },
    tips:{
        fontSize:14,
        color:'#848484',
        marginBottom:20,
        textAlign:'center'
    }
});
