import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import logo_small from '@/assets/images/logo_small.png'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const index = () => {

  const { isLoggedIn, setisLoggedIn, signIn, errors, setErrors, form, setForm } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    console.log('Sign In')
    setIsSubmitting(true)
    setisLoggedIn(true)
    await signIn()
      .then(() => {
        router.replace('/home')
      })
      .catch((error) => {
        console.log('error', error)
        setIsSubmitting(false)
      })
  }

  console.log('isSubmitting', isSubmitting)
  console.log('isLoggedIn', isLoggedIn);

  const handleChange = (name, value) => {
    if (!errors) {
      setForm({ ...form, [name]: value });
    } else {
      setErrors({ ...errors, [name]: '' });
      setForm({ ...form, [name]: value });
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.font}>
          <Text style={style.text}>Sign In Login</Text>
          <Text style={style.text}>Please enter your credentials to proceed</Text>
          <Image style={style.logo}
            source={logo_small}
          />
          <Text style={style.title}>Log in to App</Text>

          <FormField
            title="Email"
            placeholder="Enter your email"
            defaultValue={form.email}
            handleChangeText={(text) => handleChange('email', text)}
            otherStyles={style.input}
            keyboardType="email-address"
          />
          {errors && <Text style={{ color: 'red' }}>{errors.error}</Text>}

          <FormField
            title="Password"
            placeholder="Enter your password"
            handleChangeText={(text) => handleChange('password', text)}
            otherStyles={style.input}
          />
          {errors && <Text style={{ color: 'red' }}>{errors.error}</Text>}

          <Text style={style.text}>Forgot your password?</Text>

          <ScrollView style={{ marginTop: 50 }}>
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyle={style.button}
              textStyle={style.titleButton}
              isLoading={isSubmitting}
            />
          </ScrollView>

          <ScrollView>
            <View>
              <Text style={style.text}>Don't have an account?
                <Link href='/sign-up' style={{ color: 'blue' }}> Sign Up</Link>
              </Text>
            </View>
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

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
