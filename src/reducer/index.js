import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import {rootCom, RootNavigator} from '../navigator/AppNavigator';

/**
 * 1. 指定默认state
 */
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2. 创建自己的 navigation reducer
 * 
 * @nextState
 * index: number;
 * routes: NavigationRoute[];
 * isTransitioning: boolean;
 * key: string;
 * params: NavigationParams;
 * 
 * @NavigationRoute
 * key: string;
 * index: number;   // Index that represents the depth of the stack
 * routeName: string;
 * path?: string;
 * params?: Params;
 * routes: NavigationRoute[];
 * isTransitioning: boolean;
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果 nextState 为null或未定义,只需返回原始state
    return nextState || state;
};

/**
 * 3. 合并 reducer
 */
const reducer = combineReducers({
    nav: navReducer,
    theme: theme,
    popular: popular
});

export default reducer;
