importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBioO7PA7h7bSkT5q2EHBSSVw5CVkJOQQc",

    authDomain: "food-energy-2056e.firebaseapp.com",

    projectId: "food-energy-2056e",

    storageBucket: "food-energy-2056e.appspot.com",

    messagingSenderId: "169982550179",

    appId: "1:169982550179:web:bc8c58349f5c72297e5f16"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
