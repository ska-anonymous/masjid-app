import React, { createContext, useEffect, useState } from 'react'
import { getDatabase } from '@react-native-firebase/database';
import { timesData } from '../constants/timesData';
import { convertToDate } from '../utils/functions';
export const TimesContext = createContext();

const TimesContextProvider = ({ children }) => {
    const [times, setTimes] = useState([]);
    const [fetchingTimes, setFetchingTimes] = useState(false);
    const [timesUpdating, setTimesUpdating] = useState(false);

    const database = getDatabase();

    const handleFetchTimes = async () => {
        setFetchingTimes(true);
        database.ref('times').on('value', snapshot => {
            const firebaseTimes = snapshot.val();
            // set the fajar and maghrib time according to the local timesData
            const date = new Date();
            const currentMonth = date.getMonth();
            const currentDate = date.getDate() - 1; // as array starts from 0 and date starts from 1

            const { Fajar, Maghrib } = timesData[currentMonth].times[currentDate].prayers;
            const fajarTimeObj = convertToDate(Fajar);
            const maghribTimeObj = convertToDate(Maghrib);

            // as fajar namaz time is 55 minutes late from azan time so add 55 minutes
            fajarTimeObj.setMinutes(fajarTimeObj.getMinutes() + 55)
            let fajarHours = fajarTimeObj.getHours();
            if (fajarHours < 10)
                fajarHours = "0" + fajarHours
            let fajarMinutes = fajarTimeObj.getMinutes();
            if (fajarMinutes < 10)
                fajarMinutes = '0' + fajarMinutes
            // as maghrib namaz time is 3 minutes late from azan time so add 3 minutes
            maghribTimeObj.setMinutes(maghribTimeObj.getMinutes() + 3)
            let maghribHours = maghribTimeObj.getHours()
            if (maghribHours > 12)
                maghribHours = maghribHours - 12
            if (maghribHours < 10)
                maghribHours = '0' + maghribHours
            let maghribMinutes = maghribTimeObj.getMinutes()
            if (maghribMinutes < 10)
                maghribMinutes = '0' + maghribMinutes

            // now udpate the fajar and maghrib times
            const updatedTimes = firebaseTimes.map(time => {
                if (time.id == '1')
                    return { ...time, time: { hours: fajarHours, minutes: fajarMinutes, period: 'am' } }
                if (time.id == '4')
                    return { ...time, time: { hours: maghribHours, minutes: maghribMinutes, period: 'pm' } }
                return time
            })

            setTimes(updatedTimes)
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