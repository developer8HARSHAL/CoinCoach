import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDNsQ5NhfKmCr6T45GGl-TiFWq9EOsxyJs",
    authDomain: "coincoach-f7908.firebaseapp.com",
    projectId: "coincoach-f7908",
    storageBucket: "coincoach-f7908.appspot.com",
    messagingSenderId: "888376275355",
    appId: "1:888376275355:web:2264cecfd433e9e536b13e",
    measurementId: "G-JDMBK4KWEN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
