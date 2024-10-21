import React, { useEffect, useState } from 'react'
import MyTabs from './bottom-tabs-navigator/MyTabs'
import TimesContextProvider from './context/TimesContextProvider'
import AuthContextProvider from './context/AuthContextProvider'
import PreLoader from './screens/PreLoader'
import { StatusBar } from 'react-native'

const App = () => {
    const [initializing, setInitializing] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setInitializing(false)
        }, 2000);
    }, [])
    return (
        <>
            <StatusBar hidden />
            <AuthContextProvider>
                <TimesContextProvider>
                    {initializing ?
                        <PreLoader />
                        :
                        <MyTabs />
                    }
                </TimesContextProvider>
            </AuthContextProvider>
        </>
    )
}

export default App