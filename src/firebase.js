// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsZL-lYET83Six78uN_a95qBoOHQIQ3Lc",
  authDomain: "searchapp-8f063.firebaseapp.com",
  projectId: "searchapp-8f063",
  storageBucket: "searchapp-8f063.appspot.com",
  messagingSenderId: "82991953626",
  appId: "1:82991953626:web:b3b43b89a25a1679d2d7e3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);

//export { db, storage };

const app = initializeApp(firebaseConfig);
console.log('Firebase App initialized successfully:', app);

const db = getFirestore(app);
console.log('Firestore initialized successfully:', db);

const storage = getStorage(app);
console.log('Storage initialized successfully:', storage);
const auth = getAuth(app);



export {auth, db, storage };
