// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7BvUtQ6LKlvOEATqnsTidrIZYGV_lvzM",
    authDomain: "react-curso-cf83e.firebaseapp.com",
    projectId: "react-curso-cf83e",
    storageBucket: "react-curso-cf83e.appspot.com",
    messagingSenderId: "89098102125",
    appId: "1:89098102125:web:6ac4cdd3ae21cc68906664",
    measurementId: "G-NDYBKDCJ27"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)