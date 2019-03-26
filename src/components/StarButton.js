import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class StarButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={{padding: 1}}
                onPress={() => this.props.onPress()}
                underlayColor={'transparent'}
            >
                <FontAwesome 
                    name={'star'} 
                    size={26}
                    style={{color: '#586069'}}
                />
            </TouchableOpacity>
        );
    }
}

export default StarButton;