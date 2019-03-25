import React, { Component } from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import DataStore from '../common/data/DataStore';
class asyncStoreDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        };
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次加载数据时间${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData
                })
            }).catch(e => {
                console.error(e);
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>离线缓存框架测试</Text>
                <TextInput onChangeText={text => this.searchKey = text} />
                <Text onPress={() => this.loadData()}>加载数据</Text>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
});
export default asyncStoreDemoPage;