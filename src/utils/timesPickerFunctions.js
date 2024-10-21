export const generateHours = () => {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
        let hour = i < 10 ? '0' + i : '' + i;
        hours.push({
            label: hour,
            value: hour
        })
    }
    return hours;
}
export const generateMinutes = () => {
    let minutes = [];
    for (let i = 0; i <= 60; i++) {
        let minute = i < 10 ? '0' + i : '' + i;
        minutes.push({
            label: minute,
            value: minute
        })
    }
    return minutes;
}