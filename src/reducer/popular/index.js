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
                    ...action.storeName,
                    items: action.items,
                    isLoading: false,
                }
            };
        case types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...action.storeName,
                    isLoading: true,
                }
            };
        case types.POPULAR_LOAD_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...action.storeName,
                    isLoading: false,
                }
            };
        default:
            return state;
    }
}