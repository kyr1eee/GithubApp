import types from '../types';
import DataStore from '../../common/data/DataStore';
/**
 * 获取热门项目的异步action
 * @param {*} storeName 
 * @param {*} url 
 */
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({type: types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data);
            }).catch(error => {
                console.error(error);
                dispatch({type: types.POPULAR_LOAD_FAIL, storeName, error});
            })
    }
}

function handleData(dispatch, storeName, data) {
    dispatch({
        type: types.POPULAR_LOAD_SUCCESS,
        items: data && data.data && data.data.items,
        storeName
    });
}