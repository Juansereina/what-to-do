importScripts("https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.12.1/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: '800525306244'
});

const messaging = firebase.messaging();

