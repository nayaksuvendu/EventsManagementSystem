import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log('User Info:', user);
    user.getIdToken().then((token) => {
      // Send token to the backend
      fetch('http://localhost:8000/api/auth/register/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    });
  })
  .catch((error) => {
    console.error('Google Login Failed:', error);
  });
};


export { auth, signInWithGoogle};
