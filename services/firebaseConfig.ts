
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDjDJokXSi7Ry_s4LKpy4aRjWF-xv8P9o",
    authDomain: "cabbookinglab4.firebaseapp.com",
    projectId: "cabbookinglab4",
    storageBucket: "cabbookinglab4.appspot.com",
    messagingSenderId: "514750780028",
    appId: "1:514750780028:web:fb8df2a615356691c4aff9"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
