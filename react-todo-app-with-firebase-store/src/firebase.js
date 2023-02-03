// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBsU74z5chmWI7etGhHfgBDfgWhSYjpCnI",
	authDomain: "react-todo-app-34b19.firebaseapp.com",
	projectId: "react-todo-app-34b19",
	storageBucket: "react-todo-app-34b19.appspot.com",
	messagingSenderId: "231710295384",
	appId: "1:231710295384:web:27141fe73d05e50683d12d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
