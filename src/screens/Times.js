import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { formatTime } from '../utils/functions'
import { TimesContext } from '../context/TimesContextProvider'

const Times = () => {
    const { times, fetchingTimes } = useContext(TimesContext)

    const [date, setDate] = useState(new Date())
    const currentTime = formatTime(date)

    // Function to convert prayer time to a Date object
    const convertToDate = (time) => {
        let convertedHours = parseInt(time.hours);

        // Convert to 24-hour format based on the period
        if (time.period == "pm" && convertedHours < 12) {
            convertedHours += 12; // Add 12 to convert PM to 24-hour format
        } else if (time.period == "am" && convertedHours == 12) {
            convertedHours = 0; // Convert 12 AM to 0 hours (midnight)
        }

        // Create a new Date object using today's date and the converted time
        const now = new Date();
        now.setHours(convertedHours)
        now.setMinutes(time.minutes)
        return now
    }

    // Function to check if time is within 30 minutes
    const isNearTime = (time) => {
        const prayerTime = convertToDate(time.time)
        const difference = Math.abs((date - prayerTime) / 1000 / 60) // Difference in minutes
        // check if the day is friday then highlight al-juma otherwise al-zuhur
        if (time.id == 6) {
            return date.getDay() == 5 && difference >= 0 && difference <= 31 // If the juma prayer time is within the next 30 minutes and its friday
        } else if (time.id == 2) {
            return date.getDay() != 5 && difference >= 0 && difference <= 31 // If the alzuhur prayer time is within the next 30 minutes and its not friday
        } else {
            return date.getDay() != 5 && difference >= 0 && difference <= 31 // If the prayer time is within the next 30 minutes

        }



    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(interval) // Clean up the interval on component unmount
    }, [])

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/bg-1.png')}
                    style={styles.backgroundImage}
                    resizeMode='stretch'
                >
                    <View style={styles.currentTimeBox}>
                        <Text style={styles.currentTimeText}>{currentTime}</Text>
                    </View>
                    {fetchingTimes &&
                        <ActivityIndicator size={50} color={'cyan'} />
                    }
                    <View style={styles.timesContainer}>
                        {times.map((time) => {
                            const near = isNearTime(time)
                            return (
                                <View key={'time-row-' + time.id} style={styles.timeRow}>
                                    <View style={styles.indicatorContainer}>
                                        <View style={[styles.indicatorCircle, near && styles.circleFilled]}></View>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <View style={styles.timeBox}>
                                            <Text style={styles.timeText}>{time.time.hours}:{time.time.minutes}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.timeLabelContainer}>
                                        <Text style={styles.timeLabel}>{time.label}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ImageBackground>
            </View>
        </>
    )
}

export default Times

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        paddingTop: 120,
    },
    currentTimeBox: {
        borderColor: '#522a07',
        borderWidth: 2,
        width: '60%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowRadius: 10,
        elevation: 3,
    },
    currentTimeText: {
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 2,
        color: '#cc7325',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    timesContainer: {
        width: '90%',
        marginTop: 20,
    },
    timeRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    indicatorContainer: {
        width: '30%',
    },
    indicatorCircle: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#522a07',
        borderRadius: 50,
    },
    circleFilled: {
        backgroundColor: 'green',
    },
    timeContainer: {
        width: '30%',
    },
    timeBox: {
        borderWidth: 2,
        borderColor: '#522a07',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowRadius: 10,
        elevation: 3,
    },
    timeText: {
        fontSize: 23,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#cc7325',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    timeLabelContainer: {
        width: '30%',
    },
    timeLabel: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#cc7325',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
})
