/**
 * useAuthStateChange Hook
 * @returns {userAuthState, loading}
 */

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useState, useEffect } from 'react';

export default function useAuthState() {
  // Place onAuthStateChange to monitor the auth state in the application
  const [userAuthState, setUserAuthState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Add a listener to the Auth State for when it changes.
  useEffect(() => {
    const authStateSubscription = onAuthStateChanged(auth, (user) => {
      setUserAuthState(user);
      setLoading(false);
    });
    // Return cleanup function
    return () => authStateSubscription();
  }, []);

  return { userAuthState, loading };
}
