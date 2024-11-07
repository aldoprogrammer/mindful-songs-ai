// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

// Export Firestore methods
export { addDoc, collection, getDocs, query, where, deleteDoc, doc, orderBy };

// Request FCM permission and get token
export const generateToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const vapidKey = import.meta.env.VITE_FCM_VAPID_KEY;
            console.log('Using VAPID key:', vapidKey); // Log the VAPID key being used
            
            const token = await getToken(messaging, { vapidKey });
            console.log('FCM Token:', token);
            return token;
        } else {
            console.error('Permission not granted for notifications');
        }
    } catch (error) {
        console.error('Error generating token', error);
    }
};
