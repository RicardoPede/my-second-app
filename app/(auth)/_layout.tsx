import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
      <Tabs>
        <Tabs.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        {/* <StatusBar 
          style="light" 
          backgroundColor="black"
        /> */}
      </Tabs>
  )
}

{/* <StatusBar 
    style="light" 
    backgroundColor="black" 
  /> */}
export default AuthLayout
