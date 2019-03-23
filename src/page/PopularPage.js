import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import PopularTab from '../components/PopularTab';
export default class PopularPage extends Component{
  render() {
    const TabNavigator = createMaterialTopTabNavigator({
        PopularTab1: {
            screen: PopularTab,
            navigationOptions: {
                title: 'Tab1'
            }
        },
        PopularTab2: {
            screen: PopularTab,
            navigationOptions: {
                title: 'Tab2'
            }
        },
    });
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});