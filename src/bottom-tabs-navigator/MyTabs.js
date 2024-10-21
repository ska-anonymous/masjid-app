import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Times from '../screens/Times';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import EditTimes from '../screens/EditTimes';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import Logout from '../screens/Logout';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
    const { user } = useContext(AuthContext);
    const [isTabBarVisible, setIsTabBarVisible] = useState(true);
    let timer;

    const handleTouchStart = () => {
        clearTimeout(timer);  // Clear any existing timer
        setIsTabBarVisible(true);
    };

    const handleTouchEnd = () => {
        // Hide the tab bar after 2 seconds of no touch
        timer = setTimeout(() => setIsTabBarVisible(false), 2000);
    };

    useEffect(() => {
        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={styles.container} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Times') {
                                iconName = 'time'

                            } else if (route.name === 'Login') {
                                iconName = 'log-in';
                            } else if (route.name === 'Edit Times') {
                                iconName = 'create';
                            } else if (route.name === 'Logout') {
                                iconName = 'log-out';
                            }

                            // You can return any component that you like here!
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                        tabBarStyle: { display: isTabBarVisible ? 'flex' : 'none', position: 'absolute' }
                    })}
                >
                    <Tab.Screen name="Times" component={Times} />
                    {user
                        &&
                        <Tab.Screen name='Edit Times' component={EditTimes} />
                    }
                    {user ?
                        <Tab.Screen name='Logout' component={Logout} />
                        :
                        <Tab.Screen name="Login" component={Login} />
                    }
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

})

export default MyTabs