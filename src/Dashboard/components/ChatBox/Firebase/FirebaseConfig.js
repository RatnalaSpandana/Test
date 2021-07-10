import  firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore'




var firebaseConfig = {
    apiKey: "AIzaSyATXJMhXN_ltYqK-zcsdHEGz4Vddmj2g0U",
    authDomain: "chat-app-ee062.firebaseapp.com",
    // databaseURL: "https://instagram-clone-7cb68-default-rtdb.firebaseio.com",
    projectId: "chat-app-ee062",
    storageBucket: "chat-app-ee062.appspot.com",
    messagingSenderId: "489631514062",
    appId: "1:489631514062:web:bebff9b6e97da441ac7f9f",
    // measurementId: "G-S6Q7D0BGMG"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  const projectStorage   = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

   export  { projectFirestore , projectStorage , timestamp} 