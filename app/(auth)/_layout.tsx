import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;
