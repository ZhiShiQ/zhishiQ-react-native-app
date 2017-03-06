import {
    StyleSheet
} from 'react-native';

import {PADDING_SIZE} from '../../constant';

export default StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    top: {
        height: 20
    },

    marginTop: {marginTop: 10},
    text: {fontSize: 14, color: '#848484', marginLeft: PADDING_SIZE}
});
