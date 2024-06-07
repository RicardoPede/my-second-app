 import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import logo_small from '@/assets/images/logo_small.png'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import * as FileSystem from 'expo-file-system'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [ errors, setErrors ] = useState({})

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    console.log('Sign Up')
    const fileUri = FileSystem.documentDirectory + 'user.json'

    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required')
      setErrors({
        username: !form.username ? 'Username is required' : '',
        email: !form.email ? 'Email is required' : '',
        password: !form.password ? 'Password is required' : '',
      })
      return
    }

    try {
      const existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      let data = existingData ? JSON.parse(existingData) : []
      
      if (!Array.isArray(data)) {
        data = []
      }
      data.push(form)

      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 })
      setisSubmitting(true)
    } catch (error) {
      console.log('Failed to write file', error)
    }
  }

  const handleChange = (name, value) => {
    if (name === 'username') {
      if (value.length < 3) {
        errors.username = 'Username must be at least 3 characters'
      }
    }
    if (name === 'email') {
      if (!value.includes('@')) {
        errors.email = 'Email must contain @'
      }
    }
    if (name === 'password') {
      if (value.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      } else if (!value.match(/[a-z]/)) {
        errors.password = 'Password must contain a lowercase letter'
      } else if (!value.match(/[A-Z]/)) {
        errors.password = 'Password must contain an uppercase letter'
      } else if (!value.match(/[0-9]/)) {
        errors.password = 'Password must contain a number'
      } else if (!value.match(/[^a-zA-Z0-9]/)) {
        errors.password = 'Password must contain a special character'
      } 
    }

    setErrors(errors)

    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    })
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.font}>
          <Text style={style.text}>Sign Up Login</Text>
          <Text style={style.text}>Please enter your credentials to proceed</Text>
          <Image style={style.logo}
            source={logo_small}
          />
          <Text style={style.title}>Sign Up to App</Text>

          <FormField
            title="Username"
            placeholder="Enter your username"
            defaultValue={form.username}
            handleChangeText={(text) => handleChange('username', text)}
            otherStyles={style.input}
          />
          {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}

          <FormField
            title="Email"
            placeholder="Enter your email"
            defaultValue={form.email}
            handleChangeText={(text) => handleChange('email', text)}
            otherStyles={style.input}
            keyboardType="email-address"
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <FormField
            title="Password"
            placeholder="Enter your password"
            defaultValue={form.password}
            handleChangeText={(text) => handleChange('password', text)}
            otherStyles={style.input}
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <ScrollView style={{ marginTop: 50 }}>
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyle={style.button}
              textStyle={style.titleButton}
              isLoading={isSubmitting}
            />
          </ScrollView>

          <ScrollView>
            <View>
              <Text style={style.text}>Have an account already?
                <Link href='/sign-in' style={{ color: 'blue' }}> Sign In</Link>
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(103, 80, 164, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    display: 'flex',
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    width: undefined,
    height: '100%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    marginTop: 0,
    marginBottom: 20,
  },
  logo: {
    display: 'flex',
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: 50,
    marginVertical: 10,
    contrast: 100,
    tintColor: "deepskyblue",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    marginVertical: 0,
  },
  button: {
    marginVertical: 10,
  },
  titleButton: {
    color: 'white',
  },
  text: {
    color: 'white',
    marginVertical: 5,
  }
})
