import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from '@react-native-firebase/auth';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const auth = getAuth();

    const handleLogin = async (email, password) => {
        let success = false;
        setLoggingIn(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            success = true;
        } catch (error) {
            console.error('error in login ', error);
            success = false;
        }
        setLoggingIn(false)
        return success;
    }

    const handleLogout = async () => {
        setLoggingOut(true);
        let success = false;
        try {
            await auth.signOut();
            success = true;
        } catch (error) {
            console.error('Failed to logout ', error);
            success = false;
        }
        setLoggingOut(false);
        return success;
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loggingIn,
                handleLogin,
                loggingOut,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider