import { useRouter } from 'expo-router';
import { logoutUser } from '@/providers/firebase/firebaseFunctions';

import { useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Text, StyleSheet } from 'react-native';
import { useAppContext } from '@/providers/context/AppContext';

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
  return (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator
        size="large"
        color={Colors.primaryYellow}
        style={styles.indicator}
      />
      <Text>Logging out...</Text>
    </SafeAreaView>
  );
};

export default LogOutRoute;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryYellow,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    transform: 'scale(1.3)',
    marginBottom: 10,
  },
});
