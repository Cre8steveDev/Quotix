/**
 * useAuthStateChange Hook
 * @returns {userAuthState, loading}
 */
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { auth } from './firebaseConfig';
import { useAppContext } from '../context/AppContext';

export default function useAuthState() {
  // Place onAuthStateChange to monitor the auth state in the application
  const [userAuthState, setUserAuthState] = useState<User | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { state } = useAppContext();

  // Add a listener to the Auth State for when it changes.
  useEffect(() => {
    const authStateSubscription = onAuthStateChanged(auth, (user) => {
      setUserAuthState(user);
      console.log('This is the authState monitor function');
      console.log('Current User data: ', state.user);
      setLoading(false);
    });

    // Return cleanup function
    return () => authStateSubscription();
  }, []);

  return { userAuthState, loading };
}
