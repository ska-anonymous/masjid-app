import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import DotLoader from '../components/DotLoader'

const PreLoader = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/masjid-icon.png')}
                style={styles.iconImage}
                resizeMode='contain'  // Change to 'contain' to ensure image scales properly
            />
            <DotLoader />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    iconImage: {
        width: '60%',   // You can adjust this value to fit the image better
        height: undefined,
        aspectRatio: 1,  // This maintains the image's aspect ratio
        marginBottom: 20 // Add some space between the image and the DotLoader
    }
})

export default PreLoader
