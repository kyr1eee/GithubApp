import types from '../types';
import DataStore from '../../common/data/DataStore';
/**
 * 获取热门项目的异步action
 * @param {*} storeName 
 * @param {*} url 
 */
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: types.POPULAR_REFRESH, storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize);
            }).catch(error => {
                console.error(error);
                dispatch({type: types.POPULAR_LOAD_FAIL, storeName, error});
            })
    }
}

/**
 * 
 * @param {*} storeName 
 * @param {*} pageIndex 第几页
 * @param {*} pageSize 每页展示条数
 * @param {*} dataArray 原始数据
 * @param {*} callback 回调函数,通过回调函数向调用页面通信: 比如异常显示, 没有更多等等...
 */
export function onLoadMorePopularData(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            // 模拟网络请求
            if((pageIndex - 1) * pageSize >= dataArray.length) {
                if(typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max),
                });
            }
        }, 500);
    }
}

function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: types.POPULAR_LOAD_SUCCESS,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        pageIndex: 1,
        storeName
    });
}