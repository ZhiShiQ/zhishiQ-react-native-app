/**
 * Created by moyu on 2017/4/11.
 */
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the README...just some common use cases shown here
var imgPickerOptions = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从文件中选择',
    quality: 1.0,
    allowsEditing: false,
    permissionDenied: {
        title: 'Permission denied',
        text: 'To be able to take pictures with your camera and choose images from your library.',
        reTryTitle: 're-try',
        okTitle: 'I\'m sure',
    },
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

var options = {
    title: null,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: null,//'Take Photo…',
    chooseFromLibraryButtonTitle: null,//Choose from Library…',
    quality: 1.0,
    allowsEditing: false,
    permissionDenied: {
        title: 'Permission denied',
        text: 'To be able to take pictures with your camera and choose images from your library.',
        reTryTitle: 're-try',
        okTitle: 'I\'m sure',
    },
    customButtons: [
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default function pick (opts) {
    const customButtons = opts.customButtons.map((x, i) => ({name: i, title: x.title}))
    console.info(customButtons);
    ImagePicker.showImagePicker({...options, ...opts,
        customButtons
    }, (response) => {
        console.info(response);
        if (response.didCancel) {
            return opts.onClose && opts.onClose();
        }
        else if (response.error) {
            return opts.onError && opts.onError(response.error);
        }
        else if (response.customButton != null) {
            const btn = opts.customButtons[response.customButton]
            console.info('User tapped custom button: ', btn);
            btn.onPress && btn.onPress(btn, response.customButton);
            return opts.onClose && opts.onClose();
        }
        else {

            // let source = { uri: response.uri };
            // resolve(source);

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            // this.setState({
            //     avatarSource: source
            // });
        }
    });
}


export function pickImage (options) {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker({...imgPickerOptions, ...options}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                reject(response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                resolve(source);

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source
                // });
            }
        });
    })
}
