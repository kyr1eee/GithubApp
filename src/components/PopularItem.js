import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
class PopularItem extends Component {
    render() {
        const {item} = this.props;
        if (!item || !item.owner)
            return null;
        return (
            <TouchableOpacity
                onPress={this.props.onSelct}
            >
                <View>
                    
                </View>
            </TouchableOpacity>
        );
    }
}

export default PopularItem;