import useAuthState from '@/providers/firebase/useAuthState';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

function AuthLayout() {
  // Redirect user from the Screen If already Signed in
  // This is checking the authentication status
  const { userAuthState, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (userAuthState) {
      router.dismissAll();
      return router.replace('/(tabs)/Home');
    }
  }, [userAuthState]);

  return (
    <Stack>
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;
