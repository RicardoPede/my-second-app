import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { Icon, useTheme } from 'react-native-paper'

const TabsLayout = () => {
    const theme = useTheme()

    return (
            <Tabs
                initialRouteName="home"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarStyle: {
                        backgroundColor: theme.colors.surface,
                        borderTopColor: theme.colors.backdrop,
                        borderTopWidth: 2
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused, size }) => {
                            <Icon
                                source={focused ? 'home' : 'home-outline'}
                                theme={theme}
                                size={size}
                                color={theme.colors.primary}
                            />
                        }
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'BookMark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused, size }) => {
                            <Icon
                                source={focused ? 'bookmark' : 'bookmark-outline'}
                                theme={theme}
                                size={size}
                                color={theme.colors.primary}
                            />
                        }
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused, size }) => {
                            <Icon
                                source={focused ? 'create' : 'create-outline'}
                                theme={theme}
                                size={size}
                                color={theme.colors.primary}
                            />
                        }
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused, size }) => {
                            <Icon
                                source={focused ? 'profile' : 'profile-outline'}
                                theme={theme}
                                size={size}
                                color={theme.colors.primary}
                            />
                        }
                    }}
                />
            </Tabs>
    )
}

export default TabsLayout