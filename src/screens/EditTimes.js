import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { generateHours, generateMinutes } from '../utils/timesPickerFunctions';
import { TimesContext } from '../context/TimesContextProvider';


const EditTimes = () => {

    const { times, setTimes, handleUpdateTimes, timesUpdating } = useContext(TimesContext)

    const hours = generateHours();
    const minutes = generateMinutes();

    const [selectedTime, setSelectedTime] = useState(null)

    const handleTimeChange = (type, value) => {
        setTimes(prevTimes => prevTimes.map(time => {
            return time.id == selectedTime.id ? type == 'hours' ? { ...time, time: { ...time.time, hours: value } } : { ...time, time: { ...time.time, minutes: value } } : time
        }))
    }

    const handleUpdatePress = async () => {
        const success = await handleUpdateTimes();
        if (success) {
            Alert.alert('Updated Successfully');
        } else {
            Alert.alert('Failed to update times');
        }
    }

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/bg-1.png')}
                    style={styles.backgroundImage}
                    resizeMode='stretch'
                >
                    {selectedTime &&
                        <View style={styles.pickerContainer}>
                            <View style={styles.hoursPickerContainer}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Hours', value: null }}
                                    onValueChange={(value) => handleTimeChange('hours', value)}
                                    value={selectedTime.time.hours}
                                    items={hours}
                                    style={
                                        {
                                            inputAndroid: styles.hoursPicker,
                                            inputIOS: styles.hoursPicker
                                        }
                                    }
                                />
                            </View>
                            <View style={styles.minutesPickerContainer}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Minutes', value: null }}
                                    onValueChange={(value) => handleTimeChange('minutes', value)}
                                    value={selectedTime.time.minutes}
                                    items={minutes}
                                    style={
                                        {
                                            inputAndroid: styles.minutesPicker,
                                            inputIOS: styles.minutesPicker
                                        }
                                    }
                                />
                            </View>
                        </View>
                    }

                    <View style={styles.timesContainer}>
                        {times.map(time => {
                            return (
                                <View key={'time-row-' + time.id} style={styles.timeRow}>
                                    <View style={styles.timeContainer}>
                                        <View style={styles.timeBox}>
                                            <TouchableOpacity onPress={() => setSelectedTime(time)}>
                                                <Text style={[styles.timeText, selectedTime && selectedTime.id == time.id && styles.selectedTimeText]}>{time.time.hours}:{time.time.minutes}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.timeLabelContainer}>
                                        <Text style={styles.timeLabel}>{time.label}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <TouchableOpacity
                        style={styles.updateButton}
                        disabled={timesUpdating}
                        onPress={handleUpdatePress}
                    >
                        <Text style={styles.buttonText}>{timesUpdating ? 'Updating....' : 'Update'}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </>
    )
}

export default EditTimes

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
        paddingTop: 180,
    },
    pickerContainer: {
        width: '75%',
        display: 'flex',
        flexDirection: 'row'
    },
    hoursPickerContainer: {
        width: '50%',
    },
    hoursPicker: {
        color: 'cyan',
    },
    minutesPickerContainer: {
        width: '50%'
    },
    minutesPicker: {
        color: 'cyan'
    },
    timesContainer: {
        width: '90%',
        marginTop: 20,
    },
    timeRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
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
    selectedTimeText: {
        color: 'cyan'
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
    updateButton: {
        backgroundColor: '#7a4212',
        paddingVertical: 10,
        alignItems: 'center',
        width: '75%',
        borderRadius: 30,
        marginVertical: 30,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
    },
})