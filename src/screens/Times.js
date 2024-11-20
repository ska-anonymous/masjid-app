import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { formatTime, isNearTime } from '../utils/functions'
import { TimesContext } from '../context/TimesContextProvider'

const Times = () => {
    const { times, fetchingTimes } = useContext(TimesContext)

    const [date, setDate] = useState(new Date())
    const currentTime = formatTime(date)

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
