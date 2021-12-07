import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5qqVA2DTNqZ2IxhWDmkV6rVcyfN6s-nY",
  authDomain: "dwitter-e2c6a.firebaseapp.com",
  projectId: "dwitter-e2c6a",
  storageBucket: "dwitter-e2c6a.appspot.com",
  messagingSenderId: "801227193688",
  appId: "1:801227193688:web:d9111f5a0b4084c68fb92d"
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();