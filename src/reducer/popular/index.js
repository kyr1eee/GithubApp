import types from '../../action/types';

/**
 * popular: {
 *  react: {
 *      items: [],
 *      isLoading: false,
 *  },
 *  typescript: {
 *      ...
 *  }
 * }
 */
const initState = {};

/**
 * state 树横向扩展
 * 动态设置 store 和动态获取 store
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = initState, action) {
    switch(action.type) {
        case types.POPULAR_LOAD_SUCCESS :
            return {
                ...state,
                [action.storeName]: {
                    // n小時 bug 報錯之 ...action.storeName 解構字符串報錯, 因此改為...[action.storeName]
                    ...state[action.storeName],
                    items: action.items,    // 原始数据
                    projectModes: action.projectModes,  // 此次要展示的数据
                    isLoading: false,
                    pageIndex: action.pageIndex,
                    hideLoadingMore: false,
                }
            };
        case types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            };
        case types.POPULAR_LOAD_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        case types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            };
        case types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                }
            };
        default:
            return state;
    }
}