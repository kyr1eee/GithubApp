import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
class PopularTab extends Component {
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
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
});

export default PopularTab;