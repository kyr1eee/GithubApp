import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import StarButton from './StarButton';
class PopularItem extends Component {
    
    render() {
        const {item} = this.props;
        if (!item || !item.owner)
            return null;
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.centerWrapper}>
                        <View>
                            <Text style={styles.language}>{item.language === null ? 'Plain Text' : item.language}</Text>
                        </View>
                        <View style={styles.starsWrapper}>
                            <StarButton />
                            <Text style={styles.stars}>{item.stargazers_count}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>updated on {item.updated_at}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#0366d6'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#586069'
    },
    stars: {
        color: '#586069',
        fontSize: 14,
        marginLeft: 3
    },
    language: {
        color: '#586069',
        fontSize: 14,
    },
    starsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        width: 100
    },
    centerWrapper: {
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
    }
});

export default PopularItem;