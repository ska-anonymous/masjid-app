import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthContextProvider'

const Login = () => {

    const { handleLogin, loggingIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securePasswordText, setSecurePasswordText] = useState(true);

    const handeLoginPress = async () => {
        if (email.trim().length == 0 || password.trim().length == 0)
            return Alert.alert('Please enter both email and password');
        const success = await handleLogin(email, password);
        if (success) {
            Alert.alert('login successfull');
            setEmail('');
            setPassword('')
        } else {
            Alert.alert('Failed to login, Incorrect email or password')
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
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder='Email'
                        value={email}
                    />
                    <View
                        style={styles.passwordContainer}
                    >
                        <TextInput
                            onChangeText={setPassword}
                            secureTextEntry={securePasswordText}
                            style={styles.input}
                            value={password}
                            placeholder='Password'
                        />
                        <TouchableOpacity
                            style={styles.togglePasswordBtn}
                            onPress={() => setSecurePasswordText(prev => !prev)}
                        >
                            <Icon name="eye" size={20} color={'#7a4212'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handeLoginPress}
                        disabled={loggingIn}
                    >
                        <Text style={styles.buttonText}> {loggingIn ? 'Loggin....' : 'Login'} </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    title: {
        color: '#cc7325',
        fontSize: 25,
        letterSpacing: 3,
        fontWeight: 'bold',
        marginVertical: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5
    },
    input: {
        borderWidth: 2,
        borderColor: '#522a07',
        width: '75%',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 5,
        backgroundColor: '#f0ccad80',
        color: 'black',
        letterSpacing: 1,
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
    passwordContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    togglePasswordBtn: {
        position: 'absolute',
        right: 60,
    }

})

export default Login