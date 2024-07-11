import { useRouter } from 'expo-router';
import { logoutUser } from '@/providers/firebase/firebaseFunctions';

import { useEffect } from 'react';
import { useAppContext } from '@/providers/context/AppContext';
import ActivityIndicatorComp from '@/components/ActivityIndicatorComp';
import { Alert } from 'react-native';
import useToast from '@/components/ui/Toasts';

const LogOutRoute = () => {
  const router = useRouter();
  const { setUser, state, setState, persistState } = useAppContext();

  // UseEffect to perform logout functionality on the route
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser(setUser);
        setState({ ...state, savedQuotes: [] });
        await persistState({ user: null, savedQuotes: [] });

        router.replace('/');
      } catch (err) {
        useToast(
          'Error Occured. Please try logging out again.',
          'red',
          'white'
        );
      }
    };

    performLogout();
  }, [setUser, router]);

  // Return Activity indicator while logout process ongoing
  return <ActivityIndicatorComp text="Logging out..." />;
};

export default LogOutRoute;
