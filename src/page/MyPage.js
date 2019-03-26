import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

export default class MyPage extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>me</Text>
        <Text>{tabLabel}</Text>
        {/* HomePage Navigator中的PopularPage中的topNavigator无法跳转至与HomePage同层的DetailPage, 因为存在多重Navigator,
        因此在HomePage处缓存this.props.navigation于NavigationUtil.navigation中 */}
        <Text onPress={() => NavigationUtil.turnToPage(
            {navigation: this.props.navigation},
            'DetailPage'
        )}>跳转详情页</Text>
        <Text onPress={() => NavigationUtil.turnToPage(
            {navigation: this.props.navigation},
            'AsyncStoreDemoPage'
        )}>跳转离线缓存测试页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});