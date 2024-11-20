const date = new Date()
export const formatTime = (dateObj) => {
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours

    // Add leading zero to minutes and seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return formattedTime;
}


// Function to convert prayer time to a Date object
export const convertToDate = (time) => {
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
export const isNearTime = (time) => {
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



export const getDatesInMonth = (year, month) => {
    // Adjust for JavaScript months (0-11)
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // The last day of the month
    const numberOfDaysInMonth = lastDayOfMonth.getDate(); // Get the number of days

    const datesArray = [];

    // Loop through all the days of the month
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        datesArray.push(currentDate.getDate());
    }

    return datesArray;
}