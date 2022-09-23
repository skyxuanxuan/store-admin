/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDE0ZZl3wCQahBEjaT_NxtWr2elgaTY4I0',
  authDomain: 'oil102.firebaseapp.com',
  projectId: 'oil102',
  storageBucket: 'oil102.appspot.com',
  messagingSenderId: '686198225351',
  appId: '1:686198225351:web:a9cf5e878cc99c4fd581e2'
}

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig)

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
})
