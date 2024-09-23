import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCMdYn0GQbaGl_uiSqIeP4eIxe2S5TxYG4",
      authDomain: "nayakevents-fe8d6.firebaseapp.com",
      projectId: "nayakevents-fe8d6",
      storageBucket: "nayakevents-fe8d6.appspot.com",
      messagingSenderId: "779844306150",
      appId: "1:779844306150:web:f6e69ff969a25031ff2727",
      measurementId: "G-JQ3R05Z98P"
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
