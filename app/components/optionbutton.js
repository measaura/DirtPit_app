import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const optionHeight = 30
const optionWidth = 30
const optionSelected = false

export default class OptionButton extends Component {
    constructor() {
        super();
    }

    render() {
console.log('button: '+JSON.stringify(this.props.button))
        return (
            <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.8} style={styles.radioButton}>
                <View style={[styles.radioButtonHolder, { height: this.props.button.size?this.props.style.size:optionHeight, borderColor: this.props.style.color }]}>
                    {
                        (this.props.button.selected)
                            ?
                            (<View style={[styles.radioIcon, { height: this.props.style.height?this.props.style.height:optionHeight, backgroundColor: this.props.style.color, }]}><Text style={[styles.label, { color: this.props.button.textColor }]}>{this.props.button.name}</Text></View>)
                            :
                            (<View style={[styles.radioIcon, { height: this.props.style.height?this.props.style.height:optionHeight, opacity: 0.5 }]}><Text style={[styles.label, { color: 'black'}]}>{this.props.button.name}</Text></View>)
                    }              
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonHolder: {
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioIcon: {
    		borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18,
        fontFamily: 'Gotham Bold',
        opacity: 1
    },

});