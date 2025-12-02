// ===============================
// Firebase SDK Imports
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ===============================
// Firebase Configuration
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyCw2Gf-FyZF9sBU450znJ1cyjjKWUkqTyY",
    authDomain: "afpovaiweb-8a7c9.firebaseapp.com",
    projectId: "afpovaiweb-8a7c9",
    storageBucket: "afpovaiweb-8a7c9.firebasestorage.app",
    messagingSenderId: "120025740192",
    appId: "1:120025740192:web:9f62d7395959642009eac5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized.");

// Detect current page and attach proper functionality
const page = window.location.pathname;

// ===============================
// Sign Up Handler (signup.html)
// ===============================
if (page.includes("signup.html")) {
    document.getElementById("signupForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Registration Successful!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
            });
    });
}

// ===============================
// Login Handler (login.html)
// ===============================
if (page.includes("login.html")) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login Successful!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
            });
    });
}

// ===============================
// Logout Handler (dashboard.html)
// ===============================
if (page.includes("dashboard.html")) {
    document.getElementById("logoutBtn").addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "login.html";
        });
    });
}

// ===============================
// Auth State Observer
// ===============================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.email);
    } else {
        console.log("No active user.");
    }
});
