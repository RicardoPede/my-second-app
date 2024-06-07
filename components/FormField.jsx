import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import eye from '../assets/icons/eye.png'
import eye_hide from '../assets/icons/eye_hide.png'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={otherStyles}>
      <Text style={style.textTitle}>{title}</Text>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          defaultValue={value}
          placeholder={placeholder}
          onChangeText={(text) => handleChangeText(text)}
          secureTextEntry={title === 'Password' && !showPassword}
        // {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)}
            style={{ color: 'white', textAlign: 'right' }}
          >
            <Image source={!showPassword ? eye :
              eye_hide}
              style={{ width: 20, height: 20, resizeMode: 'contain', display: 'flex', position: 'absolute', right: 10, top: -20 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const style = StyleSheet.create({
  textTitle: {
    color: 'white',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: 350,
    minHeight: 50,
  },
  input: {
    color: 'blue',
    fontSize: 14,
  },
})