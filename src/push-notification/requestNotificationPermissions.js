import PushNotification from "react-native-push-notification";
import { PermissionsAndroid, Platform } from "react-native";

// Function to request iOS and Android permissions
export const requestPermissions = async () => {
    if (Platform.OS === "ios") {
        PushNotification.requestPermissions().then((response) => {
            console.log("iOS Notification Permission Response:", response);
        }).catch((error) => {
            console.error("Error requesting permissions:", error);
        });
    } else if (Platform.OS === "android" && Platform.Version >= 33) {
        // For Android 13+, ask for POST_NOTIFICATIONS permission
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: "Notification Permission",
                    message: "This app needs access to show notifications.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        } catch (err) {
            console.warn("Error requesting Android permission:", err);
        }
    } else {
        console.log("No need to request notification permissions for Android versions below 13");
    }
};
