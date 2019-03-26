import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import action from '../action/index';
import PopularTab from '../components/PopularTab';
export default class PopularPage extends Component{
  constructor(props) {
    super(props);
    this.tabNames = ['JavaScript', 'React', 'Vue', 'TypeScript', 'React Native', 'Java']
  }

  generateTab() {
      const tabs = {};
      this.tabNames.forEach((item, index) => {
        tabs[`tab${index}`] = {
            // 切换Tab传递参数进组件
            screen: props => <PopularTab {...this.props} tabLabel={item}/>,
            navigationOptions: {
                title: item,
            },
        }
      });
      return tabs;
  }

  render() {
    const TabNavigator = createMaterialTopTabNavigator(
        this.generateTab(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,  // 是否标签为大写, 默认true
                scrollEnabled: true,    // 是否支持选项卡滚动, 默认false
                style: {
                    backgroundColor: '#ea6f5a'  // 背景颜色
                },
                indicatorStyle: styles.indicatorStyle,  // 标签指示器样式
                labelStyle: styles.labelStyle,  // 文字样式
            }
        }
    );
    return (
        <View style={styles.container}>
            <TabNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
      minWidth: 50
  },
  indicatorStyle: {
      height: 2,
      backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 16
  }
});