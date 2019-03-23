import React, { Component } from 'react';
import {View} from 'react-native';
import {BottomTabBar} from 'react-navigation-tabs';
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        // setParam数据存储在navigation.state中
        const {routes, index} = this.props.navigation.state;
        if(routes[index].params) {
            const {theme} = routes[index].params;
            if(theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        );
    }
}


export default TabBar;