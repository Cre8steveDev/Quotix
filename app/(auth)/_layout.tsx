import useAuthState from '@/providers/firebase/useAuthState';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

function AuthLayout() {
  // Redirect user from the Screen If already Signed in
  // This is checking the authentication status
  const { userAuthState, loading } = useAuthState();
  const router = useRouter();

  if (userAuthState) return <Redirect href={'/(tabs)/Home'} />;

  return (
    <Stack>
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;
