// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  Auth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDxx8ZfLgXpNKkepUKYh71y_JtKTuFaMgo',
//   authDomain: 'quotix-9324d.firebaseapp.com',
//   projectId: 'quotix-9324d',
//   storageBucket: 'quotix-9324d.appspot.com',
//   messagingSenderId: '414067682739',
//   appId: '1:414067682739:web:04bc5bc029e78a162bafc6',
// };

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
};

// Initialize Firebase only if no apps have been initialized yet
let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth only if it hasn't been initialized yet
let auth: Auth;
try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize Firestore only if it hasn't been initialized yet
const firestore = getFirestore(app);

export { app, auth, firestore };

// Problem with ReactNative Persistence import not available
//https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
// Update tsconfig.json
//
// {
//  "extends": "expo/tsconfig.base",
//  "compilerOptions": {
//"strict": true,
//    "paths": {
//      "@/*": ["./*"],
//"@firebase/auth": ["./node_modules/@firebase/auth/dist/index.rn.d.ts"]
//}
//},
//"include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
//}
