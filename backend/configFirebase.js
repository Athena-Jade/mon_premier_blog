// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore" //j'ai ajouté ça
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAl17AYfWbFQ2iHmgRlW8krc7npjCeGnVc",

  authDomain: "mon-blog-bbd68.firebaseapp.com",

  projectId: "mon-blog-bbd68",

  storageBucket: "mon-blog-bbd68.appspot.com",

  messagingSenderId: "629056673108",

  appId: "1:629056673108:web:998dc89ae680a3a42064c1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //j'ai ajouté ça