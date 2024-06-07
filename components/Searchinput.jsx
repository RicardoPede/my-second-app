import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Icon, MD3Colors } from 'react-native-paper'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    return (

        <View style={style.inputContainer}>
            <TextInput
                style={style.input}
                defaultValue={value}
                placeholder={placeholder}
                onChangeText={(text) => handleChangeText(text)}
            // {...props}
            />

            <TouchableOpacity>
                <FontAwesome name='search' size={24} color='black' />
                <Icon
                    source="camera"
                    color={MD3Colors.error50}
                    size={20}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput

const style = StyleSheet.create({
    textTitle: {
        color: 'white',
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        borderWidth: 1,
        padding: 20,
        // width: 350,
        minHeight: 50,
    },
    input: {
        backgroundColor: 'white',
        color: 'red',
        fontSize: 10,
        marginTop: 0.5,
        textShadowColor: 'white',
        flex: 1,
    },
})