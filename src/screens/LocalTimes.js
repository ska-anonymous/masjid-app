import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

import React, { useState } from 'react'
import { getDatesInMonth } from '../utils/functions';
import { timesData } from '../constants/timesData';

const LocalTimes = () => {
    const months = [
        { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' }, { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' }, { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' }, { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }
    ]

    const [dates, setDates] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

    const [localTimes, setLocalTimes] = useState(null)

    const handleChangeMonth = (month) => {
        setSelectedMonth(month - 1)
        const datesInMonth = getDatesInMonth(2024, month - 1)
        const updatedDates = datesInMonth.map(date => {
            return { label: '' + date, value: '' + date } //RnPicker requires values in strings
        })
        setDates(updatedDates)
    }

    const handleChangeDate = (date) => {
        setSelectedDate(date - 1)
    }

    const handleSearchPress = () => {
        // check if the month or date is not selected
        if (selectedMonth == null || selectedDate == null || selectedDate < 0)
            return Alert.alert('Please select Month and Date');
        const localTimesData = timesData[selectedMonth].times[selectedDate].prayers;
        setLocalTimes(localTimesData)
    }

    const format = (value) => {
        if (value < 10)
            return "0" + value
        else
            return value
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/bg-1.png')}
                style={styles.backgroundImage}
                resizeMode='stretch'
            >
                <View style={styles.selectorsContainer}>
                    <View style={styles.monthPickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Month', value: null }}
                            onValueChange={(value) => handleChangeMonth(value)}
                            items={months}
                            style={
                                {
                                    inputAndroid: styles.pickerText,
                                    inputIOS: styles.pickerText
                                }
                            }
                        />
                    </View>
                    <View style={styles.datePickerContainer}>
                        <RNPickerSelect
                            placeholder={{ label: 'Date', value: null }}
                            onValueChange={(value) => handleChangeDate(value)}
                            items={dates}
                            style={
                                {
                                    inputAndroid: styles.pickerText,
                                    inputIOS: styles.pickerText
                                }
                            }
                        />
                    </View>
                    <View style={styles.searchButtonContainer}>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={handleSearchPress}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {
                    localTimes &&

                    <View style={styles.timesContainer}>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Fajar.hours)}:{format(localTimes.Fajar.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>فجر</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Mamnoo.hours)}:{format(localTimes.Mamnoo.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>آغاز وقت ممنوع</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Tuloo.hours)}:{format(localTimes.Tuloo.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>طلوع</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Ishraq.hours)}:{format(localTimes.Ishraq.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>اشراق</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Nisfunnihar.hours)}:{format(localTimes.Nisfunnihar.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>نصف النهار</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Zuhar.hours)}:{format(localTimes.Zuhar.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>ظہر</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Asar_Hanfi.hours)}:{format(localTimes.Asar_Hanfi.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>عصر حنفی</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Asar_Shafii.hours)}:{format(localTimes.Asar_Shafii.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>عصر شافعی</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Maghrib.hours)}:{format(localTimes.Maghrib.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>مغرب</Text>
                        </View>
                        <View style={styles.timesRow}>
                            <View>
                                <Text style={styles.timeText}>{format(localTimes.Isha.hours)}:{format(localTimes.Isha.minutes)}</Text>
                            </View>
                            <Text style={styles.timeText}>عشاء</Text>
                        </View>
                    </View>

                }
            </ImageBackground>
        </View>
    )
}

export default LocalTimes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectorsContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#7a4212',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderTopColor: '#7a4212',
        marginTop: 100
    },
    monthPickerContainer: {
        width: '33%'
    },
    datePickerContainer: {
        width: '30%'
    },
    pickerText: {
        color: 'cyan',
    },
    searchButtonContainer: {
        width: '30%'
    },
    searchButton: {
        backgroundColor: '#7a4212',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    timesContainer: {
        width: '85%',
        marginTop: 50
    },
    timeText: {
        fontSize: 20,
        color: '#cc7325',
        fontWeight: 'bold',
        letterSpacing: 3,
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    timesRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#00000090',
        marginVertical: 3
    },
})