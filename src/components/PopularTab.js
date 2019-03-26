import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import action from '../action/index';
import PopularItem from './PopularItem';
import { onLoadMorePopularData } from '../action/popular';
import Toast, {DURATION} from 'react-native-easy-toast';
const SEARCH_REPOSITORIES_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_SORT = '&sort=stars';
const THEME_COLOR = 'blue';
const pageSize = 10;
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    /**
     * 获取与当前页面有关的数据
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if(!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true,
            }
        }
        return store;
    }

    loadData(loadMore) {
        const {onLoadPopularData, onLoadMorePopularData} = this.props;
        const store= this._store();
        const url = this.genFetchUrl(this.storeName);
        if(loadMore) {
            onLoadMorePopularData(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onLoadPopularData(this.storeName, url, pageSize);
        }
        
    }

    genFetchUrl(key) {
        return SEARCH_REPOSITORIES_URL + key + QUERY_SORT;
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null : 
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator} 
                />
                <Text>正在加载更多</Text>
            </View>
    }

    renderItem(data) {
        const item = data.item;
        return (
            <PopularItem item={item} onSelect={() => {}}/>
        )
    }

    render() {
        const {popular} = this.props;
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl 
                            title='Loading...'
                            tintColor={THEME_COLOR}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            // 滚动到底部,代表下拉刷新成功
                            // 滚动一次到底部会调用两次
                            if(this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                        
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        // fix 初始化页面时调用onEndReached的问题
                        this.canLoadMore = true;
                    }}
                />
                <Toast 
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    itemWrapper: {

    },
    itemContent: {
        backgroundColor: '#faa'
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10,
    }
});

const mapStateToProps = state => ({
    popular: state.popular
});

// 半小时找bug之 action.onLoadPopularData 忘记传参
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize) => dispatch(action.onLoadPopularData(storeName, url, pageSize)),
    onLoadMorePopularData: (storeName, pageIndex, pageSize, items, callback) => dispatch(action.onLoadMorePopularData(storeName, pageIndex, pageSize, items, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTab);