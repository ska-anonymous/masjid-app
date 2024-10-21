import { View, ActivityIndicator, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

const Logout = () => {

  const { loggingOut, handleLogout } = useContext(AuthContext);

  const handleLogoutPress = async () => {
    const success = await handleLogout();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/bg-1.png')}
        style={styles.backgroundImage}
        resizeMode='stretch'
      >
        {loggingOut &&
          <ActivityIndicator color={'cyan'} size={50} />
        }
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogoutPress}
          disabled={loggingOut}
        >
          <Text style={styles.buttonText}> Logout </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Logout

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
  button: {
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