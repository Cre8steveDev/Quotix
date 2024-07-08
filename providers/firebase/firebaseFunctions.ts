import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, firestore } from './firebaseConfig';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { Alert } from 'react-native';
import { savedQuotesProp } from '@/types/types';

// Function to sign up a new user
export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  setUser: (user: any) => Promise<void>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.toLowerCase(),
      password
    );
    const user = userCredential.user;

    // Create a user document in Firestore with additional fields
    await setDoc(doc(firestore, 'users', user.uid), {
      fullName,
      email: user.email,
      userId: user.uid,
      savedQuotes: [],
    });

    // Store Basic User Details to App Context for global Access
    const { uid, email: _email, photoURL } = userCredential.user;
    await setUser({ uid, email: _email, photoURL });

    return { success: true, message: 'User signed up successfully 😆' };
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// Function to sign in an existing user
export const signIn = async (
  email: string,
  password: string,
  setUser: (user: any) => Promise<void>
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { uid, email: _email, photoURL } = userCredential.user;
    let userName = '';
    // Retrieve user data (name) from Firebase Database
    const userDocRef = doc(firestore, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const { fullName } = userDocSnap.data();
      userName = fullName;
    }

    // Store Basic User Details to App Context for global Access
    await setUser({ uid, email: _email, photoURL, userName });

    return { success: true, message: 'Login successful' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Invalid Login Credentials 🫠' };
  }
};

export const logoutUser = async (setUser: (user: null) => Promise<void>) => {
  try {
    await signOut(auth);
    await setUser(null);
  } catch (error) {
    Alert.alert(
      'Error Logging Out',
      'Sorry, there was a problem logging you out from your account. Try again later.'
    );
  }
};

// Update user with quote on the Database
export const addQuoteToFirestore = async (
  userId: string,
  quote: savedQuotesProp
) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      savedQuotes: arrayUnion(quote),
    });
    return { success: true, message: 'Quote successfully stored.' };
  } catch (error) {
    return {
      success: false,
      message: 'There was an error saving the selected quote.',
    };
  }
};

// Remove selected quote from the database
export const removeQuoteFromFirestore = async (
  userId: string,
  quote: savedQuotesProp
) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      savedQuotes: arrayRemove(quote),
    });
    return { success: true, message: 'Quote successfully stored.' };
  } catch (error) {
    return {
      success: false,
      message: 'Error removing selected quote from Database.',
    };
  }
};

export const getCurrentUserData = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        console.log(userDocSnap.data());
        return userDocSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  } else {
    console.log('No user is signed in');
    return null;
  }
};
