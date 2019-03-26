import React, { Component } from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import action from '../action/index';

const SEARCH_REPOSITORIES_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_SORT = '&sort=stars';
const THEME_COLOR = 'blue';
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url)
    }

    genFetchUrl(key) {
        return SEARCH_REPOSITORIES_URL + key + QUERY_SORT;
    }

    renderItem(data) {
        const item = data.item;
        return (
            <View style={styles.itemWrapper}>
                <Text style={styles.itemContent}>
                    {JSON.stringify(item)}
                </Text>
            </View>
        )
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];    // 动态获取state
        if(!store) {
            store = {
                items: [],
                ifLoading: false,
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl 
                            title={'loading'}
                            tintColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
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
    }
});

const mapStateToProps = state => ({
    popular: state.popular
});

// 半小时找bug之 action.onLoadPopularData 忘记传参
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => {dispatch(action.onLoadPopularData(storeName, url))}
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTab);