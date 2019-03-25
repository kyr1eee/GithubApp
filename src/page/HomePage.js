import React, {Component} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
class HomePage extends Component{
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('props:', this.props);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  /**
   * 处理 Android 的物理返回键
   */
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    // nav.routes[1] 为 MainNavigator, index为0则不处理
    if(nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    // 存储外层路由,用于多层navigator嵌套
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
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

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(HomePage);