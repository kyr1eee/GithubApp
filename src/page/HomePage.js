import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';
export default class HomePage extends Component{
  tabNavigator() {
    return createBottomTabNavigator({
        PopularPage: {
            screen: PopularPage,
            navigationOptions: {
                tabBarLabel: '热门',
                tabBarIcon: () => (
                    <Image 
                      source={require('../image/hot.png')}
                      style={styles.icon}
                    />
                )
            }
        },
        TrendingPage: {
            screen: TrendingPage,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: () => (
                    <Image 
                      source={require('../image/trending.png')}
                      style={styles.icon}
                    />
                )
            }
        },
        FavoritePage: {
            screen: FavoritePage,
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: () => (
                    <Image 
                      source={require('../image/stars.png')}
                      style={styles.icon}
                    />
                )
            }
        },
        MyPage: {
            screen: MyPage,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: () => (
                    <Image 
                      source={require('../image/me.png')}
                      style={styles.icon}
                    />
                )
            }
        }
    });
  }

  render() {
    const Tab = this.tabNavigator();
    return <Tab />;
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
  },
  icon: {
    width: 26,
    height: 26
  }
});