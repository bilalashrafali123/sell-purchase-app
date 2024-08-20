
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBm5YTBSqGpWCKnqBy4SMmj7KWAnGB-M5g",
    authDomain: "buy-sell-app-cf36f.firebaseapp.com",
    projectId: "buy-sell-app-cf36f",
    storageBucket: "buy-sell-app-cf36f.appspot.com",
    messagingSenderId: "203622815960",
    appId: "1:203622815960:web:cd30042ac4c9ebaed75fad",
    measurementId: "G-J6T7M83TJS"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
