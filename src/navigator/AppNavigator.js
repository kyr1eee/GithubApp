import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';
import AsyncStoreDemoPage from '../test/asyncStoreDemoPage';
export const rootCom = 'Init';  // 设置根路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,
        }
    }
});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // header: null,
        }
    },
    AsyncStoreDemoPage: {
        screen: AsyncStoreDemoPage,
        navigationOptions: {
            header: null
        }
    }
});

export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {navigationOptions: {
    header: null,
}});

/**
 * 1. 初始化react-navigation 与 redux中间件,为了reduxifyNavigator的key设置actionSubscribers
 * 设置订阅者: https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在: https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
*/
export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
)

/**
 * 2.将根导航器组件传递给reduxifyNavigator函数,并返回一个将navigation state 和 dispatch 函数作为props的新组件
 * @NavigationState
 * index: number;
 * routes: NavigationRoute[];
 * isTransitioning: boolean;
 * key: string;
 * params: NavigationParams;
 */

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
 *  3. State 到 Props 的映射关系
 */
const mapStateToProps = state => ({
    state: state.nav    //v2
});

/**
 * 4.连接 React组件 与 Redux Store
 * 
 */
export default connect(mapStateToProps)(AppWithNavigationState);