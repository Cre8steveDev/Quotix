import { useRouter } from 'expo-router';
import { logoutUser } from '@/providers/firebase/firebaseFunctions';

import { useEffect } from 'react';
import { useAppContext } from '@/providers/context/AppContext';
import ActivityIndicatorComp from '@/components/ActivityIndicatorComp';
import { Alert } from 'react-native';

const LogOutRoute = () => {
  const router = useRouter();
  const { setUser } = useAppContext();

  // UseEffect to perform logout functionality on the route
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser(setUser);
        router.replace('/');
      } catch (err) {
        Alert.alert('Error Occured', 'Please try logging out again.');
      }
    };

    performLogout();
  }, [setUser, router]);

  // Return Activity indicator while logout process ongoing
  return <ActivityIndicatorComp text="Logging out..." />;
};

export default LogOutRoute;
