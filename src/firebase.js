import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";

export const auth = initializeApp({
  apiKey: "AIzaSyAt2ctm7fvA9TtsXJB1VUfi2SDr7LzyZ7U",
  authDomain: "my-chat-app-185e1.firebaseapp.com",
  projectId: "my-chat-app-185e1",
  storageBucket: "my-chat-app-185e1.appspot.com",
  messagingSenderId: "12062951572",
  appId: "1:12062951572:web:271343200dee07f0a2cc81"
}).auth() ;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);