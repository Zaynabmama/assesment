import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAYZnmjuy7qC3xStK1e6Q6wmBIh_4cjybY",
  authDomain: "challenge-zm.firebaseapp.com",
  projectId: "challenge-zm",
  storageBucket: "challenge-zm.appspot.com",
  messagingSenderId: "261852968514",
  appId: "1:261852968514:web:04c74689bc085498e31fdb",
  measurementId: "G-R3PFS868YE"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
