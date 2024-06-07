import { createContext, useContext, useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [inLoading, setinLoading] = useState(false)

    useEffect(() => {
        console.log('useEffect global');
        setinLoading(true)
        const checkUser = async () => {
            console.log('checkUser global');
            try {
                const fileUri = FileSystem.documentDirectory + 'user.json'
                const existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
                let data = existingData ? JSON.parse(existingData) : []
                if (!Array.isArray(data)) {
                    data = []
                }
                console.log('data global', data);
                const user = data.find((user) => user.email === form.email && user.password === form.password)
                console.log('user global', user);
                if (user) {
                    setUser(user)
                    setisLoggedIn(true)
                }
            } catch (error) {
                console.log('Failed to read file', error)
            }
            setinLoading(false)
        }
        checkUser()
    }, []);

    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        email: '',
        password: '',
      })
    
    const signIn = async () => {
        const fileUri = FileSystem.documentDirectory + 'user.json'
        try {
            if (!form.email || !form.password) {
                Alert.alert('Error', 'All fields are required')
                throw new Error('All fields are required')
            }

            const existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })

            let data = existingData ? JSON.parse(existingData) : []

            const user = data.find((user) => user.email === form.email && user.password === form.password)

            if (!user || user.password !== form.password) {
                console.log('Sign In failed')
                console.log('errors', errors);
                throw new Error('Email or Password is incorrect')
            } else {
                console.log('Sign In success')
                updateUSer(user)
                return
            }
        } catch (error) {
            console.log('Failed to read file', error)
            setErrors({ ...errors, [error]: error.message })
            throw error
        }
    }

    const updateUSer = (user) => {
        setUser(user)
        // setisLoggedIn(true)
    }

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            isLoggedIn,
            setisLoggedIn,
            inLoading,
            setinLoading,
            signIn,
            errors,
            setErrors,
            form,
            setForm
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;