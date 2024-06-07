import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading}) => {

    return (
        <TouchableOpacity
            style={style.button}
            onPress={handlePress}
            disabled={isLoading ? true : false}
            activeOpacity={0.7}
        >
            <Text style={textStyle}>{`${title}`}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const style = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        minHeight: 30,
        width: '100%',
    },
    titleButton: {
        color: 'white',
    }
})
