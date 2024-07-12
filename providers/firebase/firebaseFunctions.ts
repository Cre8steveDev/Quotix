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
import { QuotesData } from '@/types/types';

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
    await setUser({ uid, email: _email, photoURL, userName: fullName });

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
  quote: QuotesData
) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    const result = await updateDoc(userRef, {
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
  quoteToRemove: QuotesData
) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    // First, get the current user document
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    const savedQuotes = userData.savedQuotes || [];

    // Filter the selected Quote from the retrieved
    // User Data
    const newSavedQuotes = savedQuotes.filter(
      (quote: QuotesData) => quote._id !== quoteToRemove._id
    );

    // Update the document with the new array
    await updateDoc(userRef, {
      savedQuotes: newSavedQuotes,
    });

    return { success: true, message: 'Quote successfully removed.' };
  } catch (error) {
    console.error('Error removing quote:', error);
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
        return userDocSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};
