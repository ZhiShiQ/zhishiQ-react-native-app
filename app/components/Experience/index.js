import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import autobind from 'autobind-decorator';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    ListView,
    Image,
    ScrollView,
    Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import sty from './style';


@autobind
class Experience extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(newProps) {}
    shouldComponentUpdate(newProps, newState, newContext) {
      return !Map(this.props).equals(Map(newProps))
    }
    componentWillUpdate(newProps, newState, newContext) {}
    componentDidUpdate(oldProps, oldState, oldContext) {}
    componentWillUnmount() {}
    static defaultProps = {}
    state = {}
    static propTypes = {
        title: PropTypes.string,
        organization: PropTypes.string,
        date_from: PropTypes.string,
        date_to: PropTypes.string,
        words: PropTypes.oneOfType(PropTypes.array, PropTypes.string),
        thumbnail: PropTypes.object,
        style: PropTypes.object,
        noPoint: PropTypes.bool
    }
    render() {
        let {title, organization, noPoint, thumbnail, date_from, date_to, style, words = []} = this.props;
        if (!Array.isArray(words)) {
            words = !!words ? [words] : null;
            noPoint = true;
        }


        return (
            <View style={[{paddingTop: 15, paddingBottom: 15, justifyContent: 'flex-start'}, style]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        {title && <Text style={{
                            marginVertical: 3,
                            fontSize: 14,
                            lineHeight: 18,
                            fontWeight: 'bold',
                            color: '#4a4a4a'
                        }}>{title}</Text>}

                        {(organization || date_from) && <Text style={{color: '#4a4a4a', marginBottom: 8}}>
                            {organization ? organization+(date_from?'｜':''): ''}
                            {date_from}{date_to ? (' ~ '+date_to) : ''}
                        </Text>}
                    </View>
                    {thumbnail &&
                        <View style={{flex: 0, alignItems: 'flex-end', marginRight: 6,}}>
                            <Image source={thumbnail} style={{width: 40, height: 40, borderRadius: 5, backgroundColor: '#fff'}}/>
                        </View>
                    }
                </View>

                {words && words.map((w, i, a) =>
                    <Text style={{color: '#848484', lineHeight: 17, flex: 0, fontSize: 14}} key={i}>
                        {noPoint?'':'• '}{w.trim()}
                    </Text>
                )}
            </View>
        )
    }
}

export default Experience;
