import React, { createContext, useEffect, useState } from 'react'
import { getDatabase } from '@react-native-firebase/database';
export const TimesContext = createContext();

const TimesContextProvider = ({ children }) => {
    const [times, setTimes] = useState([]);
    const [fetchingTimes, setFetchingTimes] = useState(false);
    const [timesUpdating, setTimesUpdating] = useState(false);

    const database = getDatabase();

    const handleFetchTimes = async () => {
        setFetchingTimes(true);
        database.ref('times').on('value', snapshot => {
            setTimes(snapshot.val())
            setFetchingTimes(false)
        })

    }

    const handleUpdateTimes = async () => {
        let success = false;
        setTimesUpdating(true);
        try {
            await database.ref('times').set(times)
            success = true
            console.log('Times set successfully in real time database');
        } catch (error) {
            console.error('Error while setting times real time database', error)
            success = false
        }
        setTimesUpdating(false);
        return success;
    }

    useEffect(() => {
        handleFetchTimes()
    }, [])
    return (
        <TimesContext.Provider
            value={{
                times,
                setTimes,
                timesUpdating,
                handleUpdateTimes,
                fetchingTimes,
                handleFetchTimes
            }}
        >
            {children}
        </TimesContext.Provider>
    )
}

export default TimesContextProvider