import {AsyncStorage} from 'react-native';

export default class DataStore {
    /**
     * 1. 若本地数据存在或在有效期内,则直接读取本地数据
     * 2. 若本地数据不存在或读取本地数据过程出错,则重新请求接口
     */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then(data => {
                if(data && DataStore.checkTimestampValid(data.timestamp)) {
                    resolve(data);
                } else {
                    this.fetchAPIData(url).then(data => {
                        resolve(this._wrapData(data));
                    }).catch(e => {
                        reject(e);
                    });
                }
            }).catch(error => {
                this.fetchAPIData(url).then(data => {
                    resolve(this._wrapData(data));
                }).catch(e => {
                    reject(e);
                });
            });
        });
    }

    // AsyncStorage 缓存本地数据, json序列化
    saveLocalData(url, data, callback) {
        if(!data || !url)
            return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    // 将数据封装为包含时间戳的数据
    _wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        };
    }

    // 检测timestamp有效期
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if(currentDate.getFullYear() !== targetDate.getFullYear())
            return false;
        if(currentDate.getMonth() !== targetDate.getMonth())
            return false;
        if(currentDate.getDate() !== targetDate.getDate())
            return false;
        if(currentDate.getHours() - targetDate.getHours() > 2)
            return false;
        return true;
    }

    /**
     * 获取本地数据, JSON.parse() 提取本地序列化的json数据
     * @resolve JSON Object 
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch(e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }

    /**
     * 获取API数据
     * @resolve JSON Object 
     */
    fetchAPIData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if(res.ok) {
                        // 返回json格式的promise对象
                        return res.json();
                    }
                    throw new Error('request github api failed...');
                }).then(resData => {
                    this.saveLocalData(url, resData);
                    resolve(resData);
                }).catch(e => {
                    reject(e);
                });
        });
    }
}