import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});


export default class extends React.Component {
    render(){
        const title = this.props.title || 'No Title';
        const data = this.props.data || 'No Data';
        return (
            <View style={[styles.container, this.props.style]}>
                <Text>Login page 1</Text>
                <Text>Title: {title}</Text>
                <Text>Data: {data}</Text>
                <Button onPress={() => Actions.loginModal2({ data:"Custom data2", title:"Custom title2" })}>Login 2</Button>
                <Button onPress={() => Actions.refresh({title:"Changed title"})}>Change title</Button>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}
