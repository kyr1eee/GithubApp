import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import NavigationUtil from './NavigationUtil';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabBar from '../components/TabBar';
class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
    }

    tabNavigator() {
        if(this.tabs) {
            // 避免this.props.theme改变导致重新render
            return this.tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = Tabs;
        const dynamicTab = {PopularPage, TrendingPage, FavoritePage}; // 根据需要动态订制tab
        PopularPage.navigationOptions.tabBarLabel = '热门'; // 动态配置Tab属性
        return this.tabs = createBottomTabNavigator(dynamicTab, {
            tabBarComponent: props => {
                // 传递props
                return <TabBar theme={this.props.theme} {...props} />;
            }
        });
    }

    render() {
        const Tab = this.tabNavigator();
        return <Tab />
    }
}
const Tabs = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '热门',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons 
                    name={'whatshot'} 
                    size={26} 
                    color="#bfbfbf" 
                    style={{color: tintColor}} />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons 
                    name={'trending-up'} 
                    size={26} 
                    style={{color: tintColor}} />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons 
                    name={'star'} 
                    size={26} 
                    style={{color: tintColor}} />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons 
                    name={'person'} 
                    size={26} 
                    style={{color: tintColor}} />
            )
        }
    }
};

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
